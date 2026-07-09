import re

with open('suite.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Clean up duplicate legacy sections to ensure the new content is exactly what you see
html = re.sub(r'<!-- ={42}\n\s*SECTION 1: THE LUXURY CUSTOMER APP.*?<!-- ={42}\n\s*SECTION 3: THE CUSTOMER APP', r'<!-- ==========================================\n             SECTION 1: THE CUSTOMER APP', html, flags=re.DOTALL)

html = html.replace('SECTION 4: THE SALESMAN APP', 'SECTION 2: THE SALESMAN APP')
html = html.replace('SECTION 5: THE OWNER APP', 'SECTION 3: THE OWNER APP')
html = html.replace('SECTION 6: THE MASTERPIECE WRIST APP', 'SECTION 4: PLATFORM OVERVIEW')

# 2. Global Dark Theme replacements
html = html.replace('bg-white text-slate-800', 'bg-[#0a0712] text-slate-300')
html = html.replace('bg-gradient-to-b from-sky-100 via-blue-50/50 to-white', 'bg-gradient-to-b from-[#110e1a] via-[#0a0712] to-[#0a0712]')
html = html.replace('from-sky-100 to-sky-50', 'from-white/10 to-white/5')
html = html.replace('border-sky-100', 'border-white/10')
html = html.replace('text-slate-200/20', 'text-white/5')

# Text Colors
html = re.sub(r'\btext-slate-900\b', 'text-white', html)
html = re.sub(r'\btext-slate-800\b', 'text-slate-200', html)
html = re.sub(r'\btext-slate-700\b', 'text-slate-300', html)
html = re.sub(r'\btext-slate-600\b', 'text-slate-400', html)
html = re.sub(r'\btext-slate-500\b', 'text-slate-400', html)

# Backgrounds
html = re.sub(r'\bbg-white\b(?!/| )', 'bg-[#13101d]', html)
html = re.sub(r'\bbg-white\b ', 'bg-[#13101d] ', html)
# Fix up cases where we want real white by reversing accidental replacements
html = html.replace('bg-[#13101d]/10', 'bg-white/10')
html = html.replace('bg-[#13101d]/20', 'bg-white/20')
html = html.replace('bg-[#13101d]/30', 'bg-white/30')
html = html.replace('bg-[#13101d]/40', 'bg-white/40')
html = html.replace('bg-[#13101d]/50', 'bg-white/50')
html = html.replace('bg-[#13101d]/5', 'bg-white/5')

html = re.sub(r'\bbg-slate-50\b', 'bg-white/5', html)
html = re.sub(r'\bbg-slate-100\b', 'bg-white/10', html)
html = re.sub(r'\bbg-[#dce2f9]\b', 'bg-[#0a0712]', html)
html = re.sub(r'\bbg-[#FAF9F6]\b', 'bg-[#13101d]', html)
html = re.sub(r'\bbg-[#FAFBFD]\b', 'bg-[#13101d]', html)
html = re.sub(r'\bbg-[#FAFEFA]\b', 'bg-[#13101d]', html)
html = re.sub(r'\bbg-[#f4f7fe]\b', 'bg-[#13101d]', html)

# Borders
html = re.sub(r'\bborder-slate-100\b', 'border-white/10', html)
html = re.sub(r'\bborder-slate-200\b', 'border-white/10', html)

# Accent backgrounds for icons
html = re.sub(r'\bbg-emerald-50\b', 'bg-emerald-900/30', html)
html = re.sub(r'\bbg-orange-50\b', 'bg-orange-900/30', html)
html = re.sub(r'\bbg-purple-50\b', 'bg-purple-900/30', html)
html = re.sub(r'\bbg-amber-50\b', 'bg-amber-900/30', html)
html = re.sub(r'\bbg-blue-50\b', 'bg-blue-900/30', html)
html = re.sub(r'\bbg-royal-50\b', 'bg-royal-900/30', html)

# Timeline dotted line & badges
html = html.replace('border-blue-300/60', 'border-white/20')
html = html.replace('bg-blue-100 text-royal-600', 'bg-royal-600 text-white')
html = html.replace('ring-white/50', 'ring-[#0a0712]')
html = html.replace('text-blue-900/60', 'text-white/60')
html = html.replace('text-blue-900', 'text-white')

with open('suite.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Dark theme applied successfully!")
