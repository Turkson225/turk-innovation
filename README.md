# Turk Innovation

Turk Innovation is an engineering and technology studio building practical solutions across AI, embedded systems, IoT, robotics, drones, logistics, healthcare, and emerging technologies.

## Run locally

Requirements: Node.js 22+ and npm.

~~~bash
npm ci
npm run dev
~~~

Open the local Vite URL shown in the terminal.

## Build

~~~bash
npm run build
~~~

The production output is written to `dist/`.

## GitHub Pages

The repository is configured to deploy automatically with GitHub Actions whenever changes are pushed to `main`.

Live site:

https://turkson225.github.io/turk-innovation/

The workflow:

1. Installs dependencies with `npm ci`.
2. Runs `npm run build`.
3. Uploads the `dist/` folder as the Pages artifact.
4. Publishes it using GitHub Pages.

If Pages has not been enabled yet, open the repository settings and set:

`Settings → Pages → Source: GitHub Actions`

## Environment configuration

The application uses Supabase browser configuration through:

- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

Do not commit new private credentials. Use `.env.example` as the template for local setup. The existing Vite publishable Supabase values are browser-facing configuration and are not service-role credentials.

## Lovable

This repository was originally created and synchronized through Lovable. You can continue editing it in Lovable, locally, or directly through GitHub.
