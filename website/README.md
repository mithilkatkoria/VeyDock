# VeyDock website

Astro + TypeScript, deployed to Vercel. This folder is independent of the desktop application. Source is covered by the repository MIT licence. Archivo and Martian Mono use SIL OFL; notices are distributed in public/licenses.

Run `npm ci`, then `npm run dev`. Validate with `npm run check` and `npm run build`. Vercel project Root Directory must be `website`.

Set SITE_URL to the canonical production origin. Release metadata is fetched from GitHub and held for 10 minutes per server instance. Pages use a 10-minute shared CDN cache with a short stale revalidation window. If GitHub fails, a labelled last-known release is displayed. Release filenames are resolved, not guessed.

Preview deployments are noindex and disallow crawling. OAI-SearchBot is allowed on production. GPTBot is separately disallowed; this is a chosen training-crawler policy, not a search-ranking claim. llms.txt contains factual navigation only.

Optional GA4, Clarity and Backplane analytics use environment variables and do not initialize before consent. Initial production has no analytics IDs. Downloads never depend on tracking. An external Backplane endpoint also requires adding its exact origin to the CSP connect-src directive before deployment. Never add secrets to PUBLIC variables.

Production uses direct GitHub installer links. Screenshots are captured from the actual current app interface with development-only simulated data and streamer masking; they do not prove live switching and are labelled newer than the public alpha.

Human review of privacy and terms is still required. Google Search Console and Bing account verification require the maintainer's own account. See the launch report for exact next actions.

Search verification: set PUBLIC_GOOGLE_SITE_VERIFICATION and PUBLIC_BING_SITE_VERIFICATION to the tags issued by your own accounts, then redeploy. Submit /sitemap.xml. IndexNow submissions accept explicit changed paths: node scripts/indexnow.mjs /changelog. Do not submit unchanged pages repeatedly.

Production checks: npm run test:production, npm run audit:production, and node scripts/links.mjs. These require Microsoft Edge on Windows, or adjust the browser channel for a supported Playwright browser. They measure the live URL, not localhost.
