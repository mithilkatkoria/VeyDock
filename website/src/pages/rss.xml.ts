import { pages } from "../lib/content";
import { site } from "../lib/release";
export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>VeyDock field notes</title><link>${site}</link><description>Practical Windows Codex guides by Mithil Katkoria.</description>${Object.entries(
      pages,
    )
      .filter(([, p]) => p.guide)
      .map(
        ([slug, p]) =>
          `<item><title>${p.title}</title><link>${site}/${slug}</link><guid>${site}/${slug}</guid><pubDate>Fri, 02 Oct 2026 12:00:00 GMT</pubDate><description>${p.description}</description></item>`,
      )
      .join("")}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
