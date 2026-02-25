// ---------- IMAGES ----------

// 1) Color images: each one picks ONLY black or white background
// (We map these to CSS themes for background + text contrast.)
const colorImages = [
  { src: "images/deceived_1_sp.jpg", theme: "theme-black" },
  { src: "images/deceived_2_sp.jpg", theme: "theme-white" },
];

// 2) B&W images: background is RANDOM (from the palette below)
const bwImages = [
  { src: "images/sdl_1.jpg" },
  { src: "images/sdl_2.jpg" },
  { src: "images/tdftww_1.jpg" },
  { src: "images/tdftww_2.jpg" },
  { src: "images/tdftww_3.jpg" },
];

// B&W background themes (must match CSS classes)
const bwThemes = [
  "theme-red",
  "theme-green",
  "theme-blue",
  "theme-yellow",
  "theme-purple",
];

// ---------- HELPERS ----------

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clearThemes() {
  // Remove any previously set theme classes (safe even if not present)
  const allThemes = [
    "theme-black",
    "theme-white",
    "theme-red",
    "theme-green",
    "theme-blue",
    "theme-yellow",
    "theme-purple",
  ];
  document.body.classList.remove(...allThemes);
}

// ---------- MAIN ----------

function run() {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const img = document.getElementById("heroImage");
  if (!img) return;

  const canPickColor = colorImages.length > 0;
  const canPickBW = bwImages.length > 0;

  let choiceType;
  if (canPickColor && canPickBW) {
    choiceType = Math.random() < 0.5 ? "color" : "bw";
  } else if (canPickColor) {
    choiceType = "color";
  } else if (canPickBW) {
    choiceType = "bw";
  } else {
    return;
  }

  clearThemes();

  let chosen;
  let themeToApply;

  if (choiceType === "color") {
    chosen = pickRandom(colorImages);
    themeToApply = chosen.theme; // theme-black or theme-white
  } else {
    chosen = pickRandom(bwImages);
    themeToApply = pickRandom(bwThemes); // one of your chosen color themes
  }

  // Apply background + text contrast via CSS theme class
  document.body.classList.add(themeToApply);

  // Robust URL building (works on /website/ and on your custom domain later)
  const base = new URL(".", window.location.href);
  img.src = new URL(chosen.src, base).toString();

  // Optional: show error in console if any image fails to load
  img.onerror = () => console.error("FAILED to load:", img.src);
}

run();
