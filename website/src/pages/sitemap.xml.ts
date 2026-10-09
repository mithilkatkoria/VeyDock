import { pages } from "../lib/content";
import { site } from "../lib/release";
export const routes = ["", "download", "changelog", ...Object.keys(pages)];
const modifiedRoutes = new Set(["guides", "docs", "docs/getting-started", "guides/multiple-codex-accounts-windows", "about", "terms", "providers"]);
export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((r) => `<url><loc>${site}/${r}</loc><lastmod>${modifiedRoutes.has(r) ? "2026-10-09" : r === "" ? "2026-10-08" : "2026-10-05"}</lastmod></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
