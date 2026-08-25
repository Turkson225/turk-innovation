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

## Careers application notifications

The careers page includes an application form. To send each application to your Gmail inbox:

1. Open `apps-script/careers-notifier.gs`.
2. Go to [Google Apps Script](https://script.google.com), create a new project, and paste the script.
3. Replace `YOUR_GMAIL_ADDRESS` with the Gmail address that should receive applications.
4. Deploy it as a **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorize the Gmail permission when Google asks.
6. Copy the deployment URL ending in `/exec`.
7. In GitHub, open **Settings → Secrets and variables → Actions → New repository secret**.
8. Create a secret named `VITE_CAREERS_APPS_SCRIPT_URL` and paste the deployment URL.
9. Push a change or run the Pages workflow again.

The form sends the applicant's name, email, phone, selected position, portfolio link, CV link, and message. The Apps Script sends a Gmail notification and can optionally append submissions to a Google Sheet.
