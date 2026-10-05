const repo = "https://github.com/mithilkatkoria/VeyDock";
export type Section = { id: string; title: string; html: string };
export type Page = {
  title: string;
  description: string;
  label: string;
  sections: Section[];
  guide?: boolean;
};
const section = (id: string, title: string, html: string) => ({
  id,
  title,
  html,
});
const verification = `<p>The public build is an alpha. Independent usage refresh has been observed with real profiles. Complete A/B/A switching and installer-driven updating have not yet passed documented real-desktop acceptance. Read the <a href="${repo}/blob/main/VERIFICATION.md">verification record</a> before relying on a workflow.</p>`;
const quit = `<p>Save your work and quit Codex through its normal menu. Keep VeyDock open. A workspace handoff waits for Codex to finish closing before replacing local authentication. Do not sign out to switch: signing out can revoke a saved login. VeyDock does not silently rotate accounts or force-kill Codex.</p>`;
const data = `<p>Hub state and managed profile homes live under <code>%USERPROFILE%\\.draey-codex-hub</code>. The shared Codex workspace normally lives under <code>%USERPROFILE%\\.codex</code>. Authentication files and recovery copies can contain tokens. Keep them out of Git, cloud sharing and public support attachments. Local storage is not a claim of encryption or a security audit.</p>`;
const usage = `<p>VeyDock reads Codex app-server <code>account/rateLimits/read</code> independently for configured profiles. The dashboard shows the windows the service returns, rather than forcing every plan into a session-and-weekly template. Missing readings are N/A, not a synthetic 100% allowance.</p><p>Remaining percentage and used percentage are different. A 20% remaining reading means 80% used in that reported window. Reset countdowns and exact dates refer to that window, not a promise that every limit will reset together.</p>`;
const stale = `<p>Live means the most recent refresh succeeded. Cached means you are seeing an older confirmed reading. Check the timestamp before choosing an account. A failed refresh does not prove that an account has no allowance, and cached allowance does not prove that a login is still valid.</p>`;
export const pages: Record<string, Page> = {
  features: {
    title: "What VeyDock does",
    label: "PRODUCT / CAPABILITIES",
    description:
      "Explore VeyDock profiles, real Codex usage windows, deliberate switching, quick launch and privacy controls.",
    sections: [
      section(
        "profiles",
        "Profiles, with no fixed cap",
        "<p>Add the accounts you already use. Give each a useful label and choose explicitly. Reserved and Friend Priority states stay visible. Pro is not automatically preferred. Profile count is not a paid tier.</p>",
      ),
      section("usage", "Limits that respect the account plan", usage + stale),
      section("launch", "A shared-workspace handoff", quit + verification),
      section(
        "quick",
        "Quick launch and Windows integration",
        "<p>Ctrl + K opens the desktop action palette. The tray provides quick access, while project shortcuts use your configured targets. Streamer mode offers Auto, On and Off. Auto detects supported recording applications running, not whether recording has actually started.</p><p>The website quick dock is only a demonstration. It cannot control your local installation.</p>",
      ),
    ],
  },
  "how-it-works": {
    title: "Choose a profile. Keep the workspace.",
    label: "WORKFLOW / HANDOFF",
    description:
      "Understand how VeyDock authenticates profiles, reads usage and prepares a normal-quit Codex workspace handoff.",
    sections: [
      section(
        "connect",
        "1. Connect each profile",
        "<p>Create a profile in VeyDock, then use the normal Codex/OpenAI browser sign-in. Check that you selected the intended account. VeyDock does not ask you for your Google or ChatGPT password.</p>",
      ),
      section("read", "2. Read its own allowance", usage),
      section("choose", "3. Choose deliberately", quit),
      section(
        "handoff",
        "4. Know the boundary",
        "<p>The shared-workspace path transfers local authentication after a normal quit, preserving the existing projects and tasks instead of creating a fresh desktop workspace. Independent CLI sessions can also use authentication state, so finish those before a handoff. File-based credentials are required for this path; unsupported keyring configurations are rejected rather than silently converted.</p>" +
          verification,
      ),
    ],
  },
  security: {
    title: "Local control. Clear boundaries.",
    label: "SECURITY / READ BEFORE CONNECTING",
    description:
      "How VeyDock handles Codex authentication, sensitive local files, streamer mode and responsible security reporting.",
    sections: [
      section(
        "authentication",
        "Normal authentication, not password collection",
        "<p>Sign-in is handled through Codex and OpenAI. VeyDock never provides a ChatGPT password form. Managed profiles keep separate Codex authentication homes for connecting and reading usage. The shared-workspace launch path deliberately hands off authentication after Codex closes.</p>",
      ),
      section(
        "local-data",
        "Treat saved logins as secrets",
        data +
          "<p>No independent security audit is claimed. Do not assume authentication backups are encrypted by VeyDock. Protect your Windows account and disk, and never share a profile home with someone else.</p>",
      ),
      section(
        "streamer",
        "Streamer mode is a display safeguard",
        "<p>On hides private labels, emails and folder paths shown by the Hub. Auto applies masking when a supported recording app is detected running, including conservative tray behaviour. Detection is not proof of recording. Use On before a screen share.</p><p>It cannot hide information inside Codex, browser sign-in windows, Windows Explorer or other applications. Masking does not encrypt the saved files.</p>",
      ),
      section(
        "network",
        "What leaves the computer",
        '<p>Authentication and usage requests go through Codex to OpenAI. Release/update checks and source links reach GitHub. Browser sign-in opens the relevant authentication service. This website is hosted on Vercel; see its separate <a href="/privacy">privacy notice</a>. No claim is made that third-party services operate without logs.</p>',
      ),
      section(
        "report",
        "Report vulnerabilities privately",
        `<p>Follow <a href="${repo}/blob/main/SECURITY.md">SECURITY.md</a> and use GitHub private vulnerability reporting where available. Do not publish tokens or authentication files in an issue. For ordinary bugs, include the app version, Windows architecture and a sanitised description.</p>`,
      ),
    ],
  },
  docs: {
    title: "The operating manual",
    label: "DOCUMENTATION / START HERE",
    description:
      "Install VeyDock, add Codex profiles, understand switching and interpret real usage limits on Windows.",
    sections: [
      section(
        "start",
        "From download to your first profile",
        '<ul class="index-list"><li><a href="/docs/getting-started">Getting started</a><p>Installer, Windows requirements and first run.</p></li><li><a href="/docs/add-profile">Add a profile</a><p>Connect an account and check the identity.</p></li><li><a href="/docs/switch-profiles">Switch profiles</a><p>Normal quitting, saved credentials and troubleshooting.</p></li><li><a href="/docs/usage-limits">Read usage limits</a><p>Windows, resets and stale readings.</p></li></ul>',
      ),
      section(
        "status",
        "Before relying on the alpha",
        verification +
          "<p>VeyDock is independent and is not affiliated with or endorsed by OpenAI or Anthropic.</p>",
      ),
    ],
  },
  "docs/getting-started": {
    title: "Getting started on Windows",
    label: "DOCS / 01",
    description:
      "Download the real VeyDock Windows x64 installer, understand unsigned-app warnings and connect your first Codex profile.",
    sections: [
      section(
        "requirements",
        "Check the requirements",
        "<p>The public release is Windows x64. ARM Windows has been used through x64 emulation; a native ARM installer is not provided. Install Codex Desktop and ensure the Codex CLI is available. The app uses Microsoft Edge WebView2. A missing-runtime error may require the Microsoft Visual C++ x64 runtime.</p><p>End users do not need Node.js, Rust or a source checkout. The source ZIP on GitHub is not a compiled application.</p>",
      ),
      section(
        "install",
        "Download and install",
        '<ol><li>Open the <a href="/download">download page</a> and choose the real setup EXE.</li><li>Compare the downloaded file with the release checksum if you want to verify integrity.</li><li>Run the installer, then open VeyDock from Windows.</li><li>Add a profile and complete the normal OpenAI sign-in.</li></ol><p>The current alpha is unsigned. Windows may display Unknown publisher or SmartScreen warnings. Do not bypass warnings on an unexpected file. Verify that it came from the linked GitHub release. Updater signatures are not Windows publisher certificates.</p>',
      ),
      section(
        "first-run",
        "First run",
        "<p>Confirm the detected Codex installation, connect a profile, and wait for its independent usage refresh. Check the reported account identity and data timestamp. Use a test session before relying on the switching workflow for important work.</p>" +
          verification,
      ),
      section(
        "updates",
        "Installing later releases",
        "<p>The alpha includes a release check and an explicit install action. Automatic installation is not silently performed. Installer-driven updates still require real acceptance testing. You can install a newer release over the current app; Hub data lives separately. Back up sensitive local state privately first.</p>",
      ),
    ],
  },
  "docs/add-profile": {
    title: "Add and connect a profile",
    label: "DOCS / 02",
    description:
      "Create a VeyDock profile and connect the intended Codex account through the normal OpenAI sign-in flow.",
    sections: [
      section(
        "create",
        "Create a useful label",
        "<p>Choose Add account and enter a label you can recognise. The app does not impose a four-account maximum. Three or more accounts should each remain an explicit choice, not a sequence the app rotates through automatically.</p>",
      ),
      section(
        "connect",
        "Connect the intended identity",
        "<ol><li>Start Connect account on that profile.</li><li>Complete Codex/OpenAI sign-in in the browser.</li><li>Choose the intended Google or OpenAI identity if the browser has multiple sessions.</li><li>Return to VeyDock and check the account information and usage result.</li></ol><p>Do not paste authentication files into a public issue if sign-in stalls. Cancel a pending attempt, check the browser callback and try again. A browser sign-in completing does not by itself prove that the app has saved the intended profile.</p>",
      ),
      section(
        "saved",
        "Understand saved credentials",
        data +
          "<p>A revoked or expired login may need reconnection. Logging out in Codex can invalidate a saved credential. The app should not be described as guaranteeing that accounts never need sign-in again.</p>",
      ),
      section(
        "reservation",
        "Set a reservation deliberately",
        "<p>Reserved and Friend Priority let you mark an account for someone else or for a later task. Keep those decisions explicit. Removing a profile from the Hub is separate from cancelling a third-party subscription.</p>",
      ),
    ],
  },
  "docs/switch-profiles": {
    title: "Switch profiles safely",
    label: "DOCS / 03",
    description:
      "How to prepare a Codex profile handoff without replacing your projects, and what to check when switching fails.",
    sections: [
      section(
        "before",
        "Before selecting another profile",
        "<p>Check that the target profile is connected and that its usage reading is recent. Save ongoing work. Finish independent CLI sessions that might share authentication. Respect Reserved and Friend Priority labels.</p>",
      ),
      section("quit", "Quit normally, not Sign out", quit),
      section(
        "verify",
        "Verify the opened identity",
        "<p>After Codex reopens, inspect the account shown inside Codex itself. A Hub button completing or an authentication file changing is not proof of the account displayed in the desktop app. Your existing workspace and projects should remain present.</p>" +
          verification,
      ),
      section(
        "troubleshoot",
        "If the handoff does not finish",
        '<ul><li>If Codex is still closing, respond to any unfinished-work prompt. Do not repeatedly click launch.</li><li>If the wait times out, cancel and confirm that all Codex windows have quit normally.</li><li>If credentials were revoked, reconnect that profile once through OpenAI.</li><li>If file credentials are unsupported, inspect the configuration rather than moving secrets by hand.</li></ul><p>Record a sanitised error, Windows version and app version in a <a href="https://github.com/mithilkatkoria/VeyDock/issues">GitHub issue</a>. Never include tokens.</p>',
      ),
    ],
  },
  "docs/usage-limits": {
    title: "Read the allowance, not a guess",
    label: "DOCS / 04",
    description:
      "Understand VeyDock remaining percentages, Codex rate-limit windows, reset dates, live readings and cached data.",
    sections: [
      section("windows", "Windows are reported, not assumed", usage),
      section("freshness", "Freshness is part of the reading", stale),
      section(
        "plans",
        "Plus, Team and Pro can differ",
        '<p>VeyDock renders the windows actually returned for an account. Session and weekly windows may appear, while other accounts can return different or additional buckets. Spark allowances and banked resets are shown only when reported. N/A means a value was not reported; it should not be read as zero.</p><p>Account plan labels alone cannot tell you the current allowance. OpenAI can change product limits. Refer to the <a href="https://developers.openai.com/codex/pricing/">official Codex pricing documentation</a> for current service terms.</p>',
      ),
      section(
        "failure",
        "When a refresh fails",
        "<p>Profiles refresh independently so one authentication or network failure should not block another account. A cached meter is retained with a timestamp. If authentication is required, reconnect that account and check Codex itself. VeyDock never manufactures fallback allowances in production.</p>",
      ),
    ],
  },
  guides: {
    title: "Practical Codex guides",
    label: "FIELD NOTES / WINDOWS",
    description:
      "Useful guides to multiple Codex accounts, Windows switching, profile storage and interpreting usage limits.",
    sections: [
      section(
        "reading",
        "Choose the question you came with",
        '<ul class="index-list"><li><a href="/guides/multiple-codex-accounts-windows">Managing multiple Codex accounts on Windows</a><p>Identity, reservations and workspace boundaries.</p></li><li><a href="/guides/switch-codex-accounts-windows">Switching Codex accounts on Windows</a><p>A deliberate handoff and an identity check.</p></li><li><a href="/guides/codex-usage-limits-windows">Understanding Codex usage limits</a><p>Read windows, resets and freshness together.</p></li><li><a href="/guides/codex-profiles-windows">What a Codex profile stores</a><p>Separate account identity from the desktop workspace.</p></li></ul>',
      ),
    ],
  },
  "guides/multiple-codex-accounts-windows": {
    title: "Multiple Codex accounts on Windows",
    label: "GUIDE / PROFILE MANAGEMENT",
    guide: true,
    description:
      "Keep multiple Codex identities organised on Windows while preserving workspace context and choosing accounts deliberately.",
    sections: [
      section(
        "identities",
        "Separate identity from the work",
        "<p>An account answers who you are authenticated as. A workspace contains the projects and tasks you work with. Confusing those two can leave you staring at a fresh app window with none of your familiar context. Before adopting a profile manager, decide whether you want a shared workspace or separate workspaces.</p><p>VeyDock targets a shared-workspace handoff for Codex Desktop, while managed authentication homes keep configured logins available for connecting and usage queries. That is a more specific claim than running several fully independent desktop instances.</p>",
      ),
      section(
        "organise",
        "Give each account an explicit purpose",
        "<p>Use labels such as personal, work or a collaborator’s reserved profile. Check the actual signed-in identity after connecting. Browser account selectors can choose a different Google session than the one you intended.</p><p>Reservations should express a human decision. An account with more allowance is not automatically the right account for a project. VeyDock preserves Friend Priority and Reserved behaviour and does not silently prefer Pro or rotate through accounts.</p>",
      ),
      section("check", "Read before launching", usage + stale),
      section(
        "limits",
        "Know what the alpha can prove",
        verification +
          '<p>Start with an unimportant test session. Confirm the opened identity inside Codex and confirm your projects remain visible. Use the <a href="/docs/add-profile">add-profile manual</a> and <a href="/docs/switch-profiles">switching checklist</a> for the concrete steps.</p>',
      ),
    ],
  },
  "guides/switch-codex-accounts-windows": {
    title: "Switch Codex accounts on Windows",
    label: "GUIDE / DELIBERATE SWITCHING",
    guide: true,
    description:
      "A practical normal-quit workflow for changing Codex identities on Windows, with saved-login and workspace checks.",
    sections: [
      section(
        "prepare",
        "Prepare the handoff",
        "<p>A reliable switch needs more than copying a login file. A desktop app may keep an authenticated session in memory, a CLI may still be using the same state, and a closing window may be waiting for your response. Save work, choose the target profile and check its connection first.</p>",
      ),
      section(
        "quit",
        "Why normal quitting matters",
        quit +
          "<p>Keep VeyDock running while Codex exits. A delayed quit should be treated as an unfinished handoff, not an invitation to forcibly terminate processes. If you cancel, verify the current account before starting new work.</p>",
      ),
      section(
        "identity",
        "Check the result in Codex",
        "<p>When the application reopens, inspect the account identity there. Check that the existing projects and tasks remain visible. A success message from a switcher only confirms its own operation, not the complete desktop result.</p>" +
          verification,
      ),
      section(
        "reconnect",
        "When signing in again is necessary",
        '<p>Saved credentials are not permanent passwords. A sign-out, revocation or account policy can make a saved login unusable. Reconnect the specific profile through the normal authentication flow, check the selected browser identity and wait for a confirmed reading.</p><p>See the <a href="/docs/switch-profiles">switching troubleshooting manual</a> and <a href="https://developers.openai.com/codex/auth/">official Codex authentication documentation</a>. Never share authentication files to get help.</p>',
      ),
    ],
  },
  "guides/codex-usage-limits-windows": {
    title: "Codex usage limits on Windows",
    label: "GUIDE / READING THE INSTRUMENT",
    guide: true,
    description:
      "Interpret remaining allowance, reset times and cached Codex usage readings without assuming every account has identical limits.",
    sections: [
      section(
        "meaning",
        "One percentage is not the whole account",
        usage +
          "<p>An account can have allowance in one bucket and be constrained by another. Treat the dashboard as a view of the returned limits, not as permission to bypass the service’s rules. VeyDock does not increase or pool account allowances.</p>",
      ),
      section(
        "time",
        "Read the time beside the meter",
        "<p>A countdown is a convenient relative view of a reported reset timestamp. The exact date is useful when a weekly window extends over several days. Neither should be confused with the last refresh time, which tells you how old the reading is.</p>" +
          stale,
      ),
      section(
        "plans",
        "Let each plan speak for itself",
        "<p>Do not infer a five-hour and seven-day pair merely from a Plus or Pro label. Different account plans and additional model buckets can report different windows. Missing reset credits or Spark readings should remain not reported, not become invented zeros or hundreds.</p>",
      ),
      section(
        "compare",
        "Compare against the service",
        '<p>If a reading seems surprising, check the same account in Codex and compare the window and timestamp. Capture a sanitised description of any discrepancy. The <a href="/docs/usage-limits">usage manual</a> explains VeyDock states; the <a href="https://developers.openai.com/codex/pricing/">official documentation</a> describes current service availability.</p>' +
          verification,
      ),
    ],
  },
  "guides/codex-profiles-windows": {
    title: "Codex profiles and local state",
    label: "GUIDE / WORKSPACE BOUNDARIES",
    guide: true,
    description:
      "Understand configured Codex profiles, sensitive authentication homes and the difference between an account and a Windows workspace.",
    sections: [
      section(
        "profile",
        "What a profile means here",
        "<p>In VeyDock, a profile is a configured identity with a label, a managed Codex home and local metadata such as reservation state. It is not a new subscription, a cloud workspace or a guarantee that a login cannot expire. The app uses those configured homes for connecting accounts and reading their limits.</p>",
      ),
      section(
        "workspace",
        "The desktop workspace is separate",
        "<p>Your familiar project list and task history belong to desktop workspace state. Launching a completely fresh desktop data directory can make those disappear from view even though the underlying files still exist. VeyDock’s shared-workspace handoff is designed to keep that context while changing local authentication after Codex quits.</p>" +
          verification,
      ),
      section(
        "files",
        "The files deserve care",
        data +
          "<p>When you back up a profile, think of it as a credential backup. Do not attach it to an issue or put it in the public repository. A screenshot masked by Streamer mode is safer than a raw diagnostic dump, but inspect it before sharing.</p>",
      ),
      section(
        "next",
        "Build a predictable routine",
        '<p>Connect one identity at a time, check the account information, give it an unambiguous label and verify a usage refresh. Before a handoff, save work and finish shared CLI sessions. After a handoff, verify the identity inside Codex.</p><p>Continue with <a href="/docs/add-profile">adding a profile</a> or <a href="/security">the security boundaries</a>.</p>',
      ),
    ],
  },
  about: {
    title: "A small independent instrument",
    label: "ABOUT / MITHIL KATKORIA",
    description:
      "VeyDock is an independent open-source Windows Codex utility created by Mithil Katkoria and distributed under MIT.",
    sections: [
      section(
        "creator",
        "Created by Mithil Katkoria",
        '<p>VeyDock is a focused Windows utility for managing configured Codex profiles and reading their usage. It is developed in public, with source, release notes and verification records available for inspection.</p><p>Find the creator on <a href="https://github.com/mithilkatkoria">GitHub</a> or at <a href="https://draey.dev">draey.dev</a>. No large company, investor backing or enterprise customer list is claimed.</p>',
      ),
      section(
        "open",
        "Open source, with attribution",
        `<p>The <a href="${repo}/blob/main/LICENSE">MIT licence</a> permits use, copying, modification and distribution, including commercial use, provided the copyright and licence notice are retained. Copyright belongs to Mithil Katkoria, 2026.</p><p>The name and visual identity identify this project. MIT permission does not imply creator endorsement or permission to impersonate the official distribution. See <a href="${repo}/blob/main/BRANDING.md">branding guidance</a>.</p>`,
      ),
      section(
        "independent",
        "Independent of OpenAI",
        "<p>VeyDock is an independent project and is not affiliated with or endorsed by OpenAI or Anthropic. Codex and third-party services remain subject to their own terms. Public alpha status means the verification record matters more than marketing promises.</p>",
      ),
    ],
  },
  privacy: {
    title: "Privacy, in plain terms",
    label: "LEGAL / HUMAN REVIEW REQUIRED",
    description:
      "VeyDock website hosting, optional analytics consent and the separate desktop authentication-data boundary.",
    sections: [
      section(
        "review",
        "A notice that needs human review",
        '<div class="notice">Published 2 October 2026. This project-specific notice requires human legal review. It is not a claim of legal certification.</div><p>This website describes an independent project maintained by Mithil Katkoria. It does not collect account credentials or provide a sign-in form. Contact the maintainer through the <a href="https://github.com/mithilkatkoria">GitHub profile</a>.</p>',
      ),
      section(
        "hosting",
        "Hosting and navigation",
        "<p>Vercel hosts the site and can process ordinary request data, including network addresses and access logs, under its own service policies. GitHub processes requests when you visit the repository or download a release. OpenAI processes authentication and usage requests from Codex, outside this website.</p><p>No production Backplane redirect is configured. Downloads currently link directly to GitHub release assets.</p>",
      ),
      section(
        "analytics",
        "Optional analytics",
        "<p>Analytics code only initializes when a real provider ID or endpoint is configured and you allow optional analytics. The integration supports Google Analytics 4, optional Microsoft Clarity and a configured Backplane event endpoint. Without configuration, those integrations do not run and no consent banner is shown.</p><p>When configured, a local storage preference records your choice. Download-click events can include platform, architecture, source page and UTM campaign. Downloads never wait for analytics. You can clear the site’s local storage to reset consent. No optional analytics provider is configured for the initial launch.</p>",
      ),
      section(
        "desktop",
        "The desktop app has a different boundary",
        data +
          '<p>Read <a href="/security">security and local-data guidance</a> before connecting profiles. Streamer mode masks the Hub interface; it does not erase or encrypt credentials and does not protect other apps.</p>',
      ),
    ],
  },
  terms: {
    title: "Terms and open-source use",
    label: "LEGAL / HUMAN REVIEW REQUIRED",
    description:
      "MIT licensing, alpha software limitations, third-party services, updates and VeyDock independence from OpenAI.",
    sections: [
      section(
        "review",
        "Review before relying on these terms",
        '<div class="notice">Published 2 October 2026. Human legal review is required. This is an independent project, not an invented registered company.</div>',
      ),
      section(
        "licence",
        "The MIT licence governs the source",
        `<p>VeyDock is provided under the <a href="${repo}/blob/main/LICENSE">MIT licence</a>. Retain the copyright and licence notice when copying or distributing substantial portions. The licence provides the software as is, without warranty, and contains its own liability terms. This website does not replace that licence.</p>`,
      ),
      section(
        "use",
        "Alpha software and your responsibility",
        "<p>Save work before switching profiles. Verify account identity in Codex after a handoff. Do not use the app to evade service rules, share credentials without permission or misrepresent an account. Keep sensitive profile files private.</p>" +
          verification,
      ),
      section(
        "third-parties",
        "Independent and dependent on third parties",
        "<p>VeyDock is not affiliated with or endorsed by OpenAI or Anthropic. Codex, OpenAI authentication, Windows, Vercel and GitHub have their own terms and availability. Changes to those services can affect functionality.</p>",
      ),
      section(
        "updates",
        "Updates and distribution",
        "<p>Use the linked official GitHub releases. The current Windows package is unsigned, so a publisher warning can appear. A signed updater package does not verify a Windows publisher. Updates can change behaviour; review the release notes and back up local state privately.</p><p>Nothing here excludes rights or liabilities that applicable law does not allow to be excluded. The maintainer should obtain legal review before adopting this notice as final terms.</p>",
      ),
    ],
  },
};

