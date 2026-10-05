export const repository = "https://github.com/mithilkatkoria/VeyDock";
export const site = (
  import.meta.env.SITE_URL || "https://veydock-website.vercel.app"
).replace(/\/$/, "");
export const fallback = {
  version: "0.2.0-beta.1",
  date: "2026-10-05T12:43:18Z",
  prerelease: true,
  size: 3620212,
  name: "VeyDock-setup.exe",
  url: `${repository}/releases/download/v0.2.0-beta.1/VeyDock-setup.exe`,
  release: `${repository}/releases/tag/v0.2.0-beta.1`,
  checksums: `${repository}/releases/download/v0.2.0-beta.1/SHA256SUMS.txt`,
  stale: true,
};
let cached: typeof fallback | undefined;
let expires = 0;
export async function getRelease() {
  if (cached && Date.now() < expires) return cached;
  try {
    const response = await fetch(
      "https://api.github.com/repos/mithilkatkoria/VeyDock/releases",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "VeyDock-website",
        },
        signal: AbortSignal.timeout(4500),
      },
    );
    if (!response.ok) throw new Error("GitHub unavailable");
    const releases = await response.json();
    const release = releases.find(
      (r: any) =>
        !r.draft &&
        r.assets.some((a: any) =>
          /setup.*\.exe$|installer.*\.exe$/i.test(a.name),
        ),
    );
    if (!release) throw new Error("No installer");
    const asset = release.assets.find((a: any) =>
      /setup.*\.exe$|installer.*\.exe$/i.test(a.name),
    );
    cached = {
      version: release.tag_name.replace(/^v/, ""),
      date: release.published_at,
      prerelease: release.prerelease,
      size: asset.size,
      name: asset.name,
      url: asset.browser_download_url,
      release: release.html_url,
      checksums:
        release.assets.find((a: any) => /SHA256SUMS/i.test(a.name))
          ?.browser_download_url || release.html_url,
      stale: false,
    };
    expires = Date.now() + 600000;
    return cached!;
  } catch {
    cached = cached ? { ...cached, stale: true } : fallback;
    expires = Date.now() + 60000;
    return cached;
  }
}
