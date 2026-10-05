import { readFile, readdir } from "node:fs/promises";
const origin = process.env.SITE_URL || "https://veydock.vercel.app";
const files = await readdir(new URL("../public/", import.meta.url));
const file = files.find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
const key = (
  await readFile(new URL("../public/" + file, import.meta.url), "utf8")
).trim();
const urls = process.argv.slice(2).map((p) => new URL(p, origin).href);
if (!urls.length) throw Error("Pass only changed page paths, e.g. /changelog");
if (urls.some((u) => new URL(u).origin !== new URL(origin).origin))
  throw Error("URLs must belong to the canonical site");
const verified = await fetch(`${origin}/${file}`);
if (!verified.ok || (await verified.text()).trim() !== key)
  throw Error("Public key not verified");
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    host: new URL(origin).hostname,
    key,
    keyLocation: `${origin}/${file}`,
    urlList: urls,
  }),
});
console.log("IndexNow:", response.status);
if (![200, 202].includes(response.status)) throw Error(await response.text());
