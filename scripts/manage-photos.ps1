<#
Replace existing site photos or add new ones, from one folder: photo-inbox/

  Preview (changes nothing):
    powershell -ExecutionPolicy Bypass -File .\scripts\manage-photos.ps1

  Apply:
    powershell -ExecutionPolicy Bypass -File .\scripts\manage-photos.ps1 -Apply

Rules (full explanation: photo-inbox/README.md and PHOTO-REPLACEMENT-GUIDE.md):
  - A photo whose filename already exists in the media folder REPLACES it.
  - A photo with a new filename is ADDED (it never overwrites anything).
  - Filenames follow: <cohai|landing|journal|shop>-<topic>-<number>.<jpg|jpeg|png|webp|avif>
    lowercase letters, digits and hyphens only. Example: shop-concorde-4.jpg
  - Only the files in photo-inbox/ are processed. One photo or fifty, both work.
  - Everything is checked first. If anything is wrong, NOTHING is changed.
  - Adding a photo does not make the site show it. The script prints what to add to
    lib/content.ts or lib/archive-media.ts. (Editing those files stays a deliberate, reviewed step.)

This file is ASCII-only on purpose (Windows PowerShell 5.1 misreads UTF-8 without a BOM).
#>
[CmdletBinding()]
param(
  [switch]$Apply
)

$ErrorActionPreference = 'Stop'

$repoRoot    = Split-Path -Parent $PSScriptRoot
$inbox       = Join-Path $repoRoot 'photo-inbox'
$media       = Join-Path $repoRoot 'public/assets/original/2025/03'
$mediaRel    = 'public/assets/original/2025/03'
# Keep in sync with the naming rule in photo-inbox/README.md
$namePattern = '^(cohai|landing|journal|shop)(-[a-z0-9]+)*-[0-9]+\.(jpg|jpeg|png|webp|avif)$'

function Get-ImageKind([string]$Path) {
  # Looks at the first bytes of the file, so a renamed HEIC/PDF/etc. is caught.
  $buf = New-Object byte[] 12
  $fs = [System.IO.File]::OpenRead($Path)
  try { $n = $fs.Read($buf, 0, 12) } finally { $fs.Dispose() }
  if ($n -lt 12) { return 'unknown' }
  if ($buf[0] -eq 0xFF -and $buf[1] -eq 0xD8 -and $buf[2] -eq 0xFF) { return 'jpg' }
  if ($buf[0] -eq 0x89 -and $buf[1] -eq 0x50 -and $buf[2] -eq 0x4E -and $buf[3] -eq 0x47) { return 'png' }
  $ascii = [System.Text.Encoding]::ASCII.GetString($buf)
  if (($ascii.Substring(0, 4) -ceq 'RIFF') -and ($ascii.Substring(8, 4) -ceq 'WEBP')) { return 'webp' }
  if ($ascii.Substring(4, 4) -ceq 'ftyp') {
    $brand = $ascii.Substring(8, 4)
    if (($brand -ceq 'avif') -or ($brand -ceq 'avis')) { return 'avif' }
    return 'heic'   # iPhone HEIC and other ftyp-based formats
  }
  return 'unknown'
}

function Get-Usage {
  # Which photos does the site code reference, and where? (read-only)
  $map = @{}
  foreach ($rel in @('lib/content.ts', 'lib/archive-media.ts')) {
    $path = Join-Path $repoRoot $rel
    if (-not (Test-Path -LiteralPath $path)) { continue }
    foreach ($line in (Get-Content -LiteralPath $path -Encoding UTF8)) {
      $found = [regex]::Matches($line, 'media\("([^"]+)"\)')
      if ($found.Count -eq 0) { continue }
      $label = $rel
      $m = [regex]::Match($line, 'slug:\s*"([^"]+)"')
      if ($m.Success) { $label = $rel + ' [' + $m.Groups[1].Value + ']' }
      $m = [regex]::Match($line, 'group:\s*"([^"]+)"')
      if ($m.Success) { $label = $rel + ' [' + $m.Groups[1].Value + ']' }
      foreach ($f in $found) {
        $n = $f.Groups[1].Value
        if (-not $map.ContainsKey($n)) { $map[$n] = New-Object System.Collections.ArrayList }
        if (-not $map[$n].Contains($label)) { [void]$map[$n].Add($label) }
      }
    }
  }
  return $map
}

