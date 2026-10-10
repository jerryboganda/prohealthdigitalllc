# VPS deployment

Production: https://prohealthdigitalllc.com on `185.252.233.186`.

Build with `npm ci` and `npm run build` on the development machine or CI.
Upload `.output` to `/opt/prohealthdigitalllc/releases/<git-sha>/.output`.
Place `compose.yaml` at `/opt/prohealthdigitalllc/compose.yaml` and point the
`current` symlink at the release directory, then run:

```sh
cd /opt/prohealthdigitalllc
docker compose up -d --force-recreate web
docker compose ps
```

The container uses the existing `nginx-proxy-manager_default` network and has
no published port. `prohealth.conf` belongs at
`/opt/docker/nginx-proxy-manager/data/nginx/proxy_host/prohealth.conf`.
Its certificate is managed by the proxy container's existing Certbot account
and renewal scheduler. Validate changes with `nginx -t` inside
`nginx-proxy-manager-app-1` before reloading Nginx.

For rollback, point `current` at the previous release and recreate only `web`.
Do not restart unrelated stacks.
