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

The form sends the applicant's name, email, phone, selected position, portfolio link, message, and a required PDF, DOC, or DOCX resume attachment. Resume files are limited to 5 MB. The Apps Script attaches the resume to the Gmail notification and can optionally append the application details to a Google Sheet. After updating the Apps Script, deploy a new Web app version and keep the same `/exec` URL.


## Company website structure

The public site is organized around the evidence currently available:

- Intelligent safety and automation
- Energy and connected infrastructure
- Robotics and autonomous operations
- Technical training and collaboration

Project pages intentionally distinguish working prototypes, active development,
and exploration. Any metrics shown are observed prototype measurements or
descriptive system facts—not revenue, customer, or deployment claims.

The site also includes:

- Investor and strategic partner narrative at `/investors`
- Founder and company perspective at `/about`
- Project case studies at `/projects`
- Privacy and website terms at `/legal`
- Careers applications with optional Gmail notification delivery
