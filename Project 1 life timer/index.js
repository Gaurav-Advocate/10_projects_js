const settingCogEl = document.getElementById("settingIcon");
const toggle = document.getElementById("changeTo");
const inputDate = document.getElementById("inputDate");
const submitDate = document.getElementById("submitDate");

let inputDOB;
const headingAfterDOB = document.getElementById("headingAfterDOB");
const initialHeading = document.getElementById("initialHeading");
const yearEL = document.getElementById("year");
const monthEL = document.getElementById("month");
const dayEL = document.getElementById("day");
const hourEL = document.getElementById("hour");
const minuteEL = document.getElementById("minute");
const secondEL = document.getElementById("second");

const makeTwoDigitNumber = (number) => {
  return number > 9 ? number : `0${number}`;
};

const settingsToggle = () => {
  if (toggle.classList[1] === "hide") {
    toggle.classList.remove("hide");
  } else {
    toggle.classList.add("hide");
  }
};

const whtTimerSet = (dateDiff) => {
  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
  const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
  const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
  const minute = Math.floor(dateDiff / (1000 * 60)) % 60;
  const second = Math.floor(dateDiff / 1000) % 60;

  yearEL.innerHTML = makeTwoDigitNumber(year);
  monthEL.innerHTML = makeTwoDigitNumber(month);
  dayEL.innerHTML = makeTwoDigitNumber(day);
  hourEL.innerHTML = makeTwoDigitNumber(hour);
  minuteEL.innerHTML = makeTwoDigitNumber(minute);
  secondEL.innerHTML = makeTwoDigitNumber(second);
};

const returnTimeEL = (inputDOB) => {
  const nowDate = new Date();

  if (nowDate > inputDOB) {
    const dateDiff = nowDate - inputDOB;
    whtTimerSet(dateDiff);
  } else if (nowDate < inputDOB) {
    const dateDiff = inputDOB - nowDate;
    whtTimerSet(dateDiff);
  }
};

const localStorageStoring = () => {
  const years = localStorage.getItem("years");
  const months = localStorage.getItem("months");
  const days = localStorage.getItem("days");
  const hours = localStorage.getItem("hours");
  const minutes = localStorage.getItem("minutes");
  const seconds = localStorage.getItem("seconds");
  if (years && months && days) {
    inputDOB = new Date(years, months, days, hours, minutes, seconds);
    initialHeading.classList.add("hide");
    headingAfterDOB.classList.remove("hide");
    setInterval(() => {
      returnTimeEL(inputDOB);
    }, 1000);
  }
};

localStorageStoring();

const enterInDate = () => {
  const datew = inputDate.value;
  inputDOB = datew ? new Date(datew) : null;

  if (inputDOB) {
    localStorage.setItem("years", inputDOB.getFullYear());
    localStorage.setItem("months", inputDOB.getMonth());
    localStorage.setItem("days", inputDOB.getDate());
    localStorage.setItem("hours", inputDOB.getHours());
    localStorage.setItem("minutes", inputDOB.getMinutes());
    localStorage.setItem("seconds", inputDOB.getSeconds());

    initialHeading.classList.add("hide");
    headingAfterDOB.classList.remove("hide");
    setInterval(() => {
      returnTimeEL(inputDOB);
    }, 1000);
  } else {
    initialHeading.classList.remove("hide");
    headingAfterDOB.classList.add("hide");
  }
};

settingCogEl.addEventListener("click", settingsToggle);
submitDate.addEventListener("click", enterInDate);
