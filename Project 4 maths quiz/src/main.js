let questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
let scoreEl = document.getElementById("score");
scoreEl.innerText = localStorage.getItem("score");
let score = +localStorage.getItem("score");
let storedAnswer;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const functionObject = {
  multiplication: () => {
    const num1 = randomNumber(1, 10);
    const num2 = randomNumber(1, 10);
    let question = `Q. What is ${num1} multiplyed by ${num2}`;
    let ans = num1 * num2;
    return { question, ans };
  },
  addition: () => {
    const num1 = randomNumber(1, 10);
    const num2 = randomNumber(1, 10);
    let question = `Q. What is ${num1} add to ${num2}`;
    let ans = num1 + num2;
    return { question, ans };
  },
  subtraction: () => {
    const num1 = randomNumber(1, 10);
    const num2 = randomNumber(1, 10);
    let question = `Q. What is ${num1} subtracted from ${num2}`;
    let ans = num1 - num2;
    return { question, ans };
  },
  division: () => {
    const num1 = randomNumber(1, 10);
    const num2 = randomNumber(1, 10);
    let question = `Q. What is ${num1} divided by ${num2}`;
    let ans = (num1 / num2).toFixed(2);
    return { question, ans };
  },
};

const generateQuestion = () => {
  const randomChoice = randomNumber(1, 4);
  console.log(randomChoice);
  switch (randomChoice) {
    case 1:
      var { question, ans } = functionObject.division();
      return { question, ans };
      break;
    case 2:
      var { question, ans } = functionObject.addition();
      return { question, ans };
      break;
    case 3:
      var { question, ans } = functionObject.subtraction();
      return { question, ans };
      break;
    case 4:
      var { question, ans } = functionObject.multiplication();
      return { question, ans };
      break;
  }
};

const showIn = () => {
  const { question, ans } = generateQuestion();
  questionEl.innerHTML = question;
  storedAnswer = ans;
};
showIn();

const checkAnswer = (event) => {
  const feedWrong = document.getElementById("feedWrong");
  const feedCorrect = document.getElementById("feedCorrect");
  const scoreIn = document.getElementById("scoreIn");
  const scoreInWrong = document.getElementById("scoreInWrong");
  const wrongAnsIn = document.getElementById("wrongAnsIn");

  event.preventDefault();
  const formData = new FormData(questionFormEl);

  const userAnswer = +formData.get("calAns"); // add is to convert it into integer
  if (userAnswer === storedAnswer) {
    score += 1;
    localStorage.setItem("score", score);
    scoreIn.innerText = localStorage.getItem("score");
    feedCorrect.classList.remove("hidden");
    setTimeout(() => {
      feedCorrect.classList.add("hidden");
    }, 3000);
  } else {
    score -= 1;
    wrongAnsIn.innerText = storedAnswer;
    localStorage.setItem("score", score);
    scoreInWrong.innerText = localStorage.getItem("score");
    feedWrong.classList.remove("hidden");
    setTimeout(() => {
      feedWrong.classList.add("hidden");
    }, 3000);
  }
  setTimeout(() => {
    scoreEl.innerText = localStorage.getItem("score");
    event.target.reset();
    showIn();
    console.log("answer", userAnswer);
  }, 3300);
};
