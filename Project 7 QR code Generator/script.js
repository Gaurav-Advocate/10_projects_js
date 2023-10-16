const qrImageEl = document.getElementById("qrImage");
const qrInputTextEl = document.getElementById("qrInputText");
const generateBtn = document.getElementById("generateBtn");
const qrContainer = document.getElementById("qrContainer");
const qrFormEl = document.getElementById("qrForm");

const renderQR = (event) => {
  event.preventDefault();
  const Text = qrInputTextEl.value;
  console.log(Text);
  if (Text !== "") {
    try {
      generateBtn.innerText = "Generating QR Code...";
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${Text}`;
      qrImageEl.src = qrCodeUrl;
      setTimeout(() => {
		qrContainer.classList.add("show");
        generateBtn.innerText = "Generate QR Code";
      }, 500);
    } catch (error) {
      console.log(error);
    }
  } else {
    generateBtn.innerText = "Generating QR Code...";
  }
};

const checkEmty = () => {
  const Text = qrInputTextEl.value;
  if (Text === "") {
    qrContainer.classList.remove("show");
  }
};

qrInputTextEl.addEventListener("keyup", checkEmty);

qrFormEl.addEventListener("submit", renderQR);
