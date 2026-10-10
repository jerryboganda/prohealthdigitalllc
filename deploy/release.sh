#!/usr/bin/env bash
set -euo pipefail
revision=${1:?Provide the reviewed commit SHA}
[[ "$revision" =~ ^[0-9a-f]{40}$ ]] || { echo 'Invalid revision'; exit 1; }
cd /opt/prohealthdigitalllc
test -f "releases/$revision/.output/server/index.mjs"
previous=$(readlink current)
printf '%s\n' "$previous" > previous-release
if [ ! -s proxy.env ]; then
  umask 077
  printf 'INQUIRY_PROXY_TOKEN=%s\n' "$(openssl rand -hex 32)" > proxy.env
fi
token=$(sed -n 's/^INQUIRY_PROXY_TOKEN=//p' proxy.env)
[[ "$token" =~ ^[0-9a-f]{64}$ ]] || { echo 'Invalid private proxy token'; exit 1; }
sed "s/__PROHEALTH_PROXY_TOKEN__/$token/" prohealth.conf > prohealth-rendered.conf
chmod 600 prohealth-rendered.conf
proxy_file=/opt/docker/nginx-proxy-manager/data/nginx/proxy_host/prohealth.conf
cp "$proxy_file" prohealth-previous.conf
cp "$proxy_file" "$proxy_file.backup"
cp prohealth-rendered.conf "$proxy_file"
chmod 600 "$proxy_file"
if ! docker exec nginx-proxy-manager-app-1 nginx -t; then
  cp prohealth-previous.conf "$proxy_file"
  if [ -f compose-previous.yaml ]; then cp compose-previous.yaml compose.yaml; fi
  exit 1
fi
printf 'RELEASE_SHA=%s\n' "$revision" > .env
ln -sfn "releases/$revision" current
rollback() {
  echo 'Release verification failed; restoring previous ProHealth release'
  ln -sfn "$previous" current
  old_revision=${previous##*/}
  printf 'RELEASE_SHA=%s\n' "$old_revision" > .env
  cp prohealth-previous.conf "$proxy_file"
  if [ -f compose-previous.yaml ]; then cp compose-previous.yaml compose.yaml; fi
  docker compose up -d --no-deps --force-recreate web
  docker exec nginx-proxy-manager-app-1 nginx -s reload
}
if ! docker compose up -d --no-deps --force-recreate web; then rollback; exit 1; fi
healthy=false
for i in $(seq 1 30); do
  if docker exec prohealth-web node -e "fetch('http://127.0.0.1:3000/api/health').then(async r=>{const b=await r.json();process.exit(r.ok&&b.revision==='$revision'?0:1)}).catch(()=>process.exit(1))"; then healthy=true; break; fi
  sleep 1
done
if [ "$healthy" != true ]; then rollback; exit 1; fi
docker exec nginx-proxy-manager-app-1 nginx -s reload
for i in $(seq 1 15); do
  if curl -fsS https://prohealthdigitalllc.com/api/health | python3 -c "import json,sys; assert json.load(sys.stdin)['revision']=='$revision'"; then
    echo "Verified ProHealth release $revision; previous release preserved: $previous"
    exit 0
  fi
  sleep 1
done
rollback
exit 1
