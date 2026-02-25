// ---------- IMAGES ----------

// Color images: always black or white background (mapped to CSS themes)
const colorImages = [
  { src: "images/deceived_1_sp.jpg", theme: "theme-black" },
  { src: "images/deceived_2_sp.jpg", theme: "theme-white" },
];

// B&W images: random theme from your chosen palette
const bwImages = [
  { src: "images/sdl_1.jpg" },
  { src: "images/sdl_2.jpg" },
  { src: "images/tdftww_1.jpg" },
  { src: "images/tdftww_2.jpg" },
  { src: "images/tdftww_3.jpg" },
];

// Must match CSS theme class names
const bwThemes = ["theme-red", "theme-green", "theme-blue", "theme-yellow", "theme-purple"];
const allThemes = ["theme-black", "theme-white", ...bwThemes];

// ---------- HELPERS ----------

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clearThemes() {
  document.body.classList.remove(...allThemes);
}

// ---------- MAIN ----------

function run() {
  const img = document.getElementById("heroImage");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (!img) return;

  const canPickColor = colorImages.length > 0;
  const canPickBW = bwImages.length > 0;

  if (!canPickColor && !canPickBW) return;

  // Decide which set we pick from
  const choiceType =
    canPickColor && canPickBW ? (Math.random() < 0.5 ? "color" : "bw") : (canPickColor ? "color" : "bw");

  clearThemes();

  let chosen;
  let themeToApply;

  if (choiceType === "color") {
    chosen = pickRandom(colorImages);
    themeToApply = chosen.theme; // theme-black or theme-white
  } else {
    chosen = pickRandom(bwImages);
    themeToApply = pickRandom(bwThemes);
  }

  document.body.classList.add(themeToApply);

  // Build a correct URL regardless of /website/ path or custom domain later
  const base = new URL(".", window.location.href);
  const finalUrl = new URL(chosen.src, base).toString();

  img.onerror = () => console.error("FAILED to load:", finalUrl);
  img.src = finalUrl;
}

document.addEventListener("DOMContentLoaded", run);
