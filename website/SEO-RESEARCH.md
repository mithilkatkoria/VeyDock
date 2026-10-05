# Search and crawler research, 5 October 2026

## Search intent

Checked current results for Codex account switcher Windows, multiple Codex accounts, Codex profile manager, Codex usage manager, Claude Code account switcher Windows, multiple Claude Code accounts, Claude Code profile manager, usage limits and project context.

Results mix CLI utilities, Desktop switchers, account managers and quota monitors. VeyDock's meaningful distinction is the Windows multi-provider dock with explicit provider contracts, reservations, project routing and truthful quota freshness. Avoid promising unlimited use, evasion of service limits, proven concurrent identities or transfers of conversation memory.

Existing four Codex guide URLs are retained. Four Claude guides answer distinct questions: beta switching, account organisation, status-line quota and launching an unchanged project folder. Provider overviews are separated from setup instructions. Internal links make all routes discoverable.

## Primary provider facts

- https://code.claude.com/docs/en/authentication
- https://code.claude.com/docs/en/cli-reference
- https://code.claude.com/docs/en/env-vars
- https://code.claude.com/docs/en/statusline

The official authentication docs support separate configuration directories but exclude keyless Console isolation. Supported status-line quotas become available after a response and may be absent. No scraping or invented quota API is used.

## Crawler policy

- Google: https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers
- Bing: https://www.bing.com/webmasters/help/help/which-crawlers-does-bing-use-8c184ec0
- OpenAI: https://developers.openai.com/api/docs/bots
- Anthropic: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity: https://docs.perplexity.ai/docs/resources/perplexity-crawlers

Search bots are allowed on public content. GPTBot and ClaudeBot training crawlers are separately disallowed. Claude-SearchBot, Claude-User, OAI-SearchBot and PerplexityBot are not conflated with training crawlers. Preview deployments remain noindex and blocked. robots.txt is voluntary crawl guidance, not an access-control mechanism or a ranking guarantee.

No ranking, indexing or field Core Web Vitals claim is made. Production lab audits and changed-URL IndexNow submissions are recorded separately after deployment. Search Console ownership still requires owner authentication.
