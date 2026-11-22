const { readFileSync } = require("node:fs");
const postcss = require("postcss");

// Vendor themes ship global selectors. Scope them at build time so changing
// the lamp never fetches another stylesheet or leaks styles between modes.
module.exports = () => ({
  postcssPlugin: "portfolio-theme-import",
  AtRule: {
    "light-theme-import"(rule, { result }) {
      const file = require.resolve(JSON.parse(rule.params));
      const sheet = postcss.parse(readFileSync(file, "utf8"), { from: file });
      sheet.walkRules((entry) => {
        entry.selectors = entry.selectors.map(
          (selector) => `:where([data-theme="light"]) ${selector}`,
        );
      });
      result.messages.push({
        type: "dependency",
        file,
        parent: rule.source.input.file,
      });
      rule.replaceWith(...sheet.nodes);
    },
  },
});
module.exports.postcss = true;
