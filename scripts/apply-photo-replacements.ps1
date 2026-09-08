$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$staging = Join-Path $repoRoot 'manual-photo-replacements'
$canonical = Join-Path $repoRoot 'public/assets/original/2025/03'

$files = Get-ChildItem -Path $staging -Recurse -File | Where-Object {
  $_.Extension -in @('.jpg','.jpeg','.png','.webp','.avif')
}

if ($files.Count -eq 0) {
  throw 'No staged image files were found. Run scripts/stage-current-photos.ps1 first.'
}

foreach ($file in $files) {
  $destination = Join-Path $canonical $file.Name
  Copy-Item -LiteralPath $file.FullName -Destination $destination -Force
}

Write-Host "Applied $($files.Count) staged image files to public/assets/original/2025/03/."
Write-Host 'Now run npm run lint, npm run typecheck, npm run build, inspect locally, then commit/push the verified replacements.'
