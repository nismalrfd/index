$content = Get-Content 'suite.html' -Raw -Encoding UTF8

$content = $content -replace '(?s)<!-- ={42}\r?\n\s*SECTION 1: THE LUXURY CUSTOMER APP.*?<!-- ={42}\r?\n\s*SECTION 3: THE CUSTOMER APP', '<!-- ==========================================
             SECTION 1: THE CUSTOMER APP'

$content = $content.Replace('SECTION 4: THE SALESMAN APP', 'SECTION 2: THE SALESMAN APP')
$content = $content.Replace('SECTION 5: THE OWNER APP', 'SECTION 3: THE OWNER APP')
$content = $content.Replace('SECTION 6: THE MASTERPIECE WRIST APP', 'SECTION 4: PLATFORM OVERVIEW')

$content = $content.Replace('bg-white text-slate-800', 'bg-[#0a0712] text-slate-300')
$content = $content.Replace('bg-gradient-to-b from-sky-100 via-blue-50/50 to-white', 'bg-gradient-to-b from-[#110e1a] via-[#0a0712] to-[#0a0712]')
$content = $content.Replace('from-sky-100 to-sky-50', 'from-white/10 to-white/5')
$content = $content.Replace('border-sky-100', 'border-white/10')
$content = $content.Replace('text-slate-200/20', 'text-white/5')

$content = [regex]::Replace($content, '\btext-slate-900\b', 'text-white')
$content = [regex]::Replace($content, '\btext-slate-800\b', 'text-slate-200')
$content = [regex]::Replace($content, '\btext-slate-700\b', 'text-slate-300')
$content = [regex]::Replace($content, '\btext-slate-600\b', 'text-slate-400')
$content = [regex]::Replace($content, '\btext-slate-500\b', 'text-slate-400')

$content = [regex]::Replace($content, '\bbg-white\b(?!/| )', 'bg-[#13101d]')
$content = [regex]::Replace($content, '\bbg-white\b ', 'bg-[#13101d] ')

$content = $content.Replace('bg-[#13101d]/10', 'bg-white/10')
$content = $content.Replace('bg-[#13101d]/20', 'bg-white/20')
$content = $content.Replace('bg-[#13101d]/30', 'bg-white/30')
$content = $content.Replace('bg-[#13101d]/40', 'bg-white/40')
$content = $content.Replace('bg-[#13101d]/50', 'bg-white/50')
$content = $content.Replace('bg-[#13101d]/5', 'bg-white/5')

$content = [regex]::Replace($content, '\bbg-slate-50\b', 'bg-white/5')
$content = [regex]::Replace($content, '\bbg-slate-100\b', 'bg-white/10')
$content = [regex]::Replace($content, '\bbg-\[#dce2f9\]\b', 'bg-[#0a0712]')
$content = [regex]::Replace($content, '\bbg-\[#FAF9F6\]\b', 'bg-[#13101d]')
$content = [regex]::Replace($content, '\bbg-\[#FAFBFD\]\b', 'bg-[#13101d]')
$content = [regex]::Replace($content, '\bbg-\[#FAFEFA\]\b', 'bg-[#13101d]')
$content = [regex]::Replace($content, '\bbg-\[#f4f7fe\]\b', 'bg-[#13101d]')

$content = [regex]::Replace($content, '\bborder-slate-100\b', 'border-white/10')
$content = [regex]::Replace($content, '\bborder-slate-200\b', 'border-white/10')

$content = [regex]::Replace($content, '\bbg-emerald-50\b', 'bg-emerald-900/30')
$content = [regex]::Replace($content, '\bbg-orange-50\b', 'bg-orange-900/30')
$content = [regex]::Replace($content, '\bbg-purple-50\b', 'bg-purple-900/30')
$content = [regex]::Replace($content, '\bbg-amber-50\b', 'bg-amber-900/30')
$content = [regex]::Replace($content, '\bbg-blue-50\b', 'bg-blue-900/30')
$content = [regex]::Replace($content, '\bbg-royal-50\b', 'bg-royal-900/30')

$content = $content.Replace('border-blue-300/60', 'border-white/20')
$content = $content.Replace('bg-blue-100 text-royal-600', 'bg-royal-600 text-white')
$content = $content.Replace('ring-white/50', 'ring-[#0a0712]')
$content = $content.Replace('text-blue-900/60', 'text-white/60')
$content = $content.Replace('text-blue-900', 'text-white')

Set-Content 'suite.html' -Value $content -Encoding UTF8
Write-Output "Dark theme applied successfully via PowerShell!"
