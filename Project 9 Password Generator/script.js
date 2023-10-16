let passlength = 8;
let isUpperCase = false;
let isNumbers = false;
let isSymbols = false;

const passwordEl = document.getElementById("password");
const passRangeValueEl = document.getElementById("passRangeValue");
const passRangeInputEl = document.getElementById("passRangeInput");
const genBtnEl = document.getElementById("genBtn");

passRangeInputEl.addEventListener("input", (e) => {
  passlength = +e.target.value;
  passRangeValueEl.innerText = passlength;
});

const generatePass = (passLength) => {
  let password = "";

  isUpperCase = document.getElementById("uppercase").checked;
  isNumbers = document.getElementById("numbers").checked;
  isSymbols = document.getElementById("symbols").checked;

  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = isUpperCase
    ? "abcdefghijklmnopqrstuvwxyz".toUpperCase()
    : "";
  const numbers = isNumbers ? "0123456789" : "";
  const symbols = isSymbols ? "!@#$%^&*()_+" : "";

  let passwordIter = lowerCase + upperCase + numbers + symbols;
  for (let i = 0; i < passLength; i++) {
    password += passwordIter[Math.floor(Math.random() * passwordIter.length)];
  }
  console.log("password", password);
  return password;
};

genBtnEl.addEventListener("click", () => {
  const passwordShow  = generatePass(passlength);
  passwordEl.innerHTML = passwordShow;
});

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text)
        alert("Copyed to clipboard")
    } catch (error) {
    alert ("error", error)
    }
}
passwordEl.addEventListener("click", () => copyToClipboard(passwordEl.innerHTML))
