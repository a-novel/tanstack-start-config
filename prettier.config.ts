import type { Config } from "prettier";

const config: Config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 120,
  importOrder: [
    // Static assets.
    "^(.*).(css|yaml|json)$",
    "^(.*).(svg|png|jpg|jpeg)$",
    // App imports.
    "^#/(.*)?$",
    "^~/(.*)?$",
    "^[./]",
    // A-novel imports.
    "^@a-novel(/(.*))?$",
    // Important.
    "^react(/(.*))?$",
    "^vite(/(.*))?$",
    // Other.
    "<THIRD_PARTY_MODULES>",
  ],
  importOrderSeparation: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default config;
