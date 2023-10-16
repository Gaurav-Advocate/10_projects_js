const transactionsEl = document.getElementById("transactions");
const earnBtn = document.getElementById("earnBtn");
const expBtn = document.getElementById("expBtn");
const transactionFormEl = document.getElementById("transaction_form");
const show = document.querySelector(".edit")
transactionsEl.innerHTML = "";

const editClassMode = () => {
  const clickOn = document.querySelectorAll(".flex");
  const len = clickOn.length;
  const arrClickOn = Array(len);
  for (var i = 0 ; i != len ; i++) {
    arrClickOn[i] = clickOn[i];
  }

  arrClickOn.forEach((value) => {
    value.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("working");
      const show = value.getElementsByClassName("edit")
      const classes =  show[0].className 
      if (classes !== "edit show") {
        show[0].className = "edit show"
      } else {
        show[0].className = "edit"
      }
      // console.log(show[0].nextElementSibling)
    })
  })
}

function totalBal() {
  const totalBalShow = document.querySelector("#totalBalShow");
  const debitEl = document.querySelector("#expBtnAmount").innerHTML;
  const creditEl = document.querySelector("#earnBtnAmount").innerHTML;

  const value = { debitEl, creditEl };
  const debit = value.debitEl.split("₹");
  const credit = value.creditEl.split("₹");

  const net = credit[1] - debit[1];
  totalBalShow.innerHTML = `₹ ${net}`;
}

totalBal();

const entryEarn = (event) => {
  event.preventDefault();

  const entryOnBtn = (entry, preAmount) => {
    transactionsEl.innerHTML += entry;
    const preAmountInt = parseInt(preAmount[1]);
    earnBtn.innerHTML = `<p id="earnBtnAmount">₹${amountEl + preAmountInt}</p>
  <p>Expense</p>`;
    totalBal();
    editClassMode()
  };

  let textEl = document.getElementById("text").value;
  let amountEl = document.getElementById("amount").value;

  if (amountEl !== "") {
    amountEl = parseInt(amountEl);
  }

  console.log({ textEl, amountEl });

  let earnBtnAmount = document.getElementById("earnBtnAmount").innerHTML;
  earnBtnAmount = earnBtnAmount.split("₹");

  if (textEl === "") {
    textEl = "undefined";
  }
  if (amountEl === "") {
    amountEl = 0;
  }

  const entry = `<div class="flex">
  <div class="transaction">
    <div class="left">
    <p>${textEl}</p>
    <p>+ ₹ ${amountEl}</p>
    </div>
    <div class="status credit">C</div>
  </div>
  <div class="edit">
    <img src="./pen.svg" alt="" />
    <img src="./trash.svg" alt="" />
  </div>
</div>`;

  entryOnBtn(entry, earnBtnAmount);
  transactionFormEl.reset();
};

const entryExp = (event) => {
  event.preventDefault();

  const entryOnBtn = (entry, preAmount) => {
    transactionsEl.innerHTML += entry;
    const preAmountInt = parseInt(preAmount[1]);
    expBtn.innerHTML = `<p id="expBtnAmount">₹${amountEl + preAmountInt}</p>
  <p>Expense</p>`;
    totalBal();
    editClassMode()
  };

  let textEl = document.getElementById("text").value;
  let amountEl = document.getElementById("amount").value;

  if (amountEl !== "") {
    amountEl = parseInt(amountEl);
  }

  console.log({ textEl, amountEl });

  let expBtnAmount = document.getElementById("expBtnAmount").innerHTML;
  expBtnAmount = expBtnAmount.split("₹");

  if (textEl === "") {
    textEl = "undefined";
  }
  if (amountEl === "") {
    amountEl = 0;
  }

  const entry = `<div class="flex">
  <div class="transaction">
    <div class="left">
    <p>${textEl}</p>
    <p>- ₹ ${amountEl}</p>
    </div>
    <div class="status debit">D</div>
  </div>
  <div class="edit">
    <img src="./pen.svg" alt="" />
    <img src="./trash.svg" alt="" />
  </div>
</div>`;

  entryOnBtn(entry, expBtnAmount);
  transactionFormEl.reset();
};

expBtn.addEventListener("click", entryExp);
earnBtn.addEventListener("click", entryEarn);
