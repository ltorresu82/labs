import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ltorresu82.github.io",
  base: "/labs",
  output: "static",
  trailingSlash: "always",
  vite: {
    worker: {
      format: "es"
    }
  }
});
