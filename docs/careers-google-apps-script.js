// Google Apps Script endpoint for the Turk Innovation careers form.
// Deploy this as a Web App and set the GitHub Actions secret
// VITE_CAREERS_APPS_SCRIPT_URL to the deployed /exec URL.

const DEFAULT_NOTIFY_EMAIL = "turkinnovation@gmail.com";
const DEFAULT_FOLDER_NAME = "Turk Innovation Career Applications";
const DEFAULT_SHEET_NAME = "Turk Innovation Applications";
const DEFAULT_REVIEW_FOLDER_NAME = "Turk Innovation Review Submissions";
const DEFAULT_REVIEW_SHEET_NAME = "Turk Innovation Reviews";
const MAX_REVIEW_PHOTO_SIZE = 2 * 1024 * 1024;
const MAX_REVIEW_TOTAL_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_REVIEW_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || "").trim().toLowerCase();
  const payload = action === "approvedreviews"
    ? getApprovedReviews_()
    : { ok: true, service: "Turk Innovation careers and reviews" };

  return publicResponse_(payload, params.callback);
}

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};

  if (String(params.formType || "").trim().toLowerCase() === "review") {
    return handleReview_(params);
  }

  return handleCareer_(params);
}

function handleCareer_(params) {
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
      return jsonResponse_({ ok: false, error: "Missing fields: " + missing.join(", ") });
    }

    if (String(params.publicConsent).trim().toLowerCase() !== "yes") {
      return jsonResponse_({ ok: false, error: "Public consent is required." });
    }

    const rating = Number(params.rating);
    if (!isFinite(rating) || rating < 1 || rating > 5 || Math.floor(rating) !== rating) {
      return jsonResponse_({ ok: false, error: "Rating must be a whole number from 1 to 5." });
    }

    const folder = getOrCreateReviewFolder_();
    const sheet = getOrCreateReviewSheet_();
    const submittedAt = params.submittedAt || new Date().toISOString();
    const photoLinks = [];
    let totalPhotoBytes = 0;

    for (let index = 1; index <= 3; index += 1) {
      const base64 = String(params[`photo${index}Base64`] || "").trim();
      if (!base64) continue;

      const mimeType = String(params[`photo${index}MimeType`] || "").trim();
      if (ALLOWED_REVIEW_PHOTO_TYPES.indexOf(mimeType) === -1) {
        return jsonResponse_({ ok: false, error: "Unsupported prototype photo type." });
      }

      const bytes = Utilities.base64Decode(base64);
      if (bytes.length > MAX_REVIEW_PHOTO_SIZE) {
        return jsonResponse_({ ok: false, error: "Each prototype photo must be 2 MB or smaller." });
      }

      totalPhotoBytes += bytes.length;
      if (totalPhotoBytes > MAX_REVIEW_TOTAL_PHOTO_SIZE) {
        return jsonResponse_({ ok: false, error: "Prototype photos must be 5 MB or smaller in total." });
      }

      const originalName = params[`photo${index}FileName`] || `prototype-photo-${index}`;
      const fileName = safeFileName_(
        `${submittedAt.slice(0, 10)} - ${params.fullName} - ${originalName}`,
      );
      const blob = Utilities.newBlob(bytes, mimeType, fileName);
      const file = folder.createFile(blob);

      file.setDescription(
        `Turk Innovation review submission\nName: ${params.fullName}\nProject: ${params.project}\nStatus: Pending review`,
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

    const notifyEmail = getScriptProperty_("REVIEWS_NOTIFY_EMAIL", DEFAULT_NOTIFY_EMAIL);
    const subject = `New Turk Innovation review: ${params.project} - ${params.fullName}`;
    const body = [
      "A new client review was submitted through the Turk Innovation website.",
      "",
      `Name: ${params.fullName}`,
      `Email: ${params.email}`,
      `Location: ${params.location}`,
      `Project: ${params.project}`,
      `Rating: ${rating}/5`,
      `Submitted: ${submittedAt}`,
      "Moderation status: Pending review",
      photoLinks.length ? `Prototype photo Drive links:\n${photoLinks.join("\n")}` : "Prototype photos: None",
      "",
      "Experience:",
      params.experience,
      "",
      "Review this submission before adding it to src/pages/Reviews.tsx.",
    ].join("\n");

    GmailApp.sendEmail(notifyEmail, subject, body, {
      name: "Turk Innovation Reviews",
      replyTo: params.email,
    });

    GmailApp.sendEmail(
      params.email,
      "Turk Innovation received your review",
      `Hello ${params.fullName},\n\nThank you for sharing your experience with Turk Innovation. Your review has been received and is pending moderation. We will contact you if we need clarification before publication.\n\nTurk Innovation`,
      { name: "Turk Innovation Reviews" },
    );

    return jsonResponse_({ ok: true, status: "pending_review" });
  } catch (error) {
    const notifyEmail = getScriptProperty_("REVIEWS_NOTIFY_EMAIL", DEFAULT_NOTIFY_EMAIL);
    GmailApp.sendEmail(
      notifyEmail,
      "Turk Innovation reviews endpoint error",
      error && error.stack ? error.stack : String(error),
      { name: "Turk Innovation Reviews" },
    );
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function getApprovedReviews_() {
  const sheetId = getScriptProperty_("REVIEWS_SHEET_ID", "");

  if (!sheetId) {
    return { ok: true, reviews: [] };
  }

  const sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
  const values = sheet.getDataRange().getValues();

  if (values.length < 2) {
    return { ok: true, reviews: [] };
  }

  const headers = values[0].map((header) => String(header).trim());
  const valueFor = (row, header) => {
    const index = headers.indexOf(header);
    return index === -1 ? "" : row[index];
  };

  const reviews = values.slice(1).reduce((approved, row, rowIndex) => {
    const status = String(valueFor(row, "Moderation status")).trim().toLowerCase();
    if (status !== "approved") return approved;

    const rating = Number(valueFor(row, "Rating"));
    const name = String(valueFor(row, "Full name")).trim();
    const quote = String(valueFor(row, "Experience")).trim();

    if (!name || !quote || !isFinite(rating) || rating < 1 || rating > 5) {
      return approved;
    }

    const photoLinks = String(valueFor(row, "Prototype photo Drive links"))
      .split(/\r?\n/)
      .map((link) => getApprovedPhotoUrl_(link))
      .filter(Boolean)
      .slice(0, 3);

    approved.push({
      id: `review-${rowIndex + 1}`,
      name,
      location: String(valueFor(row, "Location")).trim(),
      project: String(valueFor(row, "Project")).trim(),
      rating,
      quote,
      images: photoLinks,
    });

    return approved;
  }, []);

  return { ok: true, reviews };
}

function getApprovedPhotoUrl_(storedLink) {
  const match = String(storedLink || "").match(/[-\w]{25,}/);
  if (!match) return "";

  const fileId = match[0];

  try {
    const file = DriveApp.getFileById(fileId);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
  } catch {
    return "";
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

function publicResponse_(payload, callback) {
  const callbackName = String(callback || "").trim();

  if (callbackName && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callbackName)) {
    return ContentService
      .createTextOutput(`${callbackName}(${JSON.stringify(payload)});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return jsonResponse_(payload);
}
