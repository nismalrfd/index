/* ==========================================================================
   AURA ERP ANIMATION & LOGIC ENGINE (LIGHT MODE)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize Canvas Particle Background
    initHeroParticles();

    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initScrollAnimations();
    } else {
        console.warn("GSAP/ScrollTrigger not loaded. Core interactions only.");
    }

    // UI Interactions
    initFloatingNavigation();
    initHeroParallax();
    initConnectedNetwork();
    initDevicePillsSwitch();
    initCustomEstimator();
    initMagneticButtons();
    initCinematicFooter();
    initEnhancedScrollAnimations();
});

/* ==========================================================================
   FLOATING & DOT NAVIGATION CONTROLLER
   ========================================================================== */
function initFloatingNavigation() {
    const floatingHeader = document.getElementById("floating-header");
    const dots = document.querySelectorAll(".nav-dot");
    const sections = document.querySelectorAll("section");

    // Scroll header reveal
    window.addEventListener("scroll", () => {
        if (floatingHeader) {
            if (window.scrollY > 150) {
                floatingHeader.classList.add("active");
            } else {
                floatingHeader.classList.remove("active");
            }
        }

        // Active dot tracking
        let currentSectionId = "";
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 200;
            const secHeight = sec.offsetHeight;
            if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        if (currentSectionId) {
            dots.forEach(dot => {
                dot.classList.remove("active");
                if (dot.getAttribute("href") === `#${currentSectionId}`) {
                    dot.classList.add("active");
                }
            });
        }
    });

    // Dot click smooth scroll
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute("href");
            const targetSec = document.querySelector(targetId);
            if (targetSec) {
                window.scrollTo({
                    top: targetSec.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* ==========================================================================
   HERO PARTICLES CANVAS (Grey/Violet on White Background)
   ========================================================================== */
function initHeroParticles() {
    const canvas = document.getElementById("hero-particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 50;

    const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#736DB3"; // Violet particles
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };
    animate();
}

/* ==========================================================================
   HERO MOUSE PARALLAX
   ========================================================================== */
function initHeroParallax() {
    const hero = document.getElementById("hero");
    const scene = document.querySelector(".scene-perspective-3d");
    const tablet = document.querySelector(".device-tablet");
    const mobile = document.querySelector(".device-mobile");
    const tagSales = document.querySelector(".tag-sales");
    const tagInventory = document.querySelector(".tag-inventory");

    if (!hero || !scene) return;
    if (window.innerWidth < 768) return;

    hero.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const rect = hero.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) - 0.5;
        const y = ((clientY - rect.top) / rect.height) - 0.5;

        // Animate Mockup Scene Rotation
        gsap.to(scene, {
            rotateY: -10 + (x * 16),
            rotateX: 8 - (y * 12),
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Offset individual device layers for depth
        if (tablet) gsap.to(tablet, { x: -x * 25, y: -y * 25, z: -20, duration: 0.8, ease: "power2.out", overwrite: "auto" });
        if (mobile) gsap.to(mobile, { x: x * 30, y: y * 30, z: 70, duration: 0.8, ease: "power2.out", overwrite: "auto" });
        if (tagSales) gsap.to(tagSales, { x: x * 20, y: y * 20, z: 90, duration: 0.8, ease: "power2.out", overwrite: "auto" });
        if (tagInventory) gsap.to(tagInventory, { x: -x * 20, y: -y * 20, z: 80, duration: 0.8, ease: "power2.out", overwrite: "auto" });
    });

    hero.addEventListener("mouseleave", () => {
        gsap.to(scene, { rotateY: -10, rotateX: 8, duration: 1.2, ease: "power2.out" });
        if (tablet) gsap.to(tablet, { x: 0, y: 0, z: -20, duration: 1.2 });
        if (mobile) gsap.to(mobile, { x: 0, y: 0, z: 50, duration: 1.2 });
        if (tagSales) gsap.to(tagSales, { x: 0, y: 0, z: 80, duration: 1.2 });
        if (tagInventory) gsap.to(tagInventory, { x: 0, y: 0, z: 60, duration: 1.2 });
    });
}

/* ==========================================================================
   Section 3 Connected Node interactions
   ========================================================================== */
function initConnectedNetwork() {
    const nodes = document.querySelectorAll(".module-node-item-light");
    const panelTitle = document.getElementById("panel-title-node");
    const panelDesc = document.getElementById("panel-desc-node");

    nodes.forEach(node => {
        node.addEventListener("mouseenter", () => {
            const pathId = node.getAttribute("data-path");
            const title = node.getAttribute("data-title");
            const desc = node.getAttribute("data-desc");

            // Glow path line
            const path = document.getElementById(pathId);
            if (path) {
                gsap.to(path, {
                    stroke: "var(--accent)",
                    strokeWidth: 3,
                    strokeDasharray: "4 4",
                    duration: 0.3
                });
            }

            // Update details card
            if (panelTitle && panelDesc) {
                panelTitle.textContent = title;
                panelDesc.textContent = desc;
                gsap.fromTo("#connect-info-panel", { scale: 0.98, opacity: 0.8 }, { scale: 1, opacity: 1, duration: 0.2 });
            }
        });

        node.addEventListener("mouseleave", () => {
            const pathId = node.getAttribute("data-path");
            const path = document.getElementById(pathId);
            if (path) {
                gsap.to(path, {
                    stroke: "url(#violet-flow-grad)",
                    strokeWidth: 2,
                    strokeDasharray: "6 6",
                    duration: 0.3
                });
            }
        });
    });
}

/* ==========================================================================
   6. CROSS PLATFORM (MacBook screen UI swapper)
   ========================================================================== */
function initDevicePillsSwitch() {
    const buttons = document.querySelectorAll(".device-pill-btn");
    const screenDisplay = document.getElementById("active-macbook-ui");

    const activeUIs = {
        "macbook": `
            <div class="macbook-head"><span class="logo-dot"></span> <strong>AURA Cloud Platform</strong></div>
            <div class="macbook-body">
                <h4 style="font-size: 15px;">One Platform. Every Device.</h4>
                <div class="mock-device-boxes">
                    <div class="mock-box-pill" style="background:var(--accent-light); border-color:var(--accent); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:var(--accent);">MacBook Pro App</div>
                    <div class="mock-box-pill"></div>
                </div>
            </div>`,
        "windows": `
            <div class="macbook-head"><span class="logo-dot"></span> <strong>Windows Desktop Core</strong></div>
            <div class="macbook-body">
                <h4 style="font-size: 15px;">Showroom Consolidated Revenue</h4>
                <strong style="font-size:20px; color:#4cd964; display:block;">$148,250.00</strong>
                <span style="font-size:9.5px; color:#4cd964;">+14.2% Growth Index</span>
            </div>`,
        "tablet": `
            <div class="macbook-head"><span class="logo-dot"></span> <strong>iPad Billing Interface</strong></div>
            <div class="macbook-body">
                <div style="display:flex; justify-content:space-between; font-size:11px; border-bottom:1px solid var(--border-color); padding-bottom:4px;">
                    <strong>Cart #40</strong> <span>1 Item</span>
                </div>
                <div style="font-size:11px; display:flex; justify-content:space-between; margin-top:4px;">
                    <span>Diamond Necklace</span> <strong style="color:var(--accent);">$4,200.00</strong>
                </div>
            </div>`,
        "phone": `
            <div class="macbook-head"><span class="logo-dot"></span> <strong>Customer Schemes app</strong></div>
            <div class="macbook-body">
                <p style="font-size:10px; color:var(--text-secondary); margin-bottom:2px;">Current Gold Scheme Balance</p>
                <strong style="font-size:18px; color:#ffd700; text-shadow:0 1px 3px rgba(0,0,0,0.1);">120.50g Gold</strong>
            </div>`,
        "browser": `
            <div class="macbook-head"><span class="logo-dot"></span> <strong>Web Terminal Sync</strong></div>
            <div class="macbook-body">
                <p style="font-size:10px; color:var(--text-secondary);">Real-Time Syncing Streams</p>
                <div style="height:6px; border-radius:3px; background:var(--border-color); position:relative; overflow:hidden;">
                    <div style="position:absolute; top:0; left:0; width:80%; height:100%; background:var(--accent);"></div>
                </div>
            </div>`
    };

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const device = btn.getAttribute("data-device");

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (screenDisplay && activeUIs[device]) {
                screenDisplay.innerHTML = activeUIs[device];
                gsap.fromTo(screenDisplay, { opacity: 0.7, scale: 0.99 }, { opacity: 1, scale: 1, duration: 0.25 });
            }
        });
    });
}

