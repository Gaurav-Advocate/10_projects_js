const transactionsEl = document.getElementById("transactions");
const earnBtn = document.getElementById("earnBtn");
const expBtn = document.getElementById("expBtn");
const transactionFormEl = document.getElementById("transaction_form");
const show = document.querySelector(".edit");
transactionsEl.innerHTML = "";

const entryOnBtnEarnAfterEdit = () => {
  let amountEl = document.getElementById("amount").value;
  let earnBtnAmount = document.getElementById("earnBtnAmount").innerHTML;
  earnBtnAmount = earnBtnAmount.split("₹");
  const preAmountInt = parseInt(earnBtnAmount[1]);
  console.log(amountEl, preAmountInt);
  earnBtn.innerHTML = `<p id="earnBtnAmount">₹${preAmountInt - amountEl}</p>
  <p>Expense</p>`;
  totalBal();
};

const entryOnBtnExpAfterEdit = () => {
  let amountEl = document.getElementById("amount").value;
  let expBtnAmount = document.getElementById("expBtnAmount").innerHTML;
  expBtnAmount = expBtnAmount.split("₹");
  const preAmountInt = parseInt(expBtnAmount[1]);
  expBtn.innerHTML = `<p id="expBtnAmount">₹${preAmountInt - amountEl}</p>
  <p>Expense</p>`;
  totalBal();
};

const deleteTransection = (trs) => {
  trs.parentElement.parentElement.outerHTML = "";
};

const editTransection = (text, amount) => {
  const textInput = document.querySelector("#text");
  const amountInput = document.querySelector("#amount");
  textInput.value = text;
  amountInput.value = amount;
};

const editClassMode = () => {
  const clickOn = document.querySelectorAll(".transaction");
  const len = clickOn.length;
  const arrClickOn = Array(len);
  for (var i = 0; i != len; i++) {
    arrClickOn[i] = clickOn[i];
  }

  arrClickOn.forEach((value) => {
    value.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("working");
      const show = value.nextElementSibling;
      const classes = show.className;
      if (classes !== "edit show") {
        show.className = "edit show";
      } else {
        show.className = "edit";
      }
      //   pen.addEventListener(("click"), editTransection)
    });
    const trash = value.nextElementSibling.childNodes[3];
    trash.addEventListener("click", () => {
      console.log("deleted");
      const type = value.childNodes[3].innerHTML;
      const text = value.childNodes[1].childNodes[1].innerHTML;
      const amount = value.childNodes[1].childNodes[3].innerHTML.split(" ")[2];
      editTransection(text, amount)
      deleteTransection(trash);
      type === "D" ? entryOnBtnExpAfterEdit() : entryOnBtnEarnAfterEdit();
      transactionFormEl.reset()
    });
    const pen = value.nextElementSibling.childNodes[1];
    pen.addEventListener("click", () => {
      console.log("On Editing Mode");
      const text = value.childNodes[1].childNodes[1].innerHTML;
      const amount = value.childNodes[1].childNodes[3].innerHTML.split(" ")[2];
      const type = value.childNodes[3].innerHTML;
      editTransection(text, amount);
      deleteTransection(pen);
      type === "D" ? entryOnBtnExpAfterEdit() : entryOnBtnEarnAfterEdit();
    });
  });
};

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

  const entryOnBtn = (preAmount) => {
    const preAmountInt = parseInt(preAmount[1]);
    earnBtn.innerHTML = `<p id="earnBtnAmount">₹${amountEl + preAmountInt}</p>
  <p>Expense</p>`;
    totalBal();
    editClassMode();
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

  transactionsEl.innerHTML += entry;
  entryOnBtn(earnBtnAmount);
  transactionFormEl.reset();
};

const entryExp = (event) => {
  event.preventDefault();

  const entryOnBtn = (preAmount) => {
    const preAmountInt = parseInt(preAmount[1]);
    expBtn.innerHTML = `<p id="expBtnAmount">₹${amountEl + preAmountInt}</p>
  <p>Expense</p>`;
    totalBal();
    editClassMode();
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
  transactionsEl.innerHTML += entry;
  entryOnBtn(expBtnAmount);
  transactionFormEl.reset();
};

expBtn.addEventListener("click", entryExp);
earnBtn.addEventListener("click", entryEarn);