const claudeBoundary = section(
  "beta",
  "Claude Code beta boundary",
  `<p>Claude support is implemented in the v0.2.0-beta.1 source and matching releases when published. Check the release notes before expecting it in a downloaded installer. Real A → B → A authentication acceptance is pending. Use only accounts you are authorised to access.</p><p>The adapter supports normal <code>claude.ai</code> CLI sign-in. Keyless Console sign-ins are stored outside the chosen configuration directory and are unsupported. API keys, setup tokens and cloud-provider authentication are not handled by this beta. No Claude Desktop switching is claimed.</p>`,
);
const claudeQuota = section(
  "quota",
  "Last confirmed, not arbitrary live refresh",
  `<p>Anthropic documents <code>rate_limits.five_hour</code> and <code>rate_limits.seven_day</code> in status-line input for supported subscription sessions after an API response. A window may be absent. VeyDock's optional local helper records only validated percentages, reset times and a timestamp. It never saves the original status-line payload, conversation text or transcript paths.</p><p>The Hub reads that small cache and labels it Last confirmed. Refreshing the Hub does not generate a Claude request. Context-window percentage is not subscription quota. Use Claude's <code>/usage</code> to confirm provider readings. Model-specific windows not present in the supported payload are not invented.</p>`,
);
const claudeSetup = section(
  "setup",
  "Connect through the official CLI",
  `<ol><li>Install native Claude Code from <a href="https://code.claude.com/docs/en/setup">Anthropic's Windows setup documentation</a>. Use version 2.1.268 or later so authentication status reports its configuration directory.</li><li>In VeyDock, choose Add account, then Claude Code (beta). Name the profile.</li><li>Save and connect. VeyDock opens a Windows terminal with that profile's <code>CLAUDE_CONFIG_DIR</code>. Complete the normal Claude sign-in there.</li><li>Open profile settings in the Hub and choose Check connection. The adapter checks official <code>claude auth status</code>, the account identity and the configuration directory.</li><li>Optionally choose Enable quota helper. Existing custom status lines are preserved and require manual composition.</li><li>Choose Open Claude Code, or a saved project using that profile. Verify the identity with <code>/status</code>.</li></ol>`,
);
const claudeIsolation = section(
  "isolation",
  "Configuration isolation, with an explicit boundary",
  `<p>Each managed Claude profile has a separate directory under the Hub's profile storage. Only the launched process receives <code>CLAUDE_CONFIG_DIR</code>. VeyDock clears inherited Claude, Anthropic and Codex authentication variables before launch. Your default Claude configuration is not overwritten.</p><p>This differs from the Codex shared-Desktop handoff. VeyDock does not copy Claude credential files, reuse Codex homes or ask for passwords. Isolation of real accounts and concurrent sessions still needs acceptance testing on Windows; it is not a security-audit claim.</p>`,
);
const sources = section(
  "sources",
  "Provider documentation",
  `<ul><li><a href="https://code.claude.com/docs/en/authentication">Claude Code authentication and multiple accounts</a></li><li><a href="https://code.claude.com/docs/en/statusline">Supported Claude status-line quota fields</a></li><li><a href="https://code.claude.com/docs/en/cli-reference">Claude CLI authentication commands</a></li><li><a href="https://code.claude.com/docs/en/env-vars">Claude configuration environment variables</a></li></ul><p>Checked 5 October 2026. Provider behaviour can change. VeyDock is independent of OpenAI and Anthropic.</p>`,
);
pages["providers"] = {
  title: "AI coding providers in VeyDock",
  description:
    "Compare Codex Desktop support and Claude Code beta: authentication, isolation, launch surfaces and honest usage freshness.",
  label: "PRODUCT / PROVIDERS",
  sections: [
    section(
      "compare",
      "One dock, provider-specific capabilities",
      `<p>VeyDock is a Windows profile dock for AI coding tools. Codex and Claude Code have different authentication and launch contracts. They share profile names, reservations, projects and quick launch, not an invented common quota model.</p><table><thead><tr><th>Provider</th><th>Launch</th><th>Usage</th><th>Status</th></tr></thead><tbody><tr><td><a href="/providers/codex">Codex</a></td><td>Existing Desktop workspace</td><td>Independent app-server reads</td><td>Public alpha; full switching acceptance pending</td></tr><tr><td><a href="/providers/claude-code">Claude Code</a></td><td>Isolated Windows terminal</td><td>Last confirmed status-line cache</td><td>Development beta; real A/B/A pending</td></tr></tbody></table>`,
    ),
    section(
      "facts",
      "Product facts",
      `<p>Formal name: VeyDock. Short name: VDock. Platform: Windows. Source: MIT licensed. Creator: Mithil Katkoria. No fixed profile cap. No silent account rotation or subscription preference. Each provider's service terms and quotas continue to apply.</p><p>VeyDock is not an OpenAI or Anthropic product. See <a href="/download">current downloads</a>, <a href="/security">security boundaries</a> and <a href="/docs/providers">provider documentation</a>.</p>`,
    ),
  ],
};
pages["providers/codex"] = {
  title: "Codex profiles in VeyDock",
  description:
    "Keep Codex profiles, provider-reported rate limits and project shortcuts together in an independent Windows dock.",
  label: "PROVIDER / CODEX",
  sections: [
    section(
      "workflow",
      "Codex Desktop and its existing workspace",
      `<p>The Codex adapter preserves managed profile homes and opens the established shared Codex Desktop workspace through a normal-quit handoff. Projects, task history and sidebar context are not copied into a blank Desktop profile.</p>${quit}`,
    ),
    section("usage", "Real rate-limit windows", usage + stale),
    section(
      "reservation",
      "Explicit account choice",
      `<p>Reservations and Friend Priority remain manual. Pro is not automatically preferred. Its returned weekly, Spark and reset-credit data may differ from Plus, so only actual provider windows are displayed.</p>`,
    ),
    section("acceptance", "Acceptance status", verification),
    section(
      "docs",
      "Continue with Codex",
      `<p><a href="/docs/providers/codex">Codex setup</a> · <a href="/guides/switch-codex-accounts-windows">Windows account switching guide</a></p>`,
    ),
  ],
};
pages["providers/claude-code"] = {
  title: "Claude Code profiles in VeyDock (beta)",
  description:
    "Explore isolated Claude Code terminal profiles, normal claude.ai sign-in and supported last-confirmed quota readings on Windows.",
  label: "PROVIDER / CLAUDE CODE BETA",
  sections: [
    claudeBoundary,
    claudeSetup,
    claudeIsolation,
    claudeQuota,
    sources,
  ],
};
pages["docs/providers"] = {
  title: "Choose and configure a provider",
  description:
    "Set up Codex or Claude Code beta in VeyDock, with provider-specific authentication, launch and usage contracts.",
  label: "DOCS / PROVIDERS",
  sections: [
    section(
      "choose",
      "Choose the tool before the account",
      `<p>Add account offers Codex and Claude Code (beta). Existing version-1 profiles migrate as Codex without changing IDs, home paths, project mappings, reservations or saved identities. A saved profile cannot change provider; create another profile instead.</p><p><a href="/docs/providers/codex">Configure Codex</a> or <a href="/docs/providers/claude-code">configure Claude Code beta</a>.</p>`,
    ),
    section(
      "shared",
      "Shared controls",
      `<p>Use the All providers, Codex and Claude filters to organise the dock. Projects can prefer a profile from either provider. Ctrl + K searches provider, profile and project. Tray labels include the provider and respect streamer-mode aliases.</p><p>Streamer mode protects only Hub text. Claude terminals, Codex windows, browsers and file dialogs are outside that boundary.</p>`,
    ),
  ],
};
pages["docs/providers/codex"] = {
  ...pages["providers/codex"],
  title: "Configure Codex in VeyDock",
  label: "DOCS / CODEX",
  sections: [
    section(
      "installation",
      "Detect Codex",
      `<p>Install Codex Desktop and its CLI. VeyDock detects them or accepts executable overrides in Settings. Use a new managed profile or explicitly import your existing Codex login. Existing profiles remain intact when you add Claude.</p>`,
    ),
    ...pages["providers/codex"].sections,
  ],
};
pages["docs/providers/claude-code"] = {
  ...pages["providers/claude-code"],
  title: "Configure Claude Code beta in VeyDock",
  label: "DOCS / CLAUDE CODE BETA",
};
pages["guides/claude-code-account-switcher-windows"] = {
  title: "Claude Code Account Switcher for Windows: Beta Workflow",
  description:
    "Use separate Claude Code configuration directories on Windows, with official sign-in and explicit VeyDock beta acceptance limits.",
  label: "GUIDE / CLAUDE CODE WINDOWS",
  guide: true,
  sections: [
    section(
      "answer",
      "Can VeyDock switch Claude Code accounts?",
      `<p>The development beta creates separately configured Claude Code terminal profiles and validates normal claude.ai sign-in before launch. It does not switch Claude Desktop. Real A → B → A acceptance has not been completed, so this remains a beta workflow rather than a proven account-switching promise.</p>`,
    ),
    claudeSetup,
    claudeIsolation,
    claudeBoundary,
    sources,
  ],
};
pages["guides/manage-multiple-claude-code-accounts"] = {
  title: "Manage Multiple Claude Code Accounts with Separate Profiles",
  description:
    "Organise authorised Claude Code accounts without copying credentials, and understand which sign-in methods the VeyDock beta supports.",
  label: "GUIDE / MULTIPLE CLAUDE ACCOUNTS",
  guide: true,
  sections: [
    section(
      "answer",
      "How should multiple Claude accounts be organised?",
      `<p>Use a separate CLAUDE_CONFIG_DIR for each authorised claude.ai account and complete the provider's own sign-in in each directory. VeyDock beta stores labels, preferences and directory paths. It does not export Claude credentials or merge account histories.</p><p>This is a subscription-account workflow. Keyless Console authentication lives outside this directory and is excluded. Multiple accounts do not grant extra rights or remove provider limits.</p>`,
    ),
    claudeIsolation,
    section(
      "priority",
      "Personal, work and reserved profiles",
      `<p>Give accounts recognisable names and choose availability deliberately. A project can prefer your work profile, while another stays reserved. No account is automatically selected because of its plan. Use the provider filter or quick launcher to make the next choice.</p>`,
    ),
    claudeBoundary,
    sources,
  ],
};
pages["guides/claude-code-usage-limits"] = {
  title: "Claude Code Usage Limits: Last Confirmed Quota in VeyDock",
  description:
    "Understand five-hour and seven-day Claude quota fields, missing readings, reset times and how VeyDock distinguishes cache from live usage.",
  label: "GUIDE / CLAUDE CODE USAGE",
  guide: true,
  sections: [
    section(
      "answer",
      "Can VeyDock refresh Claude limits live?",
      `<p>No arbitrary live Claude quota refresh is claimed. The beta's opt-in helper receives supported status-line fields after a Claude response, whitelists quota data and stores a timestamped local cache. The Hub shows Last confirmed. Opening or refreshing the Hub does not consume a Claude turn to manufacture a reading.</p>`,
    ),
    claudeQuota,
    section(
      "reading",
      "Read percentages and reset dates correctly",
      `<p>Used and remaining are complements within a reported window. A 64% used field produces 36% remaining. A missing weekly window stays absent, not 0% or 100%. An elapsed reset countdown means a new reading is needed; it does not prove a reset or successful reauthentication.</p><p>Extra-usage spending and context capacity are different concepts from subscription rate limits. Only fields documented and present in the provider payload are shown.</p>`,
    ),
    sources,
  ],
};
pages["guides/switch-claude-code-profiles-without-losing-context"] = {
  title: "Switch Claude Code Profiles Without Moving Your Project",
  description:
    "Launch the same Windows project folder with a different Claude Code beta profile while keeping session history and authentication boundaries explicit.",
  label: "GUIDE / CLAUDE CODE PROJECTS",
  guide: true,
  sections: [
    section(
      "answer",
      "Does changing Claude profiles preserve the project?",
      `<p>The project folder stays in place. VeyDock launches the chosen Claude profile with that folder as the working directory. Separate profile directories have separate configuration and session history. This is not a promise that conversations or provider memory transfer between accounts.</p>`,
    ),
    section(
      "workflow",
      "Use an explicit project preference",
      `<ol><li>Save your work in the existing Claude terminal.</li><li>Add the project folder to VeyDock.</li><li>Choose an authenticated Claude profile from the project selector.</li><li>Open the project and verify the account using /status.</li><li>For the beta acceptance test, close that session before choosing the second account, then return to the first.</li></ol><p>VeyDock does not force-close terminals, overwrite your default Claude configuration or import Claude conversation history into another identity.</p>`,
    ),
    claudeBoundary,
    sources,
  ],
};
// Existing Codex routes remain stable. Add provider discovery without rewriting their content.
pages.docs.sections.unshift(
  section(
    "providers",
    "Provider-specific setup",
    `<p><a href="/docs/providers/codex">Codex Desktop</a> and <a href="/docs/providers/claude-code">Claude Code beta</a> use different sign-in and usage sources. Start with the documentation for your tool.</p>`,
  ),
);
pages.features.sections.unshift(
  section(
    "provider-dock",
    "A Windows dock for AI coding profiles",
    `<p>Keep Codex and Claude Code beta profiles in one dock. Filter by provider, keep manual reservations and launch project folders with the profile you choose. See <a href="/providers">the capability comparison</a> and the current <a href="/download">release notes</a> before relying on beta support.</p>`,
  ),
);