/* ==========================================================================
   11. CUSTOM SOLUTIONS (Estimator Calculator)
   ========================================================================== */
function initCustomEstimator() {
    const slider = document.getElementById("custom-slider-input");
    const countTag = document.getElementById("slider-count-tag");
    const latencyVal = document.getElementById("res-latency");
    const durationVal = document.getElementById("res-duration");

    if (!slider) return;

    slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        countTag.textContent = `${val} Modules`;

        const latency = 110 + (val * 6);
        const minDays = val * 3;
        const maxDays = (val * 3) + 5;

        latencyVal.textContent = `${latency}ms`;
        durationVal.textContent = `${minDays}-${maxDays} Days`;
    });
}

/* ==========================================================================
   GSAP & SCROLL TRIGGER CONTROLLER
   ========================================================================== */
function initScrollAnimations() {
    // 01. Hero fade-ins
    gsap.from("#hero-text-block .hero-badges-row span", { y: 15, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" });
    gsap.from("#hero-text-block .hero-title", { y: 25, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.from("#hero-text-block .hero-description", { y: 15, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" });
    gsap.from("#hero-text-block .hero-cta-buttons", { y: 15, opacity: 0, duration: 1, delay: 0.6, ease: "power3.out" });
    gsap.from("#hero-mockups-container", { y: 40, opacity: 0, duration: 1.2, delay: 0.8, ease: "power3.out" });

    // 02. Zoho Infrastructure Entrance Animations
    const infraTL = gsap.timeline({
        scrollTrigger: {
            trigger: "#infrastructure",
            start: "top center+=150px",
            toggleActions: "play none none reverse"
        }
    });
    
    infraTL.from("#infrastructure .infra-label", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" })
           .from("#infrastructure .infra-main-title", { y: 40, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
           .from("#infrastructure .infra-main-desc", { y: 40, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.65")
           .from("#infrastructure .zoho-main-logo", { scale: 0.9, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5")
           .from("#infrastructure .infra-isometric-platform", { y: 30, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.6")
           .from("#infrastructure .infra-feature-card", { y: 35, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power2.out" }, "-=0.8")
           .from("#infrastructure .infra-bottom-logos", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

    // 04. Business Journey Scroll-driven Dashboard Switcher
    if (window.innerWidth >= 768) {
        const steps = document.querySelectorAll(".timeline-step-item");
        const viewportTitle = document.getElementById("journey-viewport-title");
        const viewportBody = document.getElementById("journey-viewport-body");

        const journeyScreens = [
            // Screen 1: Customer Enters
            `<div class="sim-screen crm-screen">
                <div class="sim-avatar-row">
                    <div class="sim-avatar" style="background:var(--accent);"></div>
                    <div class="sim-text-col">
                        <h4 style="font-size:13px; font-weight:600; color:#111111;">Devashish Sen</h4>
                        <span style="font-size:9px; color:var(--accent); font-weight:700;">VIP Member • Schemes Active</span>
                    </div>
                </div>
                <div class="sim-data-grid">
                    <div class="sim-box"><span>Saving Balance</span><strong>140g Gold</strong></div>
                    <div class="sim-box"><span>Points Accumulated</span><strong>4,280 pts</strong></div>
                </div>
            </div>`,
            // Screen 2: Billing
            `<div class="sim-screen pos-screen">
                <div style="font-size:11.5px; font-weight:600; margin-bottom:4px; display:flex; justify-content:space-between;">
                    <span>Checkout terminal</span> <span style="color:var(--accent);">Necklace scanned</span>
                </div>
                <div style="background:rgba(0,0,0,0.01); border:1px solid var(--border-color); border-radius:6px; padding:10px;">
                    <div class="table-row head" style="border:none;"><span>Item</span> <span>Weight</span> <span>Total</span></div>
                    <div class="table-row" style="border:none; padding:4px 0;"><span>Dia Necklace DN-08</span> <span>18.4g</span> <span>$4,200.00</span></div>
                    <div class="table-row total" style="margin-top:6px; padding-top:6px;"><span>Total Bill</span> <span></span> <span style="color:var(--accent); font-weight:700;">$4,200.00</span></div>
                </div>
            </div>`,
            // Screen 3: Inventory
            `<div class="sim-screen inventory-screen">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
                    <div style="width:28px; height:28px; border-radius:50%; background:rgba(255,59,48,0.08); color:#ff3b30; display:flex; align-items:center; justify-content:center;"><i data-lucide="package-minus" style="width:14px; height:14px;"></i></div>
                    <div>
                        <h4 style="font-size:11.5px; font-weight:600;">Stock level decremented</h4>
                        <p style="font-size:10px; color:var(--text-secondary);">Necklace ID #DN-08</p>
                    </div>
                </div>
                <div class="bar-row-item" style="font-size:10px;"><span>Dia Necklaces</span> <div class="bar-progress-container" style="margin:0 8px;"><div class="bar-progress-fill" style="width:35%; background:#ff3b30;"></div></div> <span style="color:#ff3b30;">-1 item</span></div>
            </div>`,
            // Screen 4: Accounts
            `<div class="sim-screen accounts-screen">
                <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px;">Double Entry Postings Locked</div>
                <div class="mock-ledger-rows">
                    <div class="ledger-box" style="padding:8px 10px; font-size:11px;"><span>Debit Showroom Cash</span> <span class="text-green">+$4,200.00</span></div>
                    <div class="ledger-box" style="padding:8px 10px; font-size:11px;"><span>Credit Revenue Ledger</span> <span style="color:#111111;">+$3,818.18</span></div>
                </div>
            </div>`,
            // Screen 5: Marketing
            `<div class="sim-screen marketing-screen">
                <div style="max-width:210px; background:var(--bg-light); border: 1px solid var(--border-color); border-radius:12px 12px 12px 0; padding:10px; font-size:11px; align-self:flex-start;">
                    <strong style="color:#25d366; display:block; margin-bottom:4px; font-size:9.5px;">WhatsApp Template Sent</strong>
                    "Hi Devashish, invoice #INV-294 for $4,200.00 has been paid. 420 scheme loyalty points added!"
                </div>
            </div>`,
            // Screen 6: Owner
            `<div class="sim-screen owner-screen">
                <div style="font-size:11.5px; font-weight:600; margin-bottom:6px; color:var(--accent);">Owner consolidated feed</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                    <div style="background:var(--bg-light); border:1px solid var(--border-color); border-radius:6px; padding:8px; text-align:center;">
                        <span style="font-size:9px; color:var(--text-secondary);">Today's Sales</span>
                        <strong style="font-size:14px; display:block; color:#4cd964;">$152,450</strong>
                    </div>
                    <div style="background:var(--bg-light); border:1px solid var(--border-color); border-radius:6px; padding:8px; text-align:center;">
                        <span style="font-size:9px; color:var(--text-secondary);">Commissions</span>
                        <strong style="font-size:14px; display:block; color:var(--accent);">$84.00</strong>
                    </div>
                </div>
            </div>`
        ];

        const screenTitles = [
            "CRM Customer Profile",
            "Checkout Terminal — POS Billing",
            "Inventory Stock Sync",
            "Double-Entry Ledger",
            "AURA Auto-Marketing Engine",
            "Showroom Executive Dashboard"
        ];

        const journeyTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#journey-sticky",
                start: "top top",
                end: "bottom+=250% top",
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });

        steps.forEach((step, index) => {
            journeyTimeline.to({}, {
                duration: 1,
                onStart: () => {
                    steps.forEach(s => s.classList.remove("active"));
                    step.classList.add("active");

                    if (viewportTitle && viewportBody) {
                        viewportTitle.textContent = screenTitles[index];
                        viewportBody.innerHTML = journeyScreens[index];
                        if (typeof lucide !== 'undefined') {
                            lucide.createIcons();
                        }
                    }
                },
                onReverseComplete: () => {
                    if (index > 0) {
                        steps.forEach(s => s.classList.remove("active"));
                        steps[index - 1].classList.add("active");
                        if (viewportTitle && viewportBody) {
                            viewportTitle.textContent = screenTitles[index - 1];
                            viewportBody.innerHTML = journeyScreens[index - 1];
                            if (typeof lucide !== 'undefined') {
                                lucide.createIcons();
                            }
                        }
                    }
                }
            });
        });
    }

    // 08. Automation cascade highlights
    const stepsCascade = document.querySelectorAll(".stepper-item");
    if (stepsCascade.length > 0) {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#automation",
                start: "top center+=120px",
                end: "bottom center",
                scrub: true
            }
        }).to(stepsCascade, {
            onStart: () => {
                stepsCascade.forEach((step, i) => {
                    setTimeout(() => {
                        step.classList.add("active");
                    }, i * 150);
                });
            },
            onReverseComplete: () => {
                stepsCascade.forEach(step => step.classList.remove("active"));
            }
        });
    }

    // 09. Fullscreen Dashboard Showcase (Horizontal scroll slides)
    if (window.innerWidth >= 768) {
        const showcaseTrack = document.getElementById("showcase-track");
        if (showcaseTrack) {
            gsap.to(showcaseTrack, {
                x: () => -(showcaseTrack.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: "#showcase-sticky-frame",
                    start: "top top",
                    end: () => `+=${showcaseTrack.scrollWidth - window.innerWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });
        }
    }

    // 06b. Mobile App Showcase Scroll Reveal
    const appLayouts = document.querySelectorAll(".mobile-app-layout");
    appLayouts.forEach(layout => {
        gsap.to(layout, {
            scrollTrigger: {
                trigger: layout,
                start: "top bottom-=100px",
                onEnter: () => layout.classList.add("active"),
                toggleActions: "play none none reverse"
            }
        });
    });

    // 10. Security Shield & Counter Up
    const shieldUptime = document.getElementById("shield-uptime-number");
    if (shieldUptime) {
        gsap.to({ val: 99.00 }, {
            val: 99.99,
            duration: 2.2,
            scrollTrigger: {
                trigger: "#security",
                start: "top center",
                toggleActions: "play none none none"
            },
            onUpdate: function () {
                shieldUptime.textContent = `${this.targets()[0].val.toFixed(2)}%`;
            }
        });
    }

    // 12. Implementation Journey horizontal progress fill
    const fillLine = document.getElementById("implementation-fill-line");
    const stepsNode = document.querySelectorAll(".step-card-node");
    if (fillLine && stepsNode.length > 0) {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".journey-timeline-horizontal",
                start: "top center+=150px",
                end: "bottom center",
                scrub: 1
            }
        })
        .to(fillLine, {
            width: "100%",
            ease: "none",
            duration: 1
        });

        stepsNode.forEach((node) => {
            gsap.to(node, {
                scrollTrigger: {
                    trigger: node,
                    start: "left center+=150px",
                    toggleActions: "play none none reverse",
                    onEnter: () => node.classList.add("active"),
                    onLeaveBack: () => node.classList.remove("active")
                }
            });
        });
    }
}

/* ==========================================================================
   MAGNETIC BUTTON CONTROLLER (3D Tilt Follow)
   ========================================================================== */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    if (!magneticBtns.length || window.innerWidth < 768) return;

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;
            const w = rect.height / 2;
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - w;

            gsap.to(btn, {
                x: x * 0.4,
                y: y * 0.4,
                rotationX: -y * 0.15,
                rotationY: x * 0.15,
                scale: 1.05,
                ease: 'power2.out',
                duration: 0.4,
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                ease: 'elastic.out(1, 0.3)',
                duration: 1.2,
            });
        });
    });
}

/* ==========================================================================
   CINEMATIC FOOTER PARALLAX & SCROLL ANIMATIONS
   ========================================================================== */
function initCinematicFooter() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const footerWrapper = document.getElementById('footer-curtain');
    const giantText = document.getElementById('footer-giant-text');
    const footerHeading = document.getElementById('footer-heading');
    const footerLinks = document.getElementById('footer-links');

    if (!footerWrapper) return;

    // Giant text parallax
    if (giantText) {
        gsap.fromTo(giantText,
            { y: '10vh', scale: 0.8, opacity: 0 },
            {
                y: '0vh',
                scale: 1,
                opacity: 1,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: footerWrapper,
                    start: 'top 80%',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            }
        );
    }

    // Staggered content reveal
    if (footerHeading && footerLinks) {
        gsap.fromTo(
            [footerHeading, footerLinks],
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footerWrapper,
                    start: 'top 40%',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            }
        );
    }
}

/* ==========================================================================
   ENHANCED SECTION SCROLL ANIMATIONS
   ========================================================================== */
function initEnhancedScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Connected section — node pulse animation
    const nodeItems = document.querySelectorAll('.module-node-item-light');
    nodeItems.forEach((node, i) => {
        gsap.from(node, {
            scale: 0.8,
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#connected',
                start: 'top center+=100px',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Ecosystem cards — staggered scale reveal
    const ecoCards = document.querySelectorAll('.eco-card-white');
    ecoCards.forEach((card, i) => {
        gsap.from(card, {
            scale: 0.85,
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#ecosystem',
                start: 'top center+=100px',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Cross Platform — device mockup float
    const macbookBezel = document.querySelector('.macbook-showcase-bezel');
    if (macbookBezel) {
        gsap.from(macbookBezel, {
            y: 80,
            opacity: 0,
            scale: 0.9,
            rotationX: 8,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#crossplatform',
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Multi-branch — card stagger
    const syncCards = document.querySelectorAll('.summary-check-card');
    syncCards.forEach((card, i) => {
        gsap.from(card, {
            x: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#multibranch',
                start: 'top center+=100px',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Security — shield rotation
    const shieldCenter = document.querySelector('.shield-center-vector');
    if (shieldCenter) {
        gsap.from(shieldCenter, {
            rotation: -15,
            scale: 0.7,
            opacity: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
                trigger: '#security',
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Security cards stagger
    const secCards = document.querySelectorAll('.sec-card-white');
    secCards.forEach((card, i) => {
        gsap.from(card, {
            y: 40,
            opacity: 0,
            scale: 0.9,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#security',
                start: 'top center+=50px',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Custom section — panel slide-in
    const estimatorPanel = document.querySelector('.custom-estimator-panel');
    if (estimatorPanel) {
        gsap.from(estimatorPanel, {
            x: -80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#custom',
                start: 'top center+=100px',
                toggleActions: 'play none none reverse'
            }
        });
    }

    const customFeatRows = document.querySelectorAll('.custom-feat-row');
    customFeatRows.forEach((row, i) => {
        gsap.from(row, {
            x: 80,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#custom',
                start: 'top center+=100px',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // CTA section — text scale reveal
    const ctaTitle = document.querySelector('.cta-massive-title');
    if (ctaTitle) {
        gsap.from(ctaTitle, {
            scale: 0.85,
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#cta',
                start: 'top center+=100px',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Smartphone showcase parallax float
    const phoneFloat = document.querySelector('.smartphone-float-container');
    if (phoneFloat) {
        gsap.from(phoneFloat, {
            y: 100,
            opacity: 0,
            scale: 0.85,
            rotateY: -15,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#smartphone-showcase',
                start: 'top center+=50px',
                toggleActions: 'play none none reverse'
            }
        });

        // Continuous subtle float animation
        gsap.to(phoneFloat, {
            y: -15,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.5
        });
    }
}
