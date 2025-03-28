import globals from "globals";
import jseslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  jseslint.configs.recommended,
  tseslint.configs.recommended,
  {ignores: ["benchmark/*.js"]},
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      ecmaVersion: 5,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {modules: true},
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", {args: "none"}],
      "prefer-const": "warn",
    }
  },
  eslintConfigPrettier
);