function Show-AddHint([string]$Name) {
  $prefix = ($Name -split '-')[0]
  Write-Host '           NOT SHOWN ON THE SITE YET. To display it, make this edit (then review it):'
  if ($prefix -eq 'cohai') {
    Write-Host '             lib/archive-media.ts - add an entry (shows on the homepage archive and the About page):'
    Write-Host ('               { group: "founder", src: media("' + $Name + '"), alt: { en: "<English alt text>", vi: "<Vietnamese alt text from the Project Owner>" } },')
  }
  elseif ($prefix -eq 'landing') {
    Write-Host '             lib/archive-media.ts - add an entry (homepage archive):'
    Write-Host ('               { group: "archive", src: media("' + $Name + '"), alt: { en: "<English alt text>", vi: "<Vietnamese alt text from the Project Owner>" } },')
  }
  elseif ($prefix -eq 'shop') {
    Write-Host '             lib/content.ts - append to the matching product''s gallery array:'
    Write-Host ('               media("' + $Name + '")')
  }
  elseif ($Name -cmatch '-1\.[a-z]+$') {
    Write-Host '             lib/content.ts - set the article''s "image" field (a brand-new article also needs its full entry; Vietnamese text comes from the Project Owner):'
    Write-Host ('               image: media("' + $Name + '")')
  }
  else {
    Write-Host '             A Journal article shows ONE image today, so this extra photo cannot appear until the code supports more.'
    Write-Host '             Ask for that code change first; the file can stay in the media folder meanwhile (check:media will warn about it).'
  }
}

if (-not (Test-Path -LiteralPath $media)) { throw "Media folder not found: $media" }
if (-not (Test-Path -LiteralPath $inbox)) { New-Item -ItemType Directory -Path $inbox | Out-Null }

$usage = Get-Usage
$inboxFiles = @(Get-ChildItem -LiteralPath $inbox -File | Where-Object { $_.Name -notin @('README.md', '.gitkeep') })

# --- Nothing in the inbox: show the current photos so you know what to name a replacement ---
if ($inboxFiles.Count -eq 0) {
  Write-Host 'photo-inbox/ has no photos. Put replacements or new photos there, then run this script again.'
  Write-Host ''
  Write-Host 'Current site photos (a replacement must use the same filename):'
  foreach ($f in (Get-ChildItem -LiteralPath $media -File | Sort-Object Name)) {
    $where = 'NOT REFERENCED BY THE SITE'
    if ($usage.ContainsKey($f.Name)) { $where = ($usage[$f.Name] -join '; ') }
    Write-Host ('  {0,-34} {1}' -f $f.Name, $where)
  }
  exit 0
}

# --- Check every inbox file before touching anything ---
$errors = New-Object System.Collections.ArrayList
$plan   = New-Object System.Collections.ArrayList
$existing = @(Get-ChildItem -LiteralPath $media -File)
$gitOk  = [bool](Get-Command git -ErrorAction SilentlyContinue)

foreach ($f in ($inboxFiles | Sort-Object Name)) {
  $name = $f.Name

  if ($name -cnotmatch $namePattern) {
    [void]$errors.Add("$name : name not allowed. Use <cohai|landing|journal|shop>-<topic>-<number>.<jpg|jpeg|png|webp|avif> (lowercase, hyphens), for example shop-concorde-4.jpg")
    continue
  }
  if ($f.Length -eq 0) {
    [void]$errors.Add("$name : file is empty (0 bytes).")
    continue
  }
  $ext = $f.Extension.TrimStart('.').ToLowerInvariant()
  if ($ext -eq 'jpeg') { $ext = 'jpg' }
  $kind = Get-ImageKind $f.FullName
  if ($kind -ne $ext) {
    $why = "the file content looks like '$kind', not '$ext'."
    if ($kind -eq 'heic') { $why = $why + ' iPhone HEIC photos must be converted to JPG first - renaming the file is not enough.' }
    [void]$errors.Add("$name : $why")
    continue
  }

  $stem = [System.IO.Path]::GetFileNameWithoutExtension($name)
  $otherExt = @($existing | Where-Object { ($_.Name -ne $name) -and ([System.IO.Path]::GetFileNameWithoutExtension($_.Name) -ieq $stem) })
  if ($otherExt.Count -gt 0) {
    [void]$errors.Add("$name : the site already has '$($otherExt[0].Name)' with a different extension. To replace it, save your photo with that exact filename and extension, or ask for the code reference to be changed first.")
    continue
  }

  $target = Join-Path $media $name
  if (Test-Path -LiteralPath $target) {
    $newHash = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash
    $oldHash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
    if ($newHash -eq $oldHash) {
      [void]$plan.Add([pscustomobject]@{ Action = 'SAME'; Name = $name; Source = $f.FullName; Target = $target; NewKB = [math]::Round($f.Length / 1KB); OldKB = 0 })
      continue
    }
    if ($gitOk) {
      $dirty = git -C $repoRoot status --porcelain -- "$mediaRel/$name"
      if ($dirty) {
        [void]$errors.Add("$name : the current site copy has uncommitted changes (a previous replacement not committed yet?). Commit or discard that first so nothing is lost.")
        continue
      }
    }
    $oldKB = [math]::Round((Get-Item -LiteralPath $target).Length / 1KB)
    [void]$plan.Add([pscustomobject]@{ Action = 'REPLACE'; Name = $name; Source = $f.FullName; Target = $target; NewKB = [math]::Round($f.Length / 1KB); OldKB = $oldKB })
  }
  else {
    [void]$plan.Add([pscustomobject]@{ Action = 'ADD'; Name = $name; Source = $f.FullName; Target = $target; NewKB = [math]::Round($f.Length / 1KB); OldKB = 0 })
  }
}

