const generateBtn = document.getElementById("generateBtn");

const hexValue = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hex.length);
    hexColor += hex[randomIndex];
  }
  return hexColor;
};

const colorPaletteGenrator = () => {
  const HexColorArray = [];
  for (let i = 0; i < 4; i++) {
    HexColorArray.push(hexValue());
  }
  return HexColorArray;
};

const renderColorPaltter = () => {
  const storeColorsEl = document.querySelector(".colors_container");
  storeColorsEl.innerHTML = "";
  const colors = colorPaletteGenrator();
  colors.forEach((color, i) => {
    const palette = `<div id="color${
      i + 1
    }" class="colorBox" style='background-color:${color};'>
        <p class="copy">${color}</p>
        </div>`;
    storeColorsEl.innerHTML += palette;
  });
  const copyToClipboard = async (paraEl) => {
    const text = paraEl.innerHTML;
    try {
      await navigator.clipboard.writeText(text);
      alert("coppied to cilpboard");
    } catch (error) {
      alert("not coppied", error);
    }
  };
  const paraEls = document.querySelectorAll(".copy");
  paraEls.forEach((paraEl) => {
    paraEl.addEventListener("click", () => copyToClipboard(paraEl));
  });
};
renderColorPaltter();

generateBtn.addEventListener("click", renderColorPaltter);
