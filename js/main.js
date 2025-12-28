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

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isActive = nav.classList.toggle("active");
        toggle.classList.toggle("active");
        document.body.classList.toggle("menu-open");
        toggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking links
    nav.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            toggle.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !toggle.contains(e.target)) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// =========================================================
// JOURNAL EXPANSION
// =========================================================

function initJournal() {
    const journalGrid = document.querySelector(".articles-grid");
    if (!journalGrid) return;

    // Use event delegation for Read Article buttons
    document.addEventListener("click", (e) => {
        const readBtn = e.target.closest(".btn-read-article");
        if (readBtn) {
            e.preventDefault();
            const card = readBtn.closest(".article-card");
            if (card) {
                expandCard(card);
            }
        }
    });

    function expandCard(card) {
        // If it's already expanded, close it
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
                    <p>At THYNE, we believe that jewellery should be as unique as the individual wearing it. This piece explores the intersection of traditional craftsmanship and modern personalisation techniques.</p>
                    <p>Our design philosophy is rooted in the idea of "Quiet Luxury" — where the value lies in the details that only the wearer truly knows. Whether it's a specific stone choice that holds personal meaning or a custom engraving that tells a story, every element is considered.</p>
                    <p>In this collection, we've focused on fluid lines and ergonomic shapes that feel natural against the skin. We use only the finest materials, from ethically sourced stones to high-purity metals, ensuring that your personalised piece remains a timeless treasure for generations to come.</p>
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
        
        // Scroll to the card
        const headerOffset = 100;
        const elementPosition = card.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
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
