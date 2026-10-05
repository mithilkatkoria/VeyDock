# VeyDock

**[Official website](https://veydock.vercel.app)** · **[Download for Windows](https://veydock.vercel.app/download)** · [Website launch checks](website/LAUNCH.md)

<img src="src-tauri/icons/128x128.png" alt="VeyDock icon" width="72" height="72">

**Free, open-source account management for Codex on Windows, with Claude Code profiles in beta.**

VeyDock, or **VDock** for short, brings named profiles, provider-reported usage windows, reset times and project shortcuts into one Windows dashboard. Choose your next account deliberately, keep reservations visible and inspect or adapt the MIT-licensed source. There is no VeyDock subscription or fixed account cap. Provider accounts and fees are separate.

[Download for Windows](https://github.com/mithilkatkoria/VeyDock/releases) · [Changelog](CHANGELOG.md) · [Verification](VERIFICATION.md) · [Contributing](CONTRIBUTING.md)

> VeyDock is an independent community project. It is not affiliated with or endorsed by OpenAI or Anthropic.

## Providers

| Provider | Launch | Usage | Acceptance |
| --- | --- | --- | --- |
| Codex | Existing Desktop workspace with normal-quit handoff | Independent app-server rate limits | Real Desktop A/B/A remains pending |
| Claude Code beta | Separate `CLAUDE_CONFIG_DIR` terminal | Last-confirmed supported status-line cache | Real Claude A/B/A remains pending |

Claude beta supports normal claude.ai sign-ins only. Keyless Console authentication is not isolated by the configuration directory and is unsupported. API keys, setup tokens and cloud-provider logins are excluded. There is no Claude Desktop integration or promise of concurrent-account reliability. See [Claude setup](docs/CLAUDE_CODE.md).

## Why VeyDock

- **Live Codex usage** - request the real rate-limit windows reported for each saved profile.
- **Multiple profiles** - keep Plus, Pro, work, personal, or other authorized profiles organised in one dashboard.
- **Deliberate switching** - choose the profile yourself. VeyDock does not automatically rotate accounts.
- **Reset visibility** - see remaining usage and reset times together.
- **Reserved profiles** - mark an account as Reserved or Friend Priority without making it the automatic default.
- **Quick launch** - use Ctrl+K and the Windows tray.
- **Projects** - keep useful project launch targets beside your account controls.
- **Streamer mode** - hide identities, paths, project names, and diagnostic details while sharing your screen.
- **Local-first** - account metadata and saved authentication state stay on your Windows machine.

## Status

VeyDock is currently an early prerelease.

Real multi-profile usage refresh has been tested. Full real A/B/A Codex Desktop switching acceptance is still being verified, so the current release remains a prerelease.

Production builds do not invent usage percentages. If Codex does not return a value, VeyDock shows it as unavailable or uses a clearly timestamped cached value.

## Download

Get the latest Windows build from the [Releases page](https://github.com/mithilkatkoria/VeyDock/releases).

The current prerelease targets Windows x64 and also runs on Windows ARM through x64 emulation.

You need Microsoft Edge WebView2 and the provider you choose. Codex uses Desktop and CLI. Claude Code beta uses the official native Windows CLI (v2.1.268 or later).

## How it works

```text
Open VeyDock
      ↓
See every saved profile and its current usage
      ↓
Choose a profile
      ↓
Open Codex
      ↓
Continue in that profile
```

VeyDock never automatically jumps to another account when a limit is reached.

## Privacy and local data

VeyDock never asks for your ChatGPT password.

Sensitive authentication data must never be committed to GitHub. Existing installs currently keep account state under the legacy path:

`%USERPROFILE%\.draey-codex-hub`

That legacy path is intentionally preserved during the rebrand so existing users do not lose saved profiles. A future migration can move it safely to a VeyDock-named directory without breaking existing installations.

The shared Codex workspace remains under:

`%USERPROFILE%\.codex`

See [Streamer Mode](docs/streamer-mode.md) for screen-sharing privacy controls.

## Build from source

Requirements: Windows, Git, Node.js 22+, pnpm 10, Rust via rustup, Tauri Windows prerequisites, Visual Studio C++ Build Tools, Windows SDK, and WebView2.

```powershell
git clone https://github.com/mithilkatkoria/VeyDock.git veydock
cd veydock
npm install --global pnpm@10
pnpm install --frozen-lockfile
pnpm desktop
```

Run tests:

```powershell
pnpm test
pnpm build
cargo test --manifest-path src-tauri/Cargo.toml --lib
```

Build the Windows package:

```powershell
pnpm package
```

## Project structure

```text
src/                 React interface
src/components/      VeyDock UI
src/services/        refresh, updates, privacy, and native bridge logic
src-tauri/src/       Rust persistence, Codex RPC, usage, and switching
scripts/             release and verification tooling
updates/             signed updater feed
```

## Verification and releases

- [Release process](RELEASING.md)
- [Verification status](VERIFICATION.md)
- [Security](SECURITY.md)
- [Branding](BRANDING.md)

## License

MIT © 2026 Mithil Katkoria.

**VeyDock** is the formal product name. **VDock** is the short form.
