"use strict";
let isScrolling = false;
const halfScreen = window.innerHeight / 2; /* Sichtbarer Bereich nur / 2 */
let scrollSpeed_Down = 1;
let scrollSpeed_Up = -1;
let isDown = true;
let autoScroll;
const allowImageHover = false;
const resetAutoplay = () => {
    clearInterval(autoScroll);
    isScrolling = false;
    document.body.style.cursor = "default";
};
/* Funktion zur Überprüfung, ob sich der Mauszeiger über einem Link , BIld oder einem Tab-öffnenden Element befindet */
const LinkHover = (target) => {
    if (target instanceof HTMLAnchorElement) {
        // Über einem Anchor-Tag
        return true;
    }
    else if (target instanceof HTMLAreaElement) {
        // Über einem Area-Tag (z. B. für Bild-Maps)
        return true;
    }
    else if (target instanceof HTMLInputElement && target.type === "image") {
        // Über einem Bild-Eingabefeld (z. B. für Bilder, die als Schaltflächen dienen)
        return true;
    }
    else if (target instanceof HTMLImageElement && !allowImageHover) {
        /* Über einem Bild */
        return true;
    }
    return false;
};
window.addEventListener("mousedown", (e) => {
    if (e.button === 1 && !isScrolling && !LinkHover(e.target)) {
        /* Starte Autoscroll */
        isScrolling = true;
        document.body.style.cursor = "all-scroll";
        autoScroll = setInterval(() => {
            if (isDown) {
                window.scrollBy(0, scrollSpeed_Down);
            }
            else if (!isDown) {
                window.scrollBy(0, scrollSpeed_Up);
            }
        }, 1);
    }
    else {
        resetAutoplay();
    }
});
window.addEventListener("mousemove", (e) => {
    /* Cursor ist unten (niedrige Y-Position) */
    if (e.clientY > halfScreen) {
        isDown = true;
    }
    else {
        /* Cursor ist oben (hohe Y-Position) */
        isDown = false;
    }
    if (LinkHover(e.target)) {
        resetAutoplay();
    }
});
