// ---------- IMAGES ----------

const colorImages = [
  { src: "images/deceived_1_sp.jpg" },
  { src: "images/deceived_2_sp.jpg" },
];

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

function buildUrl(relPath) {
  const base = new URL(".", window.location.href);
  return new URL(relPath, base).toString();
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

  const lastImage = sessionStorage.getItem("lastImage") || "";
  const lastTheme = sessionStorage.getItem("lastTheme") || "";

  let chosenUrl = "";
  let themeToApply = "";

  // Avoid repeats: neither image nor theme may match the last ones
  // (we try a few times; with small sets it’s possible to run out, so we cap attempts)
  const MAX_TRIES = 30;

  for (let i = 0; i < MAX_TRIES; i++) {
    const choiceType =
      canPickColor && canPickBW
        ? (Math.random() < 0.5 ? "color" : "bw")
        : (canPickColor ? "color" : "bw");

    if (choiceType === "color") {
      const chosen = pickRandom(colorImages);
      chosenUrl = buildUrl(chosen.src);
      themeToApply = pickRandom(bwOrWThemes); // black/white random each load
    } else {
      const chosen = pickRandom(bwImages);
      chosenUrl = buildUrl(chosen.src);
      themeToApply = pickRandom(bwThemes); // palette random each load
    }

    const imageOk = chosenUrl !== lastImage;
    const themeOk = themeToApply !== lastTheme;

    if (imageOk && themeOk) break;
  }

  clearThemes();
  document.body.classList.add(themeToApply);

  img.onerror = () => console.error("FAILED to load:", chosenUrl);
  img.src = chosenUrl;

  sessionStorage.setItem("lastImage", chosenUrl);
  sessionStorage.setItem("lastTheme", themeToApply);
}

document.addEventListener("DOMContentLoaded", run);
