# Odontools Frontend

React/Vite storefront for dental products, with account screens, product browsing, cart/order flows and administrative interfaces.

**Backend:** [Odontools-backend](https://github.com/Lenin-Miranda/Odontools-backend).

## Local setup

Requires Node.js, npm and the separate MongoDB/Express backend.

```bash
git clone https://github.com/Lenin-Miranda/Odontools.git
cd Odontools
npm install
cp .env.example .env
```

Set the API origin in `.env`:

```dotenv
VITE_API_URL=http://localhost:3001
```

Run the frontend on the origin accepted by the backend's current CORS allowlist:

```bash
npm run dev -- --port 3000
```

Open [localhost:3000](http://localhost:3000). The API helper adds endpoint paths, so the configured value is the server origin.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run lint` | ESLint |
| `npm run build` | Build into `dist/` |
| `npm run preview` | Preview the build |
| `npm run deploy` | Publish with gh-pages after the predeploy build |

## Architecture

- `src/`: React screens, components and application behavior.
- [src/config/api.js](src/config/api.js): centralized API URL helpers.
- `src/utils/`: authentication and shared utilities.

Email delivery, uploaded media and persistence belong to the backend. Its current email services use SendGrid; do not configure SMTP secrets in this frontend.

## Scope and verification

Product, account and administrative workflows require an available API and suitable user permissions. Payment UI should not be treated as proof of a live payment gateway. Run lint/build and check sign-in, catalog, cart and order behavior against development data. If CORS blocks a request, match the browser origin to the allowlist in the backend's `server.js`.