if ($errors.Count -gt 0) {
  Write-Host 'PROBLEMS FOUND - nothing was changed:' -ForegroundColor Red
  foreach ($e in $errors) { Write-Host "  - $e" }
  Write-Host ''
  Write-Host 'Fix the files in photo-inbox/ and run the script again.'
  exit 1
}

# --- Show the plan ---
Write-Host 'Plan:'
foreach ($p in $plan) {
  if ($p.Action -eq 'REPLACE') {
    $where = 'not referenced by the site'
    if ($usage.ContainsKey($p.Name)) { $where = ($usage[$p.Name] -join '; ') }
    Write-Host ('  REPLACE  {0}   ({1} KB -> {2} KB)' -f $p.Name, $p.OldKB, $p.NewKB)
    Write-Host ('           used in: ' + $where)
  }
  elseif ($p.Action -eq 'ADD') {
    Write-Host ('  ADD      {0}   ({1} KB)' -f $p.Name, $p.NewKB)
    if (-not $usage.ContainsKey($p.Name)) { Show-AddHint $p.Name }
  }
  else {
    Write-Host ('  SKIP     {0}   (identical to the photo already on the site)' -f $p.Name)
  }
}

$todo = @($plan | Where-Object { $_.Action -ne 'SAME' })
Write-Host ''
if ($todo.Count -eq 0) {
  Write-Host 'Nothing to change.'
  exit 0
}

if (-not $Apply) {
  Write-Host 'PREVIEW ONLY - nothing was changed.'
  Write-Host 'If the plan is right, run the same command again with -Apply at the end.'
  exit 0
}

# --- Apply ---
foreach ($p in $todo) {
  if ($p.Action -eq 'ADD') {
    if (Test-Path -LiteralPath $p.Target) { throw "Refusing to overwrite existing file while adding: $($p.Name)" }
    Copy-Item -LiteralPath $p.Source -Destination $p.Target
  }
  else {
    Copy-Item -LiteralPath $p.Source -Destination $p.Target -Force
  }
}
$replaced = @($todo | Where-Object { $_.Action -eq 'REPLACE' }).Count
$added    = @($todo | Where-Object { $_.Action -eq 'ADD' }).Count
Write-Host "Applied: $replaced replaced, $added added, in $mediaRel/"

if (Get-Command npm -ErrorAction SilentlyContinue) {
  Write-Host ''
  Write-Host 'Running npm run check:media ...'
  Push-Location $repoRoot
  try { & npm run check:media; $code = $LASTEXITCODE } finally { Pop-Location }
  if ($code -ne 0) {
    Write-Host 'check:media FAILED - read the message above before going any further.' -ForegroundColor Red
    exit 1
  }
}
else {
  Write-Host 'npm was not found, so npm run check:media was not run. Run it yourself before committing.'
}

Write-Host ''
Write-Host 'Next: edit lib/ for any ADDED photo that needs to be shown (see the hints above), look at the site locally,'
Write-Host 'run npm run lint, npm run typecheck and npm run build, then commit on a branch and open a pull request.'
Write-Host 'After committing, empty photo-inbox/ so old files do not linger.'
