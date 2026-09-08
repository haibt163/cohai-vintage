$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path $repoRoot 'public/assets/original/2025/03'
$staging = Join-Path $repoRoot 'manual-photo-replacements'

$groups = @{
  landing = @(
    'STREET-STYLE-3.jpg','STREET-STYLE-1.jpg','CO-HAI-VINTAGE.jpg','CO-HAI-VINTAGE-1.jpg',
    'CO-HAI-VINTAGE-2.jpg','CO-HAI-VINTAGE-3.jpg','FLEA-MARKET.jpg','MIKIMOTO-1.jpg',
    'COCO-CHANEL.jpg','221215140542-bernard-arnault.jpg','LV-vintage-Concorde.webp',
    'lv-concorde-1.jpg','LV-CONCORDE-2.webp','LV-NEVERFUL-MONO-MM.jpg','LV-neverfull-MM.jpg',
    'lv-neverfull-mono-1.jpg','LV-KELLY-MONO.jpg','LV-KELLY-LOCK.jpg'
  )
  about = @('CO-HAI-VINTAGE.jpg','CO-HAI-VINTAGE-1.jpg','CO-HAI-VINTAGE-2.jpg','CO-HAI-VINTAGE-3.jpg')
  journal = @('FLEA-MARKET.jpg','MIKIMOTO-1.jpg','STREET-STYLE-3.jpg','221215140542-bernard-arnault.jpg','COCO-CHANEL.jpg')
  shop = @('LV-vintage-Concorde.webp','lv-concorde-1.jpg','LV-CONCORDE-2.webp','LV-NEVERFUL-MONO-MM.jpg','LV-neverfull-MM.jpg','lv-neverfull-mono-1.jpg','LV-KELLY-MONO.jpg','LV-KELLY-LOCK.jpg')
}

foreach ($group in $groups.Keys) {
  $target = Join-Path $staging $group
  New-Item -ItemType Directory -Force -Path $target | Out-Null

  foreach ($file in $groups[$group]) {
    $from = Join-Path $source $file
    $to = Join-Path $target $file
    if (-not (Test-Path -LiteralPath $from)) {
      throw "Missing canonical photo: $from"
    }
    Copy-Item -LiteralPath $from -Destination $to -Force
  }
}

Write-Host 'Current site photos copied into manual-photo-replacements/.'
Write-Host 'Replace the staged files with genuine originals using the exact same filenames.'
