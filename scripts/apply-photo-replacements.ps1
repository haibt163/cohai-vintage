$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$staging = Join-Path $repoRoot 'manual-photo-replacements'
$canonical = Join-Path $repoRoot 'public/assets/original/2025/03'

$expected = @(
  'STREET-STYLE-3.jpg','STREET-STYLE-1.jpg','CO-HAI-VINTAGE.jpg','CO-HAI-VINTAGE-1.jpg',
  'CO-HAI-VINTAGE-2.jpg','CO-HAI-VINTAGE-3.jpg','FLEA-MARKET.jpg','MIKIMOTO-1.jpg',
  'COCO-CHANEL.jpg','221215140542-bernard-arnault.jpg','LV-vintage-Concorde.webp',
  'lv-concorde-1.jpg','LV-CONCORDE-2.webp','LV-NEVERFUL-MONO-MM.jpg','LV-neverfull-MM.jpg',
  'lv-mono-neverfull-MM-3.jpg','LV-KELLY-MONO.jpg','LV-KELLY-LOCK.jpg'
)

$files = Get-ChildItem -Path $staging -Recurse -File | Where-Object {
  $_.Extension -in @('.jpg','.jpeg','.png','.webp','.avif')
}

if ($files.Count -eq 0) {
  throw 'No staged image files were found. Run scripts/stage-current-photos.ps1 first.'
}

# Every staged image must use one of the approved canonical filenames.
$unexpected = @($files | Where-Object { $_.Name -notin $expected })
if ($unexpected.Count -gt 0) {
  $names = ($unexpected.Name | Sort-Object -Unique) -join ', '
  throw "Unexpected staged image filename(s): $names. Keep the exact approved filenames; do not rename the replacement files."
}

# Every approved filename must be represented in staging.
$stagedNames = @($files.Name | Sort-Object -Unique)
$missing = @($expected | Where-Object { $_ -notin $stagedNames })
if ($missing.Count -gt 0) {
  throw "Missing staged replacement file(s): $($missing -join ', '). Do not apply until every expected filename is present."
}

# Some photos appear in more than one page group. Their staged copies must be identical,
# otherwise one group could silently overwrite the replacement from another group.
foreach ($name in $expected) {
  $matches = @($files | Where-Object { $_.Name -eq $name })
  if ($matches.Count -gt 1) {
    $hashes = @($matches | ForEach-Object { (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash } | Sort-Object -Unique)
    if ($hashes.Count -ne 1) {
      $paths = ($matches.FullName) -join "`n"
      throw "Duplicate staged filename '$name' has different file contents across page groups. Make the replacement identical in every group before applying:`n$paths"
    }
  }
}

foreach ($name in $expected) {
  $sourceFile = $files | Where-Object { $_.Name -eq $name } | Select-Object -First 1
  $destination = Join-Path $canonical $name
  Copy-Item -LiteralPath $sourceFile.FullName -Destination $destination -Force
}

Write-Host "Validated and applied $($expected.Count) approved photo files to public/assets/original/2025/03/."
Write-Host 'Validation passed: exact filenames, complete set, and duplicate page-group copies are consistent.'
Write-Host 'Now run npm run lint, npm run typecheck, npm run build, inspect locally, then commit/push the verified replacements.'