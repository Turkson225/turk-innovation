/**
 * Turk Innovation careers notification endpoint.
 *
 * Deploy as a Google Apps Script Web app:
 * - Execute as: Me
 * - Who has access: Anyone
 */
const RECIPIENT_EMAIL = "YOUR_GMAIL_ADDRESS";
const SPREADSHEET_ID = ""; // Optional: add a Google Sheet ID to log applications.

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

  const subject = "New Turk Innovation application — " + role;
  const body = [
    "New application received through the Turk Innovation website.",
    "",
    "Name: " + fullName,
    "Email: " + email,
    "Phone / WhatsApp: " + String(params.phone || ""),
    "Position: " + role,
    "Portfolio: " + String(params.portfolio || ""),
    "CV / resume: " + String(params.resumeUrl || ""),
    "",
    "Why they want to join:",
    String(params.message || ""),
  ].join("\n");

  GmailApp.sendEmail(RECIPIENT_EMAIL, subject, body, {
    name: "Turk Innovation Careers",
    replyTo: email,
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
        "CV / Resume",
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
      String(params.resumeUrl || ""),
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
