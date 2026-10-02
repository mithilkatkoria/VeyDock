# VEYDOCK WEBSITE LAUNCH

Validated 2 October 2026. Production URL: https://veydock-website.vercel.app

| Check | Result | Evidence or boundary |
| --- | --- | --- |
| Design | PASS | Actual production screenshots reviewed at 1920, 1440, 1366, 820, 430 and 390 px. Corrected stretched mobile media after first review. |
| Vercel production | PASS | Public deployment, Astro project, Root Directory website. |
| Custom domain | USER ACTION REQUIRED | No VeyDock domain ownership available. Recommended veydock.dev or veydock.draey.dev after ownership/DNS verification. |
| Homepage | PASS | 200, one H1, clear Windows product category. |
| Download | PASS | Real GitHub installer reached, 200, executable MZ header, 3,567,866 bytes. |
| GitHub integration | PASS | Connected Vercel project, repository homepage/description/topics updated. Source is published on main. |
| Current release metadata | PASS | GitHub release resolved to 0.1.0-alpha.4 and historical real asset filename. 10-minute server/CDN refresh, labelled fallback. |
| Tracked Backplane download | NOT YET AVAILABLE | No production endpoint configured. Direct download works without optional analytics. |
| robots.txt | PASS | Live 200, production crawling allowed. |
| OAI-SearchBot | PASS | Live robots explicitly allows search crawler. GPTBot has a separate disallow policy. |
| sitemap.xml | PASS | Live 200, 19 canonical page URLs; no preview/local/API/404 addresses. |
| llms.txt | PASS | Live 200 plain text, factual product description and limitations. |
| SoftwareApplication schema | PASS | Production JSON-LD parsed; real version/download, author, free offer; no ratings or invented metrics. External Google Rich Results eligibility has not been confirmed. |
| OpenGraph | PASS | Live metadata and 1200 x 630 custom image verified. |
| Google Search Console | USER ACTION REQUIRED | No authorized Search Console account available. Verification tag configuration prepared. |
| Bing / IndexNow | PASS / USER ACTION REQUIRED | Public key returned 200; IndexNow accepted three URLs with 202. Bing account verification remains yours. Acceptance does not prove indexing. |
| Lighthouse Desktop | 100 / 100 / 100 / 100 | Performance / accessibility / best practices / SEO, measured against public production. |
| Lighthouse Mobile | 100 / 100 / 100 / 100 | Same categories, measured against public production. |
| Accessibility | PASS | Axe scan: zero violations. Keyboard demo tested. This is not a complete human accessibility certification. |
| Reduced motion | PASS | Entrance animation disabled, sticky zoom/transitions disabled by media query. |
| Broken links | 0 internal | 20 internal destinations and 85 anchors checked. External services were not exhaustively audited. |
| Download tested | PASS | Actual linked GitHub executable fetched. Installer execution was not part of website testing. |

## Product truth

The website does not claim complete account-switch acceptance, permanent authentication, sub-1% memory use, a verified Windows publisher, or fully verified installer updating. Development screenshots are actual UI with streamer masking and simulated data, explicitly newer than the download. No simulated desktop launch video is presented as a real authenticated switch.

MIT copyright/attribution and branding guidance are linked. Font OFL notices are distributed. Privacy and terms are marked as requiring human legal review. Initial production has no optional analytics IDs and no tracking banner; environment-driven integrations are consent gated.

Lighthouse numbers are lab results. LCP, CLS and TBT measurements are recorded in reports/production-summary.json. Field INP and real-user Core Web Vitals are not yet available. Scores can vary between runs. Source checks/build pass; npm audit reports zero vulnerabilities at launch.

## Exact remaining owner actions

1. Custom domain: register or confirm control of veydock.dev, or use your existing draey.dev DNS. Add the domain to the Vercel veydock-website project, follow the exact DNS record Vercel supplies, set SITE_URL to the new HTTPS origin and redeploy. Set it as the primary domain, update GitHub and resubmit the canonical sitemap. Do not index both origins.
2. Google: open Search Console with your account, add the URL-prefix property https://veydock-website.vercel.app/, choose HTML-tag verification, put only its content token in PUBLIC_GOOGLE_SITE_VERIFICATION on Vercel and redeploy. Verify, submit https://veydock-website.vercel.app/sitemap.xml, inspect /, /download and /guides/multiple-codex-accounts-windows, then request indexing. A custom-domain switch needs a corresponding new property.
3. Bing: add the same canonical site in Bing Webmaster Tools. Import the verified Search Console property or use its HTML tag via PUBLIC_BING_SITE_VERIFICATION, redeploy, verify and submit the sitemap. IndexNow is already accepted independently.
4. Legal: review website privacy and terms before treating them as final legal notices. Configure analytics only after updating the notice and consent choices to reflect real services.
5. Optional rich results: open Google's Rich Results Test for the production homepage. Schema syntax was validated locally against the rendered document, but no Google eligibility result is asserted here.

## Maintaining the site

The Vercel GitHub connection deploys changes on main using website as the root. PR previews are noindex; alternate deployment hosts send X-Robots-Tag: noindex. GitHub remains the source for download metadata. Submit IndexNow only for changed public URLs using scripts/indexnow.mjs. Desktop files were not modified by the website work.
