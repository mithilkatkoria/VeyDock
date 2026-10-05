import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
export default defineConfig({
  site: process.env.SITE_URL || "https://veydock.vercel.app",
  output: "server",
  adapter: vercel(),
  trailingSlash: "never",
});
