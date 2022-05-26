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
    answers: ["Quotes", "sSquare Brackets", "Parentheses", "Curly Brackets"],
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
    answers: ["Curly Brackets", "Quotes", "Parenthesis", "Commas"],
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
