/**
 * Convert special characters to HTML entities to prevent XSS attacks
 * @param {string} text string to convert
 * @returns {string} string convert
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text?.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

module.exports = { escapeHtml };
