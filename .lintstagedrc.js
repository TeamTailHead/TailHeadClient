module.exports = {
  // "**/*.(ts|tsx)": "yarn tsc --noEmit",
  "*.{js,jsx,ts,tsx}": [
    "eslint --ignore-path .gitignore --resolve-plugins-relative-to . --fix",
    "prettier --ignore-path .gitignore --write",
  ],
};
