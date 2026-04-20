import DOMPurify from "isomorphic-dompurify";

const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "em",
    "h2",
    "h3",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "class"],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "input", "button"],
  FORBID_ATTR: [/^on/i, "style", "srcset"],
};

export function sanitizeNewsHtml(html: string): string {
  if (!html) return "";

  const sanitized = DOMPurify.sanitize(html, SANITIZE_OPTIONS);

  // Ensure target=_blank links cannot access window.opener.
  return sanitized.replace(
    /<a([^>]*?)target="_blank"([^>]*?)>/gi,
    (_fullMatch, beforeTarget, afterTarget) => {
      const hasRel = /\brel\s*=/.test(`${beforeTarget}${afterTarget}`);
      if (hasRel) {
        return `<a${beforeTarget}target="_blank"${afterTarget}>`;
      }
      return `<a${beforeTarget}target="_blank" rel="noopener noreferrer"${afterTarget}>`;
    },
  );
}
