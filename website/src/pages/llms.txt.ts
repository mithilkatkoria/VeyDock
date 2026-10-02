import { site, repository } from "../lib/release";
export function GET() {
  return new Response(
    `# VeyDock\n\n> Independent, MIT-licensed Windows Codex profile switcher and usage manager by Mithil Katkoria.\n\nVeyDock manages configured profiles and reads real Codex rate-limit windows. It preserves explicit account choice and reservation behaviour. The public release is an unsigned x64 alpha; ARM Windows uses x64 emulation. Complete real-desktop switching and installer-driven updating acceptance remain pending. Development screenshots use simulated data. It is not affiliated with or endorsed by OpenAI.\n\n- [Download](${site}/download): Real GitHub release asset and current release metadata.\n- [Documentation](${site}/docs): Installation, profiles, switching and usage.\n- [Security](${site}/security): Sensitive local authentication state and streamer-mode boundaries.\n- [Source](${repository}): MIT licence, releases and verification.\n- [Verification](${repository}/blob/main/VERIFICATION.md): Evidence and remaining acceptance work.\n\nOAI-SearchBot is allowed. GPTBot is separately disallowed. This file provides plain product facts, not an indexing or ranking guarantee.\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
