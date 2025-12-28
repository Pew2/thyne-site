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
        document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking links
    nav.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            toggle.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
}

// =========================================================
// JOURNAL EXPANSION
// =========================================================

function initJournal() {
    const journalGrid = document.querySelector(".articles-grid");
    if (!journalGrid) return;

    journalGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".article-card");
        if (!card) return;

        // If it's already expanded, we might want to toggle or do nothing
        // For now, let's implement a simple inline expansion
        const existingDetail = card.querySelector(".article-detail");
        
        if (existingDetail) {
            existingDetail.remove();
            card.classList.remove("expanded");
            return;
        }

        // Close others
        document.querySelectorAll(".article-detail").forEach(el => el.remove());
        document.querySelectorAll(".article-card.expanded").forEach(el => el.classList.remove("expanded"));

        const title = card.querySelector("h3").textContent;
        const category = card.querySelector(".article-category").textContent;
        
        const detail = document.createElement("div");
        detail.className = "article-detail reveal";
        detail.innerHTML = `
            <div class="detail-content">
                <h2 class="heading-lg">${title}</h2>
                <p class="subheading">${category}</p>
                <div class="body-md text-muted">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Donec vehicula cursus purus. Mauris ut tellus. Sed non quam. Suspendisse potenti.</p>
                    <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante.</p>
                </div>
                <button class="btn secondary mt-md close-detail">Close Article</button>
            </div>
        `;
        
        card.appendChild(detail);
        card.classList.add("expanded");
        
        detail.querySelector(".close-detail").addEventListener("click", (e) => {
            e.stopPropagation();
            detail.remove();
            card.classList.remove("expanded");
        });

        // Trigger reveal
        setTimeout(() => detail.classList.add("visible"), 10);
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
    initJournal();
    
    setTimeout(preloadImages, 1000);
});

// Add page transition class on load
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
