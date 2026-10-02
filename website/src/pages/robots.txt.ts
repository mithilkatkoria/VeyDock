import { site } from "../lib/release";
export function GET() {
  const preview = import.meta.env.VERCEL_ENV === "preview";
  return new Response(
    preview
      ? "User-agent: *\nDisallow: /\n"
      : `User-agent: *\nAllow: /\nDisallow: /api/\n\nUser-agent: OAI-SearchBot\nAllow: /\nDisallow: /api/\n\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: ${site}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
