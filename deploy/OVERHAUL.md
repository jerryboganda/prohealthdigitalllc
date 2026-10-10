# Bilingual service website release

The approved offer is healthcare technology delivery for providers and digital health companies, through four scoped engagements. Content is shared in `src/lib/content.ts`; pages and inquiry selections derive from it. English uses root URLs; Arabic uses `/ar`, document RTL and equivalent optional-locale routes. The customer owns clinical care. Prices and support targets are agreed in each contract.

## Verification

Use Node 22 or later. Run `npm ci`, `npm run lint`, `npm test`, `npm run build`, then `npx tsc --noEmit` (build regenerates route types). Start the production server with `PORT=3100` and run `npm run check:routes`. Set `CHECK_ORIGIN=https://prohealthdigitalllc.com` for public verification. Tests cover bounded validation, consent, honeypot, authenticated proxy identity, rate limits, delayed SMTP acceptance and delivery failures. Browser review covers both locales, mobile menus, contextual selections, error retention and keyboard access.

## Inquiry mail and privacy

Run `deploy/configure-mail.ps1` in Windows PowerShell to securely install the sales mailbox credentials through the existing SSH `vps` alias. The private `/opt/prohealthdigitalllc/mail.env` must have mode 600. `deploy/mail.env.example` documents the variables. Port 465 uses implicit TLS; 587 requires STARTTLS; certificate checks remain enabled. Fixed From and recipient are sales@prohealthdigitalllc.com; validated customer email is Reply-To. The SMTP provider accepting a message is the success boundary, not proof that a human has read it.

No inquiry database, customer email automation or advertising trackers are added. Application logs record delivery status and non-identifying selection counts. Proxy request logs include normal connection information. Inquiry text is sent to the business mailbox. Five attempts per authenticated client IP per 15 minutes are allowed; counters are ephemeral per single Node process and reset on restart. Direct requests without a valid private proxy token share a restrictive fallback bucket. Deploy only one app replica without adding a shared limiter.

The dedicated proxy overwrites X-Real-IP and authenticates it using a private random token in `/opt/prohealthdigitalllc/proxy.env`. The template `prohealth.conf` must be rendered by `release.sh`; never deploy its placeholder directly. The app has no public port. Future CDN use requires a separately configured trusted real-IP chain.

## Deployment and rollback

Package only the reviewed `.output` into a release tar, extract into `/opt/prohealthdigitalllc/releases/<sha>`, and write `REVISION`. Stage the release in a temporary container bound only to localhost and verify it before switching `current`. Copy compose.yaml, prohealth.conf and release.sh to the app directory, then `bash release.sh <sha>`. It creates only ProHealth's proxy token, switches only its release link, recreates only its web container, checks revision/health and reloads the shared proxy after configuration validation. Other service configurations are not changed.

Previous release path is saved in `previous-release`. If post-deployment functional verification fails, restore that path to `current`, restore the previous ProHealth proxy configuration, set RELEASE_SHA in `.env` to the previous SHA, and run `docker compose up -d --no-deps --force-recreate web` followed by Nginx validation/reload. No data volumes are deleted. TLS renewal remains the dedicated existing cron and certbot configuration.

## Acceptance gates

- Authenticated SMTP must be configured and a synthetic production inquiry confirmed in the sales mailbox; unit tests alone do not prove delivery.
- The owner will review Arabic meaning and commercial accuracy on the completed pages. Until that review, Arabic is implemented and internally checked, not owner-accepted.
- Representative readers should verify that they can identify their audience, engagement, outputs and next step; implementation checks are not a substitute for this clarity review.
- Project contribution descriptions reflect the owner's full-platform confirmation. Dates, technical detail, outcomes, endorsements and third-party screenshots remain unpublished without supporting material.
