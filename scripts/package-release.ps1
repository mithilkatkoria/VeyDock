param([string]$BuildDirectory = 'src-tauri/target/x86_64-pc-windows-msvc/release')
$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Push-Location $repo
try {
    $version = (Get-Content package.json -Raw | ConvertFrom-Json).version
    $source = Join-Path $BuildDirectory 'veydock.exe'
    if (!(Test-Path -LiteralPath $source -PathType Leaf)) { throw 'Build the release executable first with pnpm package.' }
    $installer = Join-Path $BuildDirectory "bundle/nsis/VeyDock_${version}_x64-setup.exe"
    if (!(Test-Path -LiteralPath $installer -PathType Leaf)) { throw "Build the matching $version installer before packaging." }
    $signatureFile = $installer + '.sig'
    if (!(Test-Path -LiteralPath $signatureFile -PathType Leaf)) { throw 'Build with TAURI_SIGNING_PRIVATE_KEY to generate the required updater signature.' }
    $output = Join-Path $repo "artifacts/releases/$version"
    if (Test-Path -LiteralPath $output) { throw "Output already exists: $output. Published versions must never be overwritten." }
    $portable = Join-Path $output 'portable'
    New-Item -ItemType Directory -Path $portable | Out-Null
    Copy-Item -LiteralPath $source -Destination (Join-Path $output 'VeyDock.exe')
    Copy-Item -LiteralPath $source -Destination (Join-Path $portable 'VeyDock.exe')
    foreach ($file in @('LICENSE', 'BRANDING.md')) { Copy-Item -LiteralPath $file -Destination $portable }
    @"
VeyDock $version - Windows x64 (also runs on ARM Windows through emulation)

Extract this folder, then open VeyDock.exe.
For Windows Search and a Start menu shortcut, use the setup.exe installer.
Install your chosen provider separately. Codex uses Desktop and CLI.
Claude Code beta uses the official native Windows CLI (v2.1.268 or later).
Add account, choose the provider, and complete its normal sign-in.
No personal data, accounts or provider binaries are bundled.

Switching: choose a saved account in the Hub, then let Codex quit normally.
Use Quit instead of Sign out. Signing out can revoke a saved login.
The Hub requests a normal restart and retains your existing Codex workspace.
If Codex remains in the background, use File > Quit (Ctrl+Q). The selected
account stays queued for up to ten minutes and continues after Codex exits.
Real A/B/A Desktop acceptance is still pending; this is an unsigned prerelease.

Claude Code beta: each profile uses its own CLAUDE_CONFIG_DIR terminal.
Finish normal claude.ai sign-in, then choose Check connection in the Hub.
Optionally enable the quota helper in profile settings. The Hub labels its
readings Last confirmed, not live. Keyless Console sign-ins, API keys, setup
tokens, cloud providers and Claude Desktop are unsupported. Claude real A/B/A
and concurrent-account reliability remain pending. See docs/CLAUDE_CODE.md.

Streamer mode: use the bottom-left Auto / On / Off control to mask private
details in the Hub. Auto detects supported apps running, not actual recording.
Choose On before sharing. Codex, Claude terminals and browser login windows are not masked.

Updates: the Hub checks after startup. Use Settings > App updates to download
and install a verified newer release. Your saved account store is preserved. Installer-update acceptance on a
clean friend computer is still pending.
The portable app becomes an installed app when using this update path.
Update signing does not remove Windows Unknown publisher warnings.

Microsoft Edge WebView2 is required. See setup and verification details:
https://github.com/mithilkatkoria/VeyDock

Copyright 2026 Mithil Katkoria. MIT licensed. Independent community project.
"@ | Set-Content -LiteralPath (Join-Path $portable 'START-HERE.txt') -Encoding utf8
    Compress-Archive -Path (Join-Path $portable '*') -DestinationPath (Join-Path $output 'VeyDock-Windows.zip')
    Copy-Item -LiteralPath $installer -Destination (Join-Path $output 'VeyDock-setup.exe')
    Copy-Item -LiteralPath $signatureFile -Destination (Join-Path $output 'VeyDock-setup.exe.sig')
    $feed = @{ version=$version; notes="VeyDock $version. See the release notes on GitHub for changes and verification details."; pub_date=(Get-Date).ToUniversalTime().ToString('o'); platforms=@{ 'windows-x86_64'=@{ signature=(Get-Content -LiteralPath $signatureFile -Raw).Trim(); url="https://github.com/mithilkatkoria/VeyDock/releases/download/v$version/VeyDock-setup.exe" } } }
    [IO.File]::WriteAllText((Join-Path $output 'latest.json'), ($feed | ConvertTo-Json -Depth 5), (New-Object Text.UTF8Encoding($false)))
    $files = Get-ChildItem -LiteralPath $output -File | Sort-Object Name
    $files | ForEach-Object { '{0}  {1}' -f (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant(), $_.Name } | Set-Content -LiteralPath (Join-Path $output 'SHA256SUMS.txt') -Encoding ascii
    Write-Output "Prepared $output"
} finally { Pop-Location }
