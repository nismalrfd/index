$content = Get-Content 'suite.html' -Raw -Encoding UTF8

# 1. Rebrand
$content = [regex]::Replace($content, 'JEWELX\b', 'RHENOVATECH')
$content = [regex]::Replace($content, 'JewelX\b', 'RhenovaTech')
$content = [regex]::Replace($content, 'jewelx\b', 'rhenovatech')

# 2. Swap Blue colors to Violet
$content = [regex]::Replace($content, '\bblue-', 'violet-')
$content = [regex]::Replace($content, '\broyal-', 'violet-')
$content = [regex]::Replace($content, '\bsky-', 'violet-')

# 3. Upgrade Hero mobile image bg round shape to a brilliant dark mode gradient
# The old class string was:
$oldBlob = 'mix-blend-multiply blur-3xl bg-gradient-to-tr from-violet-200 via-violet-100/50 to-white/0'
$newBlob = 'mix-blend-screen blur-3xl bg-gradient-to-tr from-violet-600 via-purple-600/40 to-transparent'
$content = $content.Replace($oldBlob, $newBlob)

# Also fix the glowing ring shadow to match violet instead of light blue
$oldRing = 'shadow-[0_0_40px_rgba(56,189,248,0.15)]'
$newRing = 'shadow-[0_0_50px_rgba(139,92,246,0.3)]'
$content = $content.Replace($oldRing, $newRing)

# Fix edge case where the previous dark theme script replaced from-sky-100
$content = $content.Replace('mix-blend-multiply blur-3xl bg-gradient-to-tr from-sky-200 via-blue-100/50 to-white/0', 'mix-blend-screen blur-3xl bg-gradient-to-tr from-violet-600 via-purple-600/40 to-transparent')

Set-Content 'suite.html' -Value $content -Encoding UTF8
Write-Output "Rebranding and violet gradient updates applied successfully!"
