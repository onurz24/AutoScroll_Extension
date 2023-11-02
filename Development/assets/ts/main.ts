let isScrolling: boolean = false;
const halfScreen: number = window.innerHeight / 2; /* Sichtbarer Bereich nur / 2 */
const scrollSpeed_Down: number = 1;
const scrollSpeed_Up: number = -1;
let isDown: boolean = true;
let autoScroll: number;
const allowImageHover: boolean = false;
const resetAutoplay = (): void => {
  clearInterval(autoScroll);
  isScrolling = false;
  document.body.style.cursor = "default";
};

/* Funktion zur Überprüfung, ob sich der Mauszeiger über einem Link oder einem neuen Tab-öffnenden Element befindet */
const LinkHover = (target: EventTarget | null): boolean => {
  if (target instanceof HTMLAnchorElement) {
    // Über einem Anchor-Tag
    return true;
  } else if (target instanceof HTMLAreaElement) {
    // Über einem Area-Tag (z. B. für Bild-Maps)
    return true;
  } else if (target instanceof HTMLInputElement && target.type === "image") {
    // Über einem Bild-Eingabefeld (z. B. für Bilder, die als Schaltflächen dienen)
    return true;
  } else if (target instanceof HTMLImageElement && !allowImageHover) {
    /* Über einem Bild */
    return true;
  }
  return false;
};

window.addEventListener("mousedown", (e: MouseEvent) => {
  if (e.button === 1 && !isScrolling && !LinkHover(e.target)) {
    /* Starte Autoscroll */
    isScrolling = true;
   /* document.body.style.cursor = "all-scroll"; */

    autoScroll = setInterval(() => {
      /* Remove this if not working */
    isDown ?  document.body.style.cursor = 'url("./assets/images/scrolldown.png"), all-scroll': document.body.style.cursor = 'url("./assets/images/scrollup.png"), all-scroll';

      if (isDown) {
        window.scrollBy(0, scrollSpeed_Down);
      } else if (!isDown) {
        window.scrollBy(0, scrollSpeed_Up);
      }
    }, 1);
  } else {
    resetAutoplay();
  }
});

window.addEventListener("mousemove", (e: MouseEvent) => {
  /* Cursor ist unten (niedrige Y-Position) */
  if (e.clientY > halfScreen) {
    isDown = true;
  } else {
    /* Cursor ist oben (hohe Y-Position) */
    isDown = false;
  }
  if (LinkHover(e.target)) {
    resetAutoplay();
  }
});
