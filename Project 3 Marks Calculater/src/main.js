const displayAns = document.getElementById("displayAns");
const calculate = document.getElementById("calculate");

const totalMarks = function (event) {
  event.preventDefault();
  let accounts = document.getElementById("accounts");
  let bst = document.getElementById("bst");
  let eco = document.getElementById("eco");
  let eng = document.getElementById("eng");
  accounts = parseInt(accounts.value);
  bst = parseInt(bst.value);
  eco = parseInt(eco.value);
  eng = parseInt(eng.value);
  if (bst && eco && eng && accounts) {
    console.log("clicked");
    const total = accounts + bst + eco + eng;
    const percentage = ((total / 400) * 100).toFixed(2);
    console.log(percentage);
    const statement = `You have got ${total} out of 400 and your persentage is ${percentage}%`;
    displayAns.innerHTML = statement;
  }
};

