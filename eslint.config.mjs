// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default withNuxt(
  // Your custom configs here
  [...pluginQuery.configs["flat/recommended"]],
);
