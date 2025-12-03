/* =========================================================
   THYNE — Luxury Interactive Experience
   Personalisation Redefined
   ========================================================= */

// =========================================================
// STATE
// =========================================================

let metal = "wg";
let stoneA = "em";
let stoneB = "di";

const metalNames = {
    yg: "Yellow Gold",
    rg: "Rose Gold",
    wg: "White Gold",
    bg: "Black Gold"
};

const stoneNames = {
    di: "Diamond",
    em: "Emerald",
    ru: "Ruby",
    sa: "Sapphire",
    ga: "Garnet",
    lt: "London Blue Topaz",
    br: "Brown Diamond",
    bu: "Blue Diamond"
};

// =========================================================
// RING CUSTOMIZER
// =========================================================

function updateRing() {
    const img = document.getElementById("ring-image");
    if (!img) return;

    let primaryA = stoneA;
    let fallbackA = null;

    if (stoneA === "ga") {
        primaryA = "ga";
        fallbackA = "ru";
    }

    const primarySrc = `assets/renders/elqan_${metal}_${primaryA}_${stoneB}_1.png`;
    const fallbackSrc = fallbackA
        ? `assets/renders/elqan_${metal}_${fallbackA}_${stoneB}_1.png`
        : null;

    const preloader = new Image();
    
    preloader.onload = () => {
        img.style.transition = "opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1), transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
        img.style.opacity = 0;
        img.style.transform = "scale(0.95)";

        setTimeout(() => {
            img.src = preloader.src;
            img.style.opacity = 1;
            img.style.transform = "scale(1)";
        }, 50);
    };

    preloader.onerror = () => {
        if (fallbackSrc) {
            preloader.src = fallbackSrc;
        }
    };

    preloader.src = primarySrc;
}

function updateLabels() {
    const metalLabel = document.getElementById("metal-label");
    const stoneALabel = document.getElementById("stone-a-label");
    const stoneBLabel = document.getElementById("stone-b-label");

    if (metalLabel) metalLabel.textContent = metalNames[metal] || metal;
    if (stoneALabel) stoneALabel.textContent = stoneNames[stoneA] || stoneA;
    if (stoneBLabel) stoneBLabel.textContent = stoneNames[stoneB] || stoneB;
}

function initCustomizer() {
    const metalOptions = document.getElementById("metal-options");
    const stoneAOptions = document.getElementById("stone-a-options");
    const stoneBOptions = document.getElementById("stone-b-options");

    if (metalOptions) {
        metalOptions.addEventListener("click", (e) => {
            const swatch = e.target.closest(".swatch[data-metal]");
            if (!swatch) return;

            metal = swatch.dataset.metal;
            
            metalOptions.querySelectorAll(".swatch").forEach(s => s.classList.remove("selected"));
            swatch.classList.add("selected");
            
            updateLabels();
            updateRing();
        });
    }

    if (stoneAOptions) {
        stoneAOptions.addEventListener("click", (e) => {
            const swatch = e.target.closest(".swatch[data-stone-a]");
            if (!swatch) return;

            stoneA = swatch.dataset.stoneA;
            
            stoneAOptions.querySelectorAll(".swatch").forEach(s => s.classList.remove("selected"));
            swatch.classList.add("selected");
            
            updateLabels();
            updateRing();
        });
    }

    if (stoneBOptions) {
        stoneBOptions.addEventListener("click", (e) => {
            const swatch = e.target.closest(".swatch[data-stone-b]");
            if (!swatch) return;

            stoneB = swatch.dataset.stoneB;
            
            stoneBOptions.querySelectorAll(".swatch").forEach(s => s.classList.remove("selected"));
            swatch.classList.add("selected");
            
            updateLabels();
            updateRing();
        });
    }

    updateLabels();
}

// =========================================================
// HEADER SCROLL EFFECT
// =========================================================

function initHeader() {
    const header = document.getElementById("header");
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// =========================================================
// SCROLL REVEAL ANIMATIONS
// =========================================================

function initRevealAnimations() {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    
    if (!reveals.length) return;

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => {
        revealObserver.observe(el);
    });
}

// =========================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =========================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// =========================================================
// PARALLAX EFFECTS
// =========================================================

function initParallax() {
    const parallaxElements = document.querySelectorAll("[data-parallax]");
    
    if (!parallaxElements.length) return;

    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });
}

// =========================================================
// MOBILE MENU
// =========================================================

function initMobileMenu() {
    const toggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector(".main-nav");
    
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        toggle.classList.toggle("active");
    });
}

// =========================================================
// PRELOAD IMAGES
// =========================================================

function preloadImages() {
    const metals = ["yg", "rg", "wg", "bg"];
    const stonesA = ["di", "em", "ru", "sa", "lt"];
    const stonesB = ["di", "em", "ru", "sa", "br", "bu"];
    
    metals.forEach(m => {
        stonesA.forEach(a => {
            const img = new Image();
            img.src = `assets/renders/elqan_${m}_${a}_di_1.png`;
        });
    });
}

// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initCustomizer();
    initRevealAnimations();
    initSmoothScroll();
    initParallax();
    initMobileMenu();
    
    setTimeout(preloadImages, 1000);
});

// Add page transition class on load
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
