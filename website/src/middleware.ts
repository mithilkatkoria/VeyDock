import { defineMiddleware } from "astro:middleware";
import { site } from "./lib/release";
export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.hostname === "veydock-website.vercel.app") {
    const destination = new URL(context.url.pathname + context.url.search, site);
    return Response.redirect(destination, 308);
  }
  const response = await next();
  if (context.url.hostname !== new URL(site).hostname)
    response.headers.set("X-Robots-Tag", "noindex, follow");
  return response;
});
