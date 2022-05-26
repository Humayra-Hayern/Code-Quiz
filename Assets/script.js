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
    answers: ["JavaScript", "For loops", "Console.log", "Terminal/Bash"],
    correctAnswer: "Console.log",
  },
];

var questionIndex = -1;
var timeRemaining = 50;

// Function displays 'Time Remaining'.
function updateTimeRemainingEl() {
  timeRemainingEl.textContent = timeRemaining;
}
// Function starts counting down the timer and 'end game' if it reaches 0.
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

// Function starts the quiz and timer begins at the click of the button.
function startQuiz() {
  startQuizBtnEl.classList.add("hide");
  timerEl.classList.remove("hide");
  updateTimeRemainingEl();
  startTimer();
  nextQuestion();
}

// Function checks if User's answer is not the same as the correct answer, if it is incorrect then 10 seconds are deducted from the timer/score.
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

// Function displays next question when an answer is selected from current question.
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

// Function creates ordered list of each answer so that I can specify which answer was clicked.
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

// Function to end game.
function endGame() {
  questionEL.textContent =
    "You finished the quiz! Your final score is " + timeRemaining;
  answersEl.classList.add("hide");
  timerEl.classList.add("hide");
  scoresFormEl.classList.add("show");
  correctEl.classList.add("hide");
  incorrectEl.classList.add("hide");
}

// Creating empty highscores array from localstorage if User has no highscores stored.
var highScores = JSON.parse(localStorage.getItem("highScores"));

if (!highScores) {
  highScores = [];
}
// Function to submit score to the highscores' leaderboard once initials are entered and User clicks 'submit' button.
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

// Function to show highscores leaderboard from highest to lowest.
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

function clearHighScores() {
  localStorage.clear();
  location.reload();
}

function createHighScoreString(highScore) {
  return highScore.userInitials.trim() + " ------------- " + highScore.score;
}

// Runs the startQuiz function when the button is clicked.
startQuizBtnEl.addEventListener("click", startQuiz);
// Runs the nextQuestion function when an answer is clicked.
answersEl.addEventListener("click", nextQuestion);
// Runs the submitScore function when the button is clicked.
submitScoreBtnEl.addEventListener("click", submitScore);
// Runs the showHighScores function when the link is clicked.
highScoresLinkEl.addEventListener("click", showHighScores);
// Runs the clearHighScores function when the link is clicked.
clearHighscoresEl.addEventListener("click", clearHighScores);
