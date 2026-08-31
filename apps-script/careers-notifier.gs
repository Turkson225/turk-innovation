/**
 * Turk Innovation careers and client-review endpoint.
 *
 * Deploy as a Google Apps Script Web app:
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * The website sends career resumes and review photos as base64 text.
 * Career applications remain private. Review submissions are stored privately
 * and marked Pending review; they are never published automatically.
 */
const RECIPIENT_EMAIL = "YOUR_GMAIL_ADDRESS";
const SPREADSHEET_ID = ""; // Optional: add a Google Sheet ID for applications.
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const MAX_REVIEW_PHOTO_SIZE = 2 * 1024 * 1024;
const MAX_REVIEW_TOTAL_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_REVIEW_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_REVIEW_FOLDER_NAME = "Turk Innovation Review Submissions";
const DEFAULT_REVIEW_SHEET_NAME = "Turk Innovation Reviews";

function doGet() {
  return jsonResponse({ ok: true, service: "Turk Innovation careers and reviews" });
}

function doPost(e) {
  const params = (e && e.parameter) || {};

  if (String(params.formType || "").trim().toLowerCase() === "review") {
    return handleReview_(params);
  }

  return handleCareer_(params);
}

function handleCareer_(params) {
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

    attachments.push(Utilities.newBlob(resumeBytes, resumeMimeType, resumeFileName));
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

  GmailApp.sendEmail(getRecipientEmail_(), subject, body, {
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

function handleReview_(params) {
  try {
    const required = [
      "fullName",
      "email",
      "location",
      "project",
      "rating",
      "experience",
      "publicConsent",
    ];
    const missing = required.filter((key) => !String(params[key] || "").trim());

    if (missing.length) {
      return jsonResponse({ ok: false, error: "Missing fields: " + missing.join(", ") });
    }

    if (String(params.publicConsent).trim().toLowerCase() !== "yes") {
      return jsonResponse({ ok: false, error: "Public consent is required." });
    }

    const rating = Number(params.rating);
    if (!isFinite(rating) || rating < 1 || rating > 5 || Math.floor(rating) !== rating) {
      return jsonResponse({ ok: false, error: "Rating must be a whole number from 1 to 5." });
    }

    const folder = getOrCreateReviewFolder_();
    const sheet = getOrCreateReviewSheet_();
    const submittedAt = params.submittedAt || new Date().toISOString();
    const photoLinks = [];
    let totalPhotoBytes = 0;

    for (let index = 1; index <= 3; index += 1) {
      const base64 = String(params["photo" + index + "Base64"] || "").trim();
      if (!base64) continue;

      const mimeType = String(params["photo" + index + "MimeType"] || "").trim();
      if (ALLOWED_REVIEW_PHOTO_TYPES.indexOf(mimeType) === -1) {
        return jsonResponse({ ok: false, error: "Unsupported prototype photo type." });
      }

      const bytes = Utilities.base64Decode(base64);
      if (bytes.length > MAX_REVIEW_PHOTO_SIZE) {
        return jsonResponse({ ok: false, error: "Each prototype photo must be 2 MB or smaller." });
      }

      totalPhotoBytes += bytes.length;
      if (totalPhotoBytes > MAX_REVIEW_TOTAL_PHOTO_SIZE) {
        return jsonResponse({ ok: false, error: "Prototype photos must be 5 MB or smaller in total." });
      }

      const originalName = params["photo" + index + "FileName"] || "prototype-photo-" + index;
      const fileName = safeFileName_(
        new Date(submittedAt).toISOString().slice(0, 10) + " - " + params.fullName + " - " + originalName,
      );
      const file = folder.createFile(Utilities.newBlob(bytes, mimeType, fileName));
      file.setDescription(
        "Turk Innovation review submission\nName: " + params.fullName + "\nProject: " + params.project + "\nStatus: Pending review",
      );
      photoLinks.push(file.getUrl());
    }

    sheet.appendRow([
      new Date(),
      params.fullName,
      params.email,
      params.location,
      params.project,
      rating,
      params.experience,
      photoLinks.join("\n"),
      "Pending review",
      params.sourcePage || "",
    ]);

    const subject = "New Turk Innovation review — " + params.project + " — " + params.fullName;
    const body = [
      "A new client review was submitted through the Turk Innovation website.",
      "",
      "Name: " + params.fullName,
      "Email: " + params.email,
      "Location: " + params.location,
      "Project: " + params.project,
      "Rating: " + rating + "/5",
      "Submitted: " + submittedAt,
      "Moderation status: Pending review",
      photoLinks.length ? "Prototype photo Drive links:\n" + photoLinks.join("\n") : "Prototype photos: None",
      "",
      "Experience:",
      params.experience,
      "",
      "Review this submission before adding it to src/pages/Reviews.tsx.",
    ].join("\n");

    GmailApp.sendEmail(getRecipientEmail_(), subject, body, {
      name: "Turk Innovation Reviews",
      replyTo: params.email,
    });

    GmailApp.sendEmail(
      params.email,
      "Turk Innovation received your review",
      "Hello " + params.fullName + ",\n\nThank you for sharing your experience with Turk Innovation. Your review has been received and is pending moderation. We will contact you if we need clarification before publication.\n\nTurk Innovation",
      { name: "Turk Innovation Reviews" },
    );

    return jsonResponse({ ok: true, status: "pending_review" });
  } catch (error) {
    GmailApp.sendEmail(
      getRecipientEmail_(),
      "Turk Innovation reviews endpoint error",
      error && error.stack ? error.stack : String(error),
      { name: "Turk Innovation Reviews" },
    );
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function getOrCreateReviewFolder_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty("REVIEWS_DRIVE_FOLDER_ID");

  if (existingId) {
    return DriveApp.getFolderById(existingId);
  }

  const folder = DriveApp.createFolder(DEFAULT_REVIEW_FOLDER_NAME);
  props.setProperty("REVIEWS_DRIVE_FOLDER_ID", folder.getId());
  return folder;
}

function getOrCreateReviewSheet_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty("REVIEWS_SHEET_ID");

  if (existingId) {
    return SpreadsheetApp.openById(existingId).getSheets()[0];
  }

  const spreadsheet = SpreadsheetApp.create(DEFAULT_REVIEW_SHEET_NAME);
  const sheet = spreadsheet.getSheets()[0];
  sheet.appendRow([
    "Timestamp",
    "Full name",
    "Email",
    "Location",
    "Project",
    "Rating",
    "Experience",
    "Prototype photo Drive links",
    "Moderation status",
    "Source page",
  ]);
  props.setProperty("REVIEWS_SHEET_ID", spreadsheet.getId());
  return sheet;
}

function getRecipientEmail_() {
  return PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAIL") || RECIPIENT_EMAIL;
}

function safeFileName_(name) {
  return String(name).replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 120);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
