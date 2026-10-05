# VeyDock universal website launch

Validated 5 October 2026 against https://veydock-website.vercel.app. The site is deployed through the existing GitHub integration with `website` as the Vercel root.

| Check | Result | Evidence or boundary |
| --- | --- | --- |
| Visual redesign | PASS | New editorial hero, two-provider rail, actual mixed-provider interface preview, five-stage Dock Rail and provider capability matrix. Graphite, bone and signal orange. |
| Multi-provider messaging | PASS | Windows profile dock for AI coding tools. Claude Code explicitly beta; Codex remains represented. |
| Provider documentation | PASS | Provider index, two overviews and two setup manuals. Claude docs describe native CLI authentication, directory verification, helper whitelist and unsupported keyless Console isolation. |
| Codex SEO cluster | PASS | Four existing guide URLs preserved. |
| Claude SEO cluster | BETA, PUBLISHED | Four distinct guides with answer-first content and official sources. No promise of proven multi-account switching. |
| Production | PASS | Connected Vercel GitHub deployment reports success. Public canonical returns 200. |
| Metadata and schema | PASS | 30 canonical sitemap pages return 200, each with one H1, description and parsed JSON-LD. Product version and download use GitHub release metadata. No invented ratings. |
| Responsive layout | PASS | 1920, 1440, 1366, 820, 430 and 390 px: no horizontal overflow. |
| Browser and keyboard | PASS | No unexpected browser errors. Ctrl + K demo, arrows, Enter and Escape checked. Demo cannot control local apps. |
| Reduced motion | PASS | No entrance animation under reduced-motion preference. |
| Downloads | PASS for currently linked release | Actual GitHub installer fetched with executable MZ header. Recheck after new beta installer publication. Clean-machine installation is not a website test. |
| Internal links | PASS | 30 destinations and 145 anchors checked, zero broken. |
| Accessibility | PASS for automated scan | Axe: zero violations. Not a human accessibility certification. |
| Lighthouse desktop | 100 / 100 / 100 / 100 | Performance, accessibility, best practices, SEO. Production lab result. |
| Lighthouse mobile | 96 / 100 / 100 / 100 | Same categories. Production lab result. |
| Core Web Vitals | FIELD DATA NOT AVAILABLE | Lab LCP/CLS/TBT in reports/production-summary.json. No field INP claim. |
| robots.txt | PASS | Search crawlers allowed on public content. GPTBot and ClaudeBot training policy separately disallowed. Preview hosts remain noindex. |
| AI search discovery | PASS for technical preparation | OAI-SearchBot, Claude-SearchBot, Claude-User and PerplexityBot policy checked against primary documentation. Factual llms.txt and provider docs published. Not an indexing guarantee. |
| OpenGraph | PASS | Broader 1200 x 630 product card and social metadata. |
| IndexNow | PASS | Changed content URLs accepted with HTTP 200. This does not prove indexing. |
| Dependency audit | PASS | Cache dependency updated to 4.3.0 after CI caught a newly reported advisory. npm audit reports zero vulnerabilities; rebuilt successfully. |
| MIT and branding | PASS | MIT source licence, ownership/attribution and branding guidance retained. Font OFL notices distributed. Independent of OpenAI and Anthropic. |
| Google Search Console | USER ACTION REQUIRED | Ownership authentication and verification are not available to this session. |
| Custom domain | USER ACTION REQUIRED | Current canonical remains the verified Vercel origin. |
| Optional analytics | NOT CONFIGURED | No production GA, Clarity or Backplane IDs. No private profile data is sent by website demos. |

## Product boundary

The native product has a provider registry, non-destructive Codex defaults for legacy profiles, Claude terminal orchestration and supported quota-cache handling. Local checks passed 38 frontend tests and 28 native Windows tests. The official Claude 2.1.289 CLI was probed in a disposable signed-out configuration directory. The PowerShell helper whitelist test passed.

Real Claude A → B → A, authenticated launch, browser-free persistent relaunch and comparison with `/usage` require two authorised interactive sign-ins and remain blocked. Claude stays beta. Codex real Desktop A/B/A acceptance remains pending from the earlier alpha; transaction regression tests are not a substitute. Windows publisher signing and clean-machine installer-update acceptance also remain pending. See ../VERIFICATION.md and ../docs/CLAUDE_CODE.md.

Screenshots show actual implemented components with private-safe simulated data. They are labelled development previews. No fake production quota or authenticated switch video is presented.

## Exact remaining owner actions

1. Custom domain: register or confirm control of veydock.dev, or use your existing draey.dev DNS. Add the domain to the Vercel veydock-website project, follow the exact DNS record Vercel supplies, set SITE_URL to the new HTTPS origin and redeploy. Set it as the primary domain, update GitHub and resubmit the canonical sitemap. Do not index both origins.
2. Google: open Search Console with your account, add the URL-prefix property https://veydock-website.vercel.app/, choose HTML-tag verification, put only its content token in PUBLIC_GOOGLE_SITE_VERIFICATION on Vercel and redeploy. Verify, submit https://veydock-website.vercel.app/sitemap.xml, inspect /, /download and /guides/multiple-codex-accounts-windows, then request indexing. A custom-domain switch needs a corresponding new property.
3. Bing: add the same canonical site in Bing Webmaster Tools. Import the verified Search Console property or use its HTML tag via PUBLIC_BING_SITE_VERIFICATION, redeploy, verify and submit the sitemap. IndexNow is already accepted independently.
4. Legal: review website privacy and terms before treating them as final legal notices. Configure analytics only after updating the notice and consent choices to reflect real services.
5. Optional rich results: open Google's Rich Results Test for the production homepage. Schema syntax was validated locally against the rendered document, but no Google eligibility result is asserted here.

## Maintaining the site

The Vercel GitHub connection deploys changes on main using website as the root. PR previews are noindex; alternate deployment hosts send X-Robots-Tag: noindex. GitHub remains the source for download metadata. Submit IndexNow only for changed public URLs using scripts/indexnow.mjs. Desktop and website changes are now tracked together. Keep provider acceptance claims aligned with the native verification record.
