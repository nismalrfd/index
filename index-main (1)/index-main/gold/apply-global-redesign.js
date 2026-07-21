const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Google Fonts
const oldFont = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Plus\+Jakarta\+Sans:.*?rel="stylesheet">/;
const newFont = '<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">';
if (oldFont.test(html)) {
    html = html.replace(oldFont, newFont);
} else {
    // If exact regex doesn't match, try simpler string replacement
    const idx = html.indexOf('<link href="https://fonts.googleapis');
    if (idx !== -1) {
        const endIdx = html.indexOf('>', idx) + 1;
        html = html.substring(0, idx) + newFont + html.substring(endIdx);
    }
}

// 2. Update Tailwind Config
const twConfigRegex = /fontFamily:\s*\{[\s\S]*?\},/;
const newTwConfig = `fontFamily: {
    sans: ['Inter', 'sans-serif'],
    cinzel: ['Cinzel', 'serif'],
},`;
html = html.replace(twConfigRegex, newTwConfig);

// 3. Global Text Color Replacements
html = html.replace(/text-white/g, 'text-[#F8F6F0]');
html = html.replace(/text-gray-100/g, 'text-[#F8F6F0]');
html = html.replace(/text-\[#F5F5F3\]/g, 'text-[#F8F6F0]');
html = html.replace(/text-gray-200/g, 'text-[#F8F6F0]');

html = html.replace(/text-gray-400/g, 'text-[#B8B8B8]');
html = html.replace(/text-\[#A8ADB5\]/g, 'text-[#B8B8B8]');
html = html.replace(/text-gray-300/g, 'text-[#B8B8B8]');
html = html.replace(/text-gray-500/g, 'text-[#9A9A9A]');

// 4. Global Accent Replacements (Swapping primary colors to Gold)
const colors = ['blue', 'indigo', 'green', 'pink', 'cyan', 'fuchsia', 'orange', 'teal', 'yellow', 'purple', 'brand'];
colors.forEach(color => {
    // Replace text colors for specific highlights
    html = html.replace(new RegExp(`text-${color}-400`, 'g'), 'text-[#D4AF37]');
    html = html.replace(new RegExp(`text-${color}-500`, 'g'), 'text-[#D4AF37]');
    html = html.replace(new RegExp(`text-${color}-300`, 'g'), 'text-[#D4AF37]');
    
    // Replace hover borders
    html = html.replace(new RegExp(`hover:border-${color}-500\\/50`, 'g'), 'hover:border-[#D4AF37]/50');
    html = html.replace(new RegExp(`hover:border-${color}-400`, 'g'), 'hover:border-[#D4AF37]');
    
    // Replace background glows and overlays
    html = html.replace(new RegExp(`bg-${color}-500\\/5`, 'g'), 'bg-[#D4AF37]/5');
    html = html.replace(new RegExp(`bg-${color}-500\\/10`, 'g'), 'bg-[#D4AF37]/10');
    html = html.replace(new RegExp(`bg-${color}-500\\/20`, 'g'), 'bg-[#D4AF37]/20');
    html = html.replace(new RegExp(`bg-${color}-500\\/30`, 'g'), 'bg-[#D4AF37]/30');
    
    // Replace border colors
    html = html.replace(new RegExp(`border-${color}-500\\/30`, 'g'), 'border-[#D4AF37]/30');
    html = html.replace(new RegExp(`border-${color}-500\\/20`, 'g'), 'border-[#D4AF37]/20');
});

// Specifically target from-blue-500 via-green-500 etc for gradient text and make it gold gradient
html = html.replace(/from-blue-500 via-green-500 to-yellow-500/g, 'from-[#D4AF37] via-[#F8F6F0] to-[#D4AF37]');
html = html.replace(/from-brand-500 to-brand-700/g, 'from-[#D4AF37] to-[#B8962E]');

// 5. Typography Application (Cinzel for headings)
html = html.replace(/<h1(.*?)class="/g, '<h1$1class="font-cinzel ');
html = html.replace(/<h2(.*?)class="/g, '<h2$1class="font-cinzel ');
html = html.replace(/<h3(.*?)class="/g, '<h3$1class="font-cinzel ');
html = html.replace(/<h4(.*?)class="/g, '<h4$1class="font-cinzel ');

// Special case: sometimes class attribute doesn't exist, though usually it does.
// Clean up any double spaces from replacement
html = html.replace(/class="font-cinzel  /g, 'class="font-cinzel ');

// 6. Fix Digital Catalogue Background
// Find the section and replace bg-[#FDFBF7] with bg-[#0A0A0A] and text-[#1A1A1A] to text-[#F8F6F0]
const catStart = html.indexOf('<!-- ===================== SECTION: PORTFOLIO / CREATIONS ===================== -->');
const catEnd = html.indexOf('<!-- ===================== SECTION 2: EXPERT ZOHO CONSULTANTS ===================== -->');

if (catStart !== -1 && catEnd !== -1) {
    let catBlock = html.substring(catStart, catEnd);
    
    // Background and text swaps for this block
    catBlock = catBlock.replace(/bg-\[#FDFBF7\]/g, 'bg-[#0A0A0A]');
    catBlock = catBlock.replace(/border-gray-100/g, 'border-white/5');
    catBlock = catBlock.replace(/text-\[#1A1A1A\]/g, 'text-[#F8F6F0]');
    catBlock = catBlock.replace(/bg-white/g, 'bg-[#111111]'); // dark cards
    catBlock = catBlock.replace(/bg-\[#FAFAF9\]/g, 'bg-[#050505]'); // dark image bg
    catBlock = catBlock.replace(/bg-white\/90/g, 'bg-black/80'); // dark badges
    catBlock = catBlock.replace(/text-gray-600/g, 'text-[#B8B8B8]'); // paragraph text
    catBlock = catBlock.replace(/bg-\[#1A1A1A\]/g, 'bg-[#D4AF37]'); // dark button to gold
    catBlock = catBlock.replace(/text-white/g, 'text-[#050505]'); // button text to dark
    catBlock = catBlock.replace(/hover:bg-\[#D4B483\]/g, 'hover:bg-[#F8F6F0]'); // button hover

    html = html.substring(0, catStart) + catBlock + html.substring(catEnd);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Phase 1 Execution complete: Global typography, color, and structure applied.');
