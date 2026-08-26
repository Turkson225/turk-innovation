// Google Apps Script endpoint for the Turk Innovation careers form.
// Deploy this as a Web App and set the GitHub Actions secret
// VITE_CAREERS_APPS_SCRIPT_URL to the deployed /exec URL.

const DEFAULT_NOTIFY_EMAIL = "turkinnovation@gmail.com";
const DEFAULT_FOLDER_NAME = "Turk Innovation Career Applications";
const DEFAULT_SHEET_NAME = "Turk Innovation Applications";

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};

  try {
    const required = ["fullName", "email", "role", "message", "resumeBase64"];
    const missing = required.filter((key) => !String(params[key] || "").trim());

    if (missing.length) {
      return jsonResponse_({ ok: false, error: "Missing fields: " + missing.join(", ") });
    }

    const folder = getOrCreateFolder_();
    const sheet = getOrCreateSheet_();
    const submittedAt = params.submittedAt || new Date().toISOString();
    const safeName = safeFileName_(params.resumeFileName || "resume.pdf");
    const fileName = `${submittedAt.slice(0, 10)} - ${params.fullName} - ${safeName}`;
    const bytes = Utilities.base64Decode(params.resumeBase64);
    const blob = Utilities.newBlob(bytes, params.resumeMimeType || MimeType.PDF, fileName);
    const file = folder.createFile(blob);

    file.setDescription(
      `Turk Innovation careers application\nName: ${params.fullName}\nEmail: ${params.email}\nRole: ${params.role}`,
    );

    sheet.appendRow([
      new Date(),
      params.fullName,
      params.email,
      params.phone || "",
      params.role,
      params.portfolio || "",
      params.message,
      file.getUrl(),
      params.resumeMimeType || "",
      params.resumeSizeBytes || "",
      params.sourcePage || "",
    ]);

    const notifyEmail = getScriptProperty_("CAREERS_NOTIFY_EMAIL", DEFAULT_NOTIFY_EMAIL);
    const subject = `New Turk Innovation application: ${params.role} - ${params.fullName}`;
    const body = [
      "A new application was submitted through the Turk Innovation website.",
      "",
      `Name: ${params.fullName}`,
      `Email: ${params.email}`,
      `Phone / WhatsApp: ${params.phone || "Not provided"}`,
      `Role: ${params.role}`,
      `Portfolio: ${params.portfolio || "Not provided"}`,
      `Submitted: ${submittedAt}`,
      `CV Drive link: ${file.getUrl()}`,
      "",
      "Message:",
      params.message,
    ].join("\n");

    GmailApp.sendEmail(notifyEmail, subject, body, {
      name: "Turk Innovation Careers",
      attachments: [blob],
    });

    GmailApp.sendEmail(
      params.email,
      "Turk Innovation received your application",
      `Hello ${params.fullName},\n\nThank you for applying to Turk Innovation. We have received your CV and application for ${params.role}.\n\nWe will review your details and contact you if there is a strong fit.\n\nTurk Innovation`,
      { name: "Turk Innovation Careers" },
    );

    return jsonResponse_({ ok: true, fileUrl: file.getUrl() });
  } catch (error) {
    const notifyEmail = getScriptProperty_("CAREERS_NOTIFY_EMAIL", DEFAULT_NOTIFY_EMAIL);
    GmailApp.sendEmail(
      notifyEmail,
      "Turk Innovation careers endpoint error",
      error && error.stack ? error.stack : String(error),
      { name: "Turk Innovation Careers" },
    );
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function getOrCreateFolder_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty("CAREERS_DRIVE_FOLDER_ID");

  if (existingId) {
    return DriveApp.getFolderById(existingId);
  }

  const folder = DriveApp.createFolder(DEFAULT_FOLDER_NAME);
  props.setProperty("CAREERS_DRIVE_FOLDER_ID", folder.getId());
  return folder;
}

function getOrCreateSheet_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty("CAREERS_SHEET_ID");

  if (existingId) {
    return SpreadsheetApp.openById(existingId).getSheets()[0];
  }

  const spreadsheet = SpreadsheetApp.create(DEFAULT_SHEET_NAME);
  const sheet = spreadsheet.getSheets()[0];
  sheet.appendRow([
    "Timestamp",
    "Full name",
    "Email",
    "Phone",
    "Role",
    "Portfolio",
    "Message",
    "CV Drive link",
    "CV mime type",
    "CV size bytes",
    "Source page",
  ]);
  props.setProperty("CAREERS_SHEET_ID", spreadsheet.getId());
  return sheet;
}

function getScriptProperty_(key, fallback) {
  return PropertiesService.getScriptProperties().getProperty(key) || fallback;
}

function safeFileName_(name) {
  return String(name).replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 120);
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
