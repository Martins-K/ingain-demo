const eslintConfigAirbnbBase = require("eslint-config-airbnb-base");

module.exports = {
  ignores: ["src/config/wdio.conf.js", "allure-report/", "allure-results/"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: { local: eslintConfigAirbnbBase },
  rules: {
    quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
    semi: ["error", "always"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "max-len": "off",
    "no-unused-vars": "warn",
    "class-methods-use-this": "off",
    "arrow-parens": "off",
    "prefer-arrow-callback": "off",
    "func-names": "off",
    "object-curly-newline": "off",
    "linebreak-style": "off",
    "prefer-destructuring": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
  },
};
