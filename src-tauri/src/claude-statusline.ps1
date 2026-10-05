param([Parameter(Mandatory=$true)][string]$ProfileId)
$ErrorActionPreference = 'Stop'
try {
    $inputText = [Console]::In.ReadToEnd()
    if ($inputText.Length -gt 262144) { exit 0 }
    $payload = $inputText | ConvertFrom-Json
    $windows = @{}
    foreach ($key in @('five_hour', 'seven_day', 'spend_limit')) {
        $value = $payload.rate_limits.$key
        if ($null -ne $value.used_percentage -and ($value.used_percentage -is [int] -or $value.used_percentage -is [long] -or $value.used_percentage -is [double] -or $value.used_percentage -is [decimal])) {
            $percent = [double]$value.used_percentage
            if ($percent -ge 0 -and $percent -le 100) {
                $reset = if ($null -ne $value.resets_at -and ($value.resets_at -is [int] -or $value.resets_at -is [long])) { [long]$value.resets_at } else { $null }
                $windows[$key] = @{ used_percentage = $percent; resets_at = $reset }
            }
        }
    }
    # No prompt, source, transcript, account identity or original payload is saved.
    $record = @{ profile_id = $ProfileId; timestamp = [DateTime]::UtcNow.ToString('o'); windows = $windows }
    $destination = Join-Path $PSScriptRoot '.veydock-usage.json'
    $temporary = Join-Path $PSScriptRoot ('.veydock-quota-' + [guid]::NewGuid().ToString('N') + '.tmp')
    [IO.File]::WriteAllText($temporary, ($record | ConvertTo-Json -Depth 4), (New-Object Text.UTF8Encoding($false)))
    Move-Item -LiteralPath $temporary -Destination $destination -Force
    [Console]::Out.Write('VeyDock: quota recorded')
} catch {
    # Never print error details: input can contain private conversation context.
    [Console]::Out.Write('VeyDock: quota unavailable')
}
