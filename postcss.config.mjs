/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    [`${process.cwd()}/scripts/postcss-theme-import.cjs`]: {},
    tailwindcss: {},
  },
};

export default config;