pages.security.sections.push(
  section(
    "claude-security",
    "Claude Code beta privacy boundary",
    `<p>Claude signs in through its normal CLI. VeyDock sets a process-specific configuration directory and never copies Claude credential files. Its optional status-line helper writes a whitelist of quota percentage, reset time and timestamp. The original payload, transcript and prompt are discarded. Terminal and browser content are outside streamer-mode protection.</p>`,
  ),
);
pages.privacy.sections.push(
  section(
    "claude-data",
    "Claude provider data",
    `<p>Claude Code beta authentication requests go to Anthropic through the official CLI. Profile metadata and the optional quota cache stay locally in the profile directory. This website does not receive account identities or quota readings. No analytics event may contain profile names, email addresses, paths, credentials or transcripts.</p>`,
  ),
);
pages.about.sections.unshift(
  section(
    "positioning",
    "VeyDock, also called VDock",
    `<p>An independent Windows profile dock for AI coding tools, created by Mithil Katkoria. Codex is the established provider integration. Claude Code is a development beta with distinct authentication, isolation and quota boundaries. <a href="/providers">Compare provider capabilities</a>.</p>`,
  ),
);

pages["docs/quick-launch"] = {
  title: "Quick launch by provider, profile and project",
  description:
    "Find a VeyDock profile or saved project with Ctrl + K and launch deliberately using the chosen provider.",
  label: "DOCS / QUICK LAUNCH",
  sections: [
    section(
      "keyboard",
      "Choose with the keyboard",
      `<p>In the Windows app, press Ctrl + K outside a text field. Search for a provider, profile or saved project. Move through the results with the arrow keys, press Enter to select and Escape to dismiss. Reservations remain visible and require deliberate selection.</p><p>The website's Ctrl + K interaction is a demonstration. It does not open installed providers or access your local profile state.</p>`,
    ),
  ],
};
pages.guides.sections.push(
  section(
    "claude-guides",
    "Claude Code beta guides",
    `<ul class="index-list"><li><a href="/guides/claude-code-account-switcher-windows">Claude Code account switching on Windows</a></li><li><a href="/guides/manage-multiple-claude-code-accounts">Manage multiple Claude accounts</a></li><li><a href="/guides/claude-code-usage-limits">Read last-confirmed Claude quota</a></li><li><a href="/guides/switch-claude-code-profiles-without-losing-context">Launch the same project with another Claude profile</a></li></ul>`,
  ),
);

// Provider overview is distinct from the procedural setup manual.
pages['providers/claude-code'].sections=[section('overview','Claude Code, with a place in the dock',`<p>The beta adapter adds labelled Claude terminal profiles alongside Codex. You can reserve an account, attach a project preference and find it by provider in quick launch. Claude owns authentication and session execution.</p><p>This is a native Windows terminal integration, not Claude Desktop switching. Each profile uses its own configuration directory. Quota is last confirmed from supported status-line data, not an arbitrary live endpoint.</p>`),claudeBoundary,section('start','Read the setup contract',`<p><a href="/docs/providers/claude-code">Configure the official CLI, complete sign-in and enable the optional quota helper</a>. The manual explains minimum versions, custom status-line preservation and privacy boundaries.</p>`),sources];
