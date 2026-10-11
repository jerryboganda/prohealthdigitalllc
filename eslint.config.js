import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".output", ".astro", ".claude", ".qa-tmp", "video", "node_modules", "public"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,mjs,js}"],
    languageOptions: { ecmaVersion: 2022, globals: { ...globals.browser, ...globals.node } },
    rules: { "@typescript-eslint/no-unused-vars": "off" },
  },
  ...eslintPluginAstro.configs["flat/recommended"],
  eslintPluginPrettier,
  { files: ["**/*.astro"], rules: { "prettier/prettier": "off" } },
);
