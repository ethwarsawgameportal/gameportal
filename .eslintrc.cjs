module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "eslint-config-prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
