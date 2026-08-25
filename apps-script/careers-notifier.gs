/**
 * Turk Innovation careers notification endpoint.
 *
 * Deploy as a Google Apps Script Web app:
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * The website sends the resume as base64 text so this endpoint can attach it
 * to the Gmail notification. The website limits resumes to 5 MB.
 */
const RECIPIENT_EMAIL = "YOUR_GMAIL_ADDRESS";
const SPREADSHEET_ID = ""; // Optional: add a Google Sheet ID to log applications.
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function doGet() {
  return jsonResponse({ ok: true, service: "Turk Innovation careers" });
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const fullName = String(params.fullName || "").trim();
  const email = String(params.email || "").trim();
  const role = String(params.role || "General collaboration").trim();

  if (!fullName || !email) {
    return jsonResponse({ ok: false, error: "Name and email are required." });
  }

  const resumeFileName = String(params.resumeFileName || "").trim();
  const resumeMimeType = String(params.resumeMimeType || "").trim();
  const resumeBase64 = String(params.resumeBase64 || "").trim();
  const attachments = [];

  if (!resumeFileName || !resumeMimeType || !resumeBase64) {
    return jsonResponse({ ok: false, error: "A resume file is required." });
  }

  if (ALLOWED_RESUME_TYPES.indexOf(resumeMimeType) === -1) {
    return jsonResponse({ ok: false, error: "Unsupported resume file type." });
  }

  try {
    const resumeBytes = Utilities.base64Decode(resumeBase64);

    if (resumeBytes.length > MAX_RESUME_BYTES) {
      return jsonResponse({ ok: false, error: "Resume file is larger than 5 MB." });
    }

    attachments.push(
      Utilities.newBlob(resumeBytes, resumeMimeType, resumeFileName)
    );
  } catch (error) {
    return jsonResponse({ ok: false, error: "Resume file could not be read." });
  }

  const subject = "New Turk Innovation application — " + role;
  const body = [
    "New application received through the Turk Innovation website.",
    "",
    "Name: " + fullName,
    "Email: " + email,
    "Phone / WhatsApp: " + String(params.phone || ""),
    "Position: " + role,
    "Portfolio: " + String(params.portfolio || ""),
    "Resume attachment: " + resumeFileName,
    "",
    "Why they want to join:",
    String(params.message || ""),
  ].join("\n");

  GmailApp.sendEmail(RECIPIENT_EMAIL, subject, body, {
    name: "Turk Innovation Careers",
    replyTo: email,
    attachments: attachments,
  });

  if (SPREADSHEET_ID) {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Position",
        "Portfolio",
        "Resume File",
        "Message",
      ]);
    }

    sheet.appendRow([
      new Date(),
      fullName,
      email,
      String(params.phone || ""),
      role,
      String(params.portfolio || ""),
      resumeFileName,
      String(params.message || ""),
    ]);
  }

  return jsonResponse({ ok: true });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
