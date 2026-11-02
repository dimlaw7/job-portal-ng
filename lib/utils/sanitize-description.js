import sanitizeHtml from "sanitize-html";

export function sanitizeDescription(description) {
  return sanitizeHtml(description, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
    ],

    allowedAttributes: {
      a: ["href"],
    },

    allowedSchemes: ["http", "https", "mailto"],
  });
}
