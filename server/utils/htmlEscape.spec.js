const { escapeHtml } = require("./htmlEscape.js");

describe("escapeHtml", () => {
  it("should escape HTML characters properly", () => {
    const input = `<script>Test escape&"'</script>`;

    expect(escapeHtml(input)).not.toEqual(input);
    expect(escapeHtml(input)).toEqual(
      "&lt;script&gt;Test escape&amp;&quot;&#039;&lt;/script&gt;"
    );
  });
});
