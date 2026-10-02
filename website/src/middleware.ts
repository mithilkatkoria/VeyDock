import { defineMiddleware } from "astro:middleware";
import { site } from "./lib/release";
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (context.url.hostname !== new URL(site).hostname)
    response.headers.set("X-Robots-Tag", "noindex, follow");
  return response;
});
