var startQuizBtnEl = document.getElementById("startQuizBtn");
var questionEL = document.getElementById("question");
var answersEl = document.getElementById("answers");
var timeRemainingEl = document.getElementById("timeRemaining");
var timerEl = document.getElementById("timer");
var scoresFormEl = document.getElementById("scoresForm");
var submitScoreBtnEl = document.getElementById("submitScoreBtn");
var initialsInput = document.getElementById("initials");
var highScoresLinkEl = document.getElementById("highscores");
var highScoresCont = document.getElementById("highscoresContainer");
var backToStartEl = document.getElementById("refreshBtn");
var clearHighscoresEl = document.getElementById("clearBtn");
var containerEl = document.getElementById("container");
var correctEl = document.getElementById("correct");
var incorrectEl = document.getElementById("incorrect");

var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["Booleans", "Strings", "Numbers", "Alerts"],
    correctAnswer: "Alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within ____.",
    answers: ["Quotes", "Square Brackets", "Parentheses", "Curly Brackets"],
    correctAnswer: "Parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "Booleans",
      "Numbers & Strings",
      "Other Arrays",
      "All of the above",
    ],
    correctAnswer: "All of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["Curly Brackets", "Quotes", "Parentheses", "Commas"],
    correctAnswer: "Quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "For Loops", "Console.log", "Terminal/Bash"],
    correctAnswer: "Console.log",
  },
];

var questionIndex = -1;
var timeRemaining = 50;

// ADD
function updateTimeRemainingEl() {
  timeRemainingEl.textContent = timeRemaining;
}
// ADD
function startTimer() {
  var timer = setInterval(function () {
    if (questionIndex >= questions.length) {
      clearInterval(timer);
    }
    if (timeRemaining <= 0) {
      timeRemaining = 0;
      endGame();
      clearInterval(timer);
    }
    timeRemaining--;
    updateTimeRemainingEl();
  }, 1000);
}

// ADD
function startQuiz() {
  startQuizBtnEl.classList.add("hide");
  timerEl.classList.remove("hide");
  updateTimeRemainingEl();
  startTimer();
  nextQuestion();
}

// ADD
function checkAnswer(userAnswer) {
  var correctAnswer = questions[questionIndex].correctAnswer;
  console.log(correctAnswer);
  if (userAnswer != correctAnswer) {
    if (timeRemaining > 10) {
      timeRemaining -= 10;
    } else {
      timeRemaining = 0;
    }
    updateTimeRemainingEl();
    incorrectEl.classList.remove("hide");
    correctEl.classList.add("hide");
  } else {
    incorrectEl.classList.add("hide");
    correctEl.classList.remove("hide");
  }
}

// ADD
function nextQuestion(event) {
  if (event) {
    var userChoice = event.target.textContent;
    checkAnswer(userChoice);
  }
  questionIndex++;
  if (questionIndex >= questions.length) {
    endGame();
    return;
  }
  var currentQuestion = questions[questionIndex];
  questionEL.textContent = currentQuestion.question;
  updateAnswersUi();
}

// ADD
function updateAnswersUi() {
  answersEl.innerHTML = "";
  var orderedList = document.createElement("ol");
  var currentAnswers = questions[questionIndex].answers;
  for (var i = 0; i < currentAnswers.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = currentAnswers[i];
    orderedList.append(listItem);
  }
  answersEl.append(orderedList);
}

// ADD
function endGame() {
  questionEL.textContent =
    "You finished the quiz! Your final score is" + timeRemaining;
  answersEl.classList.add("hide");
  timerEl.classList.add("hide");
  scoresFormEl.classList.add("show");
  correctEl.classList.add("hide");
  incorrectEl.classList.add("hide");
}

// ADD
var highScores = JSON.parse(localStorage.getItem("highScores"));

if (!highScores) {
  highScores = [];
}
// ADD
function submitScore(event) {
  event.preventDefault();
  if (!initialsInput.value) {
    alert("Please enter your initials");
    return;
  }
  questionEL.textContent = "";
  scoresFormEl.classList.remove("show");
  var userScore = {
    userInitials: initialsInput.value,
    score: (timeRemaining += 1),
  };

  highScores.push(userScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  showHighScores();
}

// ADD
function showHighScores() {
  highScoresCont.classList.remove("hide");
  highScoresCont.innerHTML = "";
  timerEl.innerHTML = "";
  timeRemainingEl.innerHTML = "";
  answersEl.innerHTML = "";
  questionEL.innerHTML = "";
  highScoresLinkEl.classList.add("hide");
  startQuizBtnEl.classList.add("hide");
  backToStartEl.classList.remove("hide");
  clearHighscoresEl.classList.remove("hide");
  containerEl.classList.add("hide");
  function scoreSorting(a, b) {
    return b.score - a.score;
  }
  highScores.sort(scoreSorting);
  var highscoresTitle = document.createElement("h2");
  highscoresTitle.textContent = "Highscores";
  highScoresCont.append(highscoresTitle);
  var orderedList = document.createElement("ol");
  for (var i = 0; i < highScores.length && i < 10; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = createHighScoreString(highScores[i]);
    orderedList.append(listItem);
  }
  highScoresCont.append(orderedList);
}

// ADD
function clearHighScores() {
  localStorage.clear();
  location.reload();
}

// ADD
function createHighScoreString(highScore) {
  return highScore.userInitials.trim() + " ------------- " + highScore.score;
}

// ADD
startQuizBtnEl.addEventListener("click", startQuiz);
// ADD
answersEl.addEventListener("click", nextQuestion);
// ADD
submitScoreBtnEl.addEventListener("click", submitScore);
// ADD
highScoresLinkEl.addEventListener("click", showHighScores);
// ADD
clearHighscoresEl.addEventListener("click", clearHighScores);
