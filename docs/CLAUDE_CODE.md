# Claude Code beta

VeyDock v0.2.0-beta.1 adds isolated native Windows Claude Code terminals. This is a beta integration. It is not Claude Desktop support.

## Setup

1. Install Claude Code from [Anthropic's official setup guide](https://code.claude.com/docs/en/setup). Version 2.1.268 or later is required for directory verification.
2. Add account in VeyDock and choose Claude Code (beta).
3. Complete normal claude.ai authentication in the opened terminal.
4. Open that profile's settings and choose Check connection.
5. Choose Open Claude Code or a saved project with that profile.
6. Verify the account with `/status`.

Each profile has a separate `CLAUDE_CONFIG_DIR`. Inherited Claude, Anthropic and Codex authentication variables are cleared for launch. The default Claude configuration stays untouched. Executable discovery checks the normal native install and PATH; Settings offers an explicit Claude executable override.

Keyless Console sign-ins are stored outside this directory, so this beta rejects them. API keys, setup tokens and third-party cloud authentication are unsupported. VeyDock never copies Claude credentials or asks for passwords.

## Optional quota helper

Choose Enable quota helper in profile settings, then start a new session and make a normal request. The helper records only supported quota percentages, reset timestamps and a confirmation timestamp. The original status-line payload, prompts, transcript paths, source and credentials are discarded. Context-window usage is not quota.

Existing custom status lines are never replaced. To compose one manually, invoke the generated `.veydock-statusline.ps1` alongside your own command using a wrapper that sends the same stdin to both. Review your wrapper: do not log the original payload or overwrite provider configuration blindly.

The Hub says Last confirmed. Refreshing it reads the cache and does not generate a Claude turn. Missing fields remain unavailable. Confirm in Claude with `/usage`.

## Real A → B → A acceptance checklist

This has not been completed. Two authorised accounts and their interactive sign-ins are required.

- Create A and B with distinct directories. Authenticate each normally.
- Check both connections and confirm each account using `/status`.
- Open A in a harmless test project. Make a normal request and compare its helper quota with `/usage`. Record the timestamp without saving a transcript.
- Quit A normally. Open B in the same project, confirm B, make a normal request and compare B's quota.
- Quit B normally. Return to A. Confirm A opens without another browser login and its own settings/history remain separate.
- Restart VeyDock and repeat. Check profile IDs, reservations and project preferences persist.
- Separately test simultaneous terminals and quota attribution before claiming concurrent-account reliability.
- Confirm the default Claude directory and all Codex profiles are unchanged.

Record CLI version, Windows architecture and pass/fail results without credentials, emails, private paths or conversation content. Keep beta until acceptance passes.

## Sources

- [Authentication and multiple accounts](https://code.claude.com/docs/en/authentication)
- [CLI auth status](https://code.claude.com/docs/en/cli-reference)
- [Status-line data](https://code.claude.com/docs/en/statusline)
- [Environment variables](https://code.claude.com/docs/en/env-vars)

Checked 5 October 2026. Independent of OpenAI and Anthropic. Streamer mode protects Hub text only, not terminals or browser sign-in.
