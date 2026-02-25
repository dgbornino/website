// ---------- EDIT THESE LISTS ----------

// 1) Color images: each one picks ONLY black or white background (you decide per image)
const colorImages = [
  { src: "images/deceived_1_sp.jpg", bg: "#000000" }, // black
  { src: "images/deceived_2_sp.jpg", bg: "#ffffff" }, // white
  // add more: { src: "images/color-3.jpg", bg: "#000000" },
];

// 2) B&W images: background is RANDOM, chosen from the palette below
const bwImages = [
  { src: "images/sdl_1.jpg" },
  { src: "images/sdl_2.jpg" },
  { src: "images/tdftww_1.jpg" },
  { src: "images/tdftww_2.jpg" },
  { src: "images/tdftww_3.jpg" },
  // add more: { src: "images/bw-3.jpg" },
];

// Choose the ONLY colors you allow for B&W backgrounds:
const bwBackgroundPalette = [
  "#ff3b30",
  "#34c759",
  "#007aff",
  "#ffcc00",
  "#af52de"
];

// ---------- NO NEED TO EDIT BELOW (unless you want to) ----------

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function setTextColorForBackground(bg) {
  // crude but effective: decide white/black text based on background brightness
  // supports #rgb or #rrggbb
  let hex = bg.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const r = parseInt(hex.slice(0,2), 16);
  const g = parseInt(hex.slice(2,4), 16);
  const b = parseInt(hex.slice(4,6), 16);
  const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
  document.body.style.color = luminance > 0.6 ? "#000" : "#fff";
}

function run() {
  // Year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Decide if we pick a color image or a bw image (50/50 if both exist)
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
    // nothing configured
    document.body.style.background = "#111";
    return;
  }

  let chosen;
  let bg;

  if (choiceType === "color") {
    chosen = pickRandom(colorImages);
    bg = chosen.bg; // must be black or white (your rule)
  } else {
    chosen = pickRandom(bwImages);
    bg = pickRandom(bwBackgroundPalette); // random allowed color
  }

  document.body.style.background = bg;
  setTextColorForBackground(bg);

  const img = document.getElementById("heroImage");
  img.src = chosen.src;
}


run();
