# ProHealth Digital Website

Web application built for ProHealth Digital LLC.

## Features

- Built with React, TanStack Start (SSR), and TypeScript.
- Styled with Tailwind CSS v4.
- Optimised for speed, accessibility, and search engine optimization (SEO).
- Fully responsive layout for all viewports.

## Development

To run the development server locally, ensure you have Node.js installed, then execute:

```sh
# Install dependencies
npm install

# Start local dev server
npm run dev
```

The application will run locally at `http://localhost:8080` (or the next available port).

## Production Build

To compile the application for production deployment:

```sh
npm run build
```

This creates a production Node.js server build in `.output`.

To start the production server:

```sh
npm start
```

Set `PORT` and `HOST` in the hosting environment to configure the listening address.

## Bilingual services and inquiries

The website presents four scoped healthcare technology engagements in English and Arabic. Shared copy is in `src/lib/content.ts`; Arabic routes use `/ar`. Old service/package/product URLs permanently redirect to the current sections.

Project inquiries use `/api/inquiries`, bounded Zod validation, authenticated SMTP, honeypot and proxy-authenticated rate limiting. Success requires mail-server acceptance. Credentials belong only in the private VPS environment; use `deploy/configure-mail.ps1` for the Hostinger sales mailbox.

Run `npm test`, `npm run lint`, `npm run build`, then `npx tsc --noEmit`. With the production server running, `npm run check:routes` verifies all public pages and redirects. See [deployment and acceptance notes](deploy/OVERHAUL.md) for configuration, staging, rollback and remaining human review gates.
