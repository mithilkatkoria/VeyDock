# VeyDock universal website launch

Validated 5 October 2026 against https://veydock.vercel.app. The site is deployed through the existing GitHub integration with `website` as the Vercel root.

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
| Downloads | PASS for currently linked release | Published v0.2.0-beta.1 installer downloaded (3,620,212 bytes), SHA256 matched and updater signature verified. A modified installer was rejected. Clean-machine installation is not a website test. |
| Internal links | PASS | 30 destinations and 146 anchors checked, zero broken. |
| Accessibility | PASS for automated scan | Axe: zero violations. Not a human accessibility certification. |
| Lighthouse desktop | 100 / 100 / 100 / 100 | Performance, accessibility, best practices, SEO. Production lab result. |
| Lighthouse mobile | 100 / 100 / 100 / 100 | Same categories. Production lab result. |
| Core Web Vitals | FIELD DATA NOT AVAILABLE | Lab LCP/CLS/TBT in reports/production-summary.json. No field INP claim. |
| robots.txt | PASS | Search crawlers allowed on public content. GPTBot and ClaudeBot training policy separately disallowed. Preview hosts remain noindex. |
| AI search discovery | PASS for technical preparation | OAI-SearchBot, Claude-SearchBot, Claude-User and PerplexityBot policy checked against primary documentation. Factual llms.txt and provider docs published. Not an indexing guarantee. |
| OpenGraph | PASS | Broader 1200 x 630 product card and social metadata. |
| IndexNow | PASS | Changed content URLs accepted with HTTP 200. This does not prove indexing. |
| Dependency audit | PASS | Cache dependency updated to 4.3.0 after CI caught a newly reported advisory. npm audit reports zero vulnerabilities; rebuilt successfully. |
| MIT and branding | PASS | MIT source licence, ownership/attribution and branding guidance retained. Font OFL notices distributed. Independent of OpenAI and Anthropic. |
| Google Search Console | VERIFIED | HTML-file ownership verified. Homepage live test: available to Google and can be indexed. Manual indexing request hit the daily quota; sitemap submitted but initial fetch status remains unsuccessful. |
| Custom domain | USER ACTION REQUIRED | Current canonical remains the verified Vercel origin. |
| Optional analytics | NOT CONFIGURED | No production GA, Clarity or Backplane IDs. No private profile data is sent by website demos. |

## Product boundary

The native product has a provider registry, non-destructive Codex defaults for legacy profiles, Claude terminal orchestration and supported quota-cache handling. Local checks passed 38 frontend tests and 28 native Windows tests. The official Claude 2.1.289 CLI was probed in a disposable signed-out configuration directory. The PowerShell helper whitelist test passed.

Real Claude A → B → A, authenticated launch, browser-free persistent relaunch and comparison with `/usage` require two authorised interactive sign-ins and remain blocked. Claude stays beta. Codex real Desktop A/B/A acceptance remains pending from the earlier alpha; transaction regression tests are not a substitute. Windows publisher signing and clean-machine installer-update acceptance also remain pending. See ../VERIFICATION.md and ../docs/CLAUDE_CODE.md.

Screenshots show actual implemented components with private-safe simulated data. They are labelled development previews. No fake production quota or authenticated switch video is presented.

## Exact remaining owner actions

1. Custom domain: register or confirm control of veydock.dev, or use your existing draey.dev DNS. Add the domain to the Vercel veydock-website project, follow the exact DNS record Vercel supplies, set SITE_URL to the new HTTPS origin and redeploy. Set it as the primary domain, update GitHub and resubmit the canonical sitemap. Do not index both origins.
2. Google: the URL-prefix property https://veydock.vercel.app/ is verified. Keep public/googleb908c3122c3bff26.html deployed to retain ownership. Retry the manual homepage indexing request after the daily quota resets. Recheck the submitted sitemap fetch status; public XML returns HTTP 200 and parses successfully, but Google initially reported it could not read the sitemap. Do not describe this as completed indexing. A custom-domain switch needs a new property.
3. Bing: add the same canonical site in Bing Webmaster Tools. Import the verified Search Console property or use its HTML tag via PUBLIC_BING_SITE_VERIFICATION, redeploy, verify and submit the sitemap. IndexNow is already accepted independently.
4. Legal: review website privacy and terms before treating them as final legal notices. Configure analytics only after updating the notice and consent choices to reflect real services.
5. Optional rich results: open Google's Rich Results Test for the production homepage. Schema syntax was validated locally against the rendered document, but no Google eligibility result is asserted here.

## Maintaining the site

The Vercel GitHub connection deploys changes on main using website as the root. PR previews are noindex; alternate deployment hosts send X-Robots-Tag: noindex. GitHub remains the source for download metadata. Submit IndexNow only for changed public URLs using scripts/indexnow.mjs. Desktop and website changes are now tracked together. Keep provider acceptance claims aligned with the native verification record.

## Canonical address migration

The production address is now https://veydock.vercel.app. The previous veydock-website.vercel.app address redirects to it. Fresh production Lighthouse measurements and Search Console ownership verification now use the canonical VeyDock origin.

## Interactive switch film

The homepage now includes a lightweight, user-controlled illustrated walkthrough for Codex Desktop and Claude Code beta. Fictional example.com identities and a persistent simulated-demo label distinguish it from real account acceptance. Codex shows the normal-quit handoff; Claude shows its Windows terminal rather than Claude Desktop. No provider credentials or local launch requests are used.

Validated play/pause, account selection, provider changes, scrubbing, replay, keyboard range input, reduced-motion manual scenes, six viewport widths and zero Axe violations in the film. Animation pauses off screen or when the tab is hidden. Run node scripts/test-switch-film.mjs from website, optionally with TEST_ORIGIN set to production.

## Free product positioning and search maintenance

Homepage, download page, metadata, provider descriptions and GitHub now explain the free MIT app, real Codex usage, project shortcuts and Claude Code beta. Provider subscriptions and usage limits remain separate. No unverified authenticated switching or number-one ranking is promised.

Once Search Console has data, review queries, pages, impressions and clicks. Improve pages that answer real user questions, compare changes over several weeks and maintain accurate release information. Google selects rankings and snippets; a perfect technical audit is not a ranking guarantee.

## Google follow-up, 9 October 2026

The 6 October Search Console check confirmed the sitemap succeeded and discovered 30 pages. The homepage remained unindexed and its manual request again hit the daily quota. On 9 October the browser-control connection was unavailable, so no fresh Search Console result or indexing request is claimed. No automatic retry schedule remains active. The guides index now describes both supported provider topics, outdated alpha wording has been corrected, and sitemap modification dates reflect actual edited pages.
