const fs = require('fs');
const path = 'c:/Users/nismal/Downloads/New folder (2)/suite.html';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split(/\r?\n/);

const startLine = 319 - 1;
const endLine = 464 - 1;

const replacement = `    <!-- ==========================================
         HERO SECTION: NEXT-GEN INTERFACE
         ========================================== -->
    <header class="relative w-full min-h-[800px] bg-[#0a0f1d] overflow-hidden flex flex-col md:flex-row justify-center items-center p-6 md:p-12 lg:p-24 text-white reveal-section">
        
        <!-- Left Content -->
        <div class="w-full md:w-1/2 flex flex-col gap-6 z-10 text-left mb-12 md:mb-0">
            <span class="text-xs font-extrabold uppercase tracking-widest text-blue-500 block">FUTURISTIC DESIGN</span>
            <h1 class="text-4xl md:text-6xl font-extralight text-white leading-tight tracking-tight max-w-xl">
                Intelligent.<br>
                <span class="font-extrabold text-blue-500">Secure.</span><br>
                Seamless.
            </h1>
            <p class="text-white/60 text-sm md:text-base mt-4 max-w-md leading-relaxed">
                Experience the next evolution of mobile interfaces. Our premium architecture blends advanced glassmorphism with enterprise-grade security for an unmatched user experience.
            </p>
            <div class="mt-8 flex gap-4">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <i data-lucide="shield-check" class="w-4 h-4 text-blue-400"></i>
                    </div>
                    <span class="text-xs text-white/80 font-medium">Bank-grade Security</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <i data-lucide="zap" class="w-4 h-4 text-blue-400"></i>
                    </div>
                    <span class="text-xs text-white/80 font-medium">Lightning Fast</span>
                </div>
            </div>
        </div>

        <!-- Right Stage: Attached Image -->
        <div class="w-full md:w-1/2 relative flex justify-center items-center z-10">
            <!-- Background Glow -->
            <div class="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <!-- The Image Showcase -->
            <div class="relative w-full max-w-lg transition-transform duration-700 hover:scale-[1.02] hover:-translate-y-2">
                <img src="img/premium_ui.png" alt="Premium Futuristic UI" class="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl">
            </div>
        </div>
        
    </header>`;

lines.splice(startLine, endLine - startLine + 1, replacement);

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Replacement complete.');
