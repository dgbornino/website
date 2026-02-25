// ---------- IMAGES ----------

// Color images: background randomly black OR white each load
const colorImages = [
  { src: "images/deceived_1_sp.jpg" },
  { src: "images/deceived_2_sp.jpg" },
];

// B&W images: background randomly chosen from palette each load
const bwImages = [
  { src: "images/sdl_1.jpg" },
  { src: "images/sdl_2.jpg" },
  { src: "images/tdftww_1.jpg" },
  { src: "images/tdftww_2.jpg" },
  { src: "images/tdftww_3.jpg" },
];

// Theme classes (must exist in CSS)
const bwThemes = ["theme-red", "theme-green", "theme-blue", "theme-yellow", "theme-purple"];
const bwOrWThemes = ["theme-black", "theme-white"];
const allThemes = [...bwThemes, ...bwOrWThemes];

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

  // Pick which group (50/50 if both exist)
  const choiceType =
    canPickColor && canPickBW ? (Math.random() < 0.5 ? "color" : "bw") : (canPickColor ? "color" : "bw");

  clearThemes();

  let chosen;
  let themeToApply;

  if (choiceType === "color") {
    chosen = pickRandom(colorImages);
    themeToApply = pickRandom(bwOrWThemes); // random black or white EACH load
  } else {
    chosen = pickRandom(bwImages);
    themeToApply = pickRandom(bwThemes); // random palette color EACH load
  }

  document.body.classList.add(themeToApply);

  // Robust URL building (works on /website/ and custom domain later)
  const base = new URL(".", window.location.href);
  const finalUrl = new URL(chosen.src, base).toString();

  img.onerror = () => console.error("FAILED to load:", finalUrl);
  img.src = finalUrl;
}

document.addEventListener("DOMContentLoaded", run);
