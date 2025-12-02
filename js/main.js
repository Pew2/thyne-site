/* =========================================================
   THYNE — Ultra Smooth Transition (No Flicker)
   For Transparent PNG Renders
   ========================================================= */

let metal = "wg";
let stoneA = "em";
let stoneB = "di";

function updateRing() {
    const img = document.getElementById("ring-image");

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

    // preload
    const preloader = new Image();
    preloader.onload = () => {
        // fade-in only (no fade-out)
        img.style.transition = "opacity 0.25s ease";
        img.style.opacity = 0;

        setTimeout(() => {
            img.src = preloader.src;
            img.style.opacity = 1;
        }, 10);
    };

    preloader.onerror = () => {
        if (fallbackSrc) {
            preloader.src = fallbackSrc;
        }
    };

    preloader.src = primarySrc;
}

function clearSelected(selector) {
    document.querySelectorAll(selector).forEach(el => el.classList.remove("selected"));
}

function selectMetal(ev) {
    metal = ev.target.dataset.metal;
    clearSelected("[data-metal]");
    ev.target.classList.add("selected");
    updateRing();
}

function selectStoneA(ev) {
    stoneA = ev.target.dataset.stoneA;
    clearSelected("[data-stone-a]");
    ev.target.classList.add("selected");
    updateRing();
}

function selectStoneB(ev) {
    stoneB = ev.target.dataset.stoneB;
    clearSelected("[data-stone-b]");
    ev.target.classList.add("selected");
    updateRing();
}
