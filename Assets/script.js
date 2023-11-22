let questions = [
  {
    title: "Which HTML element do we put the Javascript in?",
    choices: ["<js>", "<div>", "<style>", "<script>"],
    answer: "<script>"
  },
  {
    title: "Indicate the correct place to insert a Javascript.",
    choices: ["The <body> section", "The <foot> section", "The <head> section", "Either <head> section or <body> section"],
    answer: "Either <head> section or <body> section"
  },
  {
    title: "Which number represents the third index in an array?",
    choices: ["0", "3", "2", "4"],
    answer: "2"
  },
  {
    title: "Indicate the Complex Data Type.",
    choices: ["Boolean", "Number", "Object", "String"],
    answer: "Object"
  },
  {
    title: "Which comparison operator checks for strict equality?",
    choices: ["==", "===", "=", "!=="],
    answer: "==="
  },
  {
    title: "What do Objects include?",
    choices: ["Molecules", "Attributes", "Physicality", "Properties"],
    answer: "Properties"
  },
  {
    title: "Which of these indicate an array?",
    choices: ["( )", "< >", "[ ]", "{ }"],
    answer: "[ ]"
  },
  {
    title: "How do you call upon a function named myFunction?",
    choices: ["<call myFunction>", "myFunction.call", "myFunction.run", "myFunction()"],
    answer: "myFunction()"
  },
  {
    title: "|| is considered a _______.",
    choices: ["COMPARISON operator", "LOGICAL operator", "OR operator", "All of the above"],
    answer: "OR operator"
  },
  {
    title: "How does one execute a loop within Javascript?",
    choices: ["loop", "javascript.loop", "for", "for.loop"],
    answer: "for"
  }
];

// list of variables used on page
let choicesContent = document.querySelector("#multipleChoice");
let startMenu = document.getElementById('quizDesc');
let questionHeading = document.getElementById('headingQuiz');
let gameClock = document.getElementById('timer');
let enterInitialsMenu = document.getElementById('enterInitialsForm');
let enterInitialsBtn = document.getElementById('submitButton');
let scoresMenu = document.getElementById('rankingList');
let backToStartLink = document.getElementById('startLink');
let viewHighScoresLink = document.getElementById('scoreBoardLink');
let questionNumber = 0;

// questions array variable - used in functions
let numberOfQuestions = questions.length;
let questionChoices = questions[questionNumber].choices;

// game time set to 100 seconds
let gameTimer = 100;
let finalScore;
let highScores = [];

// checks for existing highscores in localstorage
renderHighScores()

function renderHighScores() {
  let savedHighScores = localStorage.getItem("high scores");
  if (savedHighScores === null) {
    return;
  }
  let objectScores = JSON.parse(savedHighScores);
  highScores = objectScores;
}

//start button function
function startQuiz() {
  //default start menu display hidden
  startMenu.setAttribute("style", "display: none;");
  scoresMenu.setAttribute("style", "display: none;");
  choicesContent.setAttribute("style", "display: block");
  enterInitialsMenu.setAttribute("style", "display: none;");
  choicesContent.innerHTML = " ";
  viewHighScoresLink.setAttribute("style", "display: none;");

  //calling to start countdown
  countdownClock();

  // h1 will show question and mulitple choice will be buttons below
  questionHeading.textContent = questions[questionNumber].title;
  listChoices();
}

function listChoices() {
  // loops through multiple choice answers within the question array index
  for (let i = 0; i < questionChoices.length; i++) {
    // Create, build, and place the available choices
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "btn btn-dark btn-sm d-block my-2 choice-btn");
    choiceBtn.setAttribute("id", "choice-" + i);
    choiceBtn.textContent = questions[questionNumber].choices[i];
    choicesContent.appendChild(choiceBtn);

  }
}

// end user notified of correct answer
function correctAnswer() {
  let correctNotify = document.createElement("div");
  correctNotify.setAttribute("class", "border-top mt-3 pt-3")
  correctNotify.setAttribute("style", "font-size: 12px; color: green; font-weight: bold;");
  correctNotify.textContent = "You got the answer right!";
  choicesContent.appendChild(correctNotify);
}

// end user notified of wrong answer
function incorrectAnswer() {
  let incorrectNotify = document.createElement("div");
  incorrectNotify.setAttribute("class", "border-top mt-3 pt-3"); incorrectNotify.setAttribute("style", "font-size: 12px; color: red; font-weight: bold;");
  incorrectNotify.textContent = "You got the answer wrong!";
  choicesContent.appendChild(incorrectNotify);
}

// starting game timer function
function countdownClock() {
  let timerInterval = setInterval(function () {
    gameClock.textContent = gameTimer;
    gameTimer--;

    // game ends when timer hits 0
    if (gameTimer <= 0) {
      clearInterval(timerInterval);
      gameClock.textContent = "0";
      choicesContent.innerHTML = " ";
      questionNumber = 0;
      choicesContent.setAttribute("display", "none");
      startMenu.setAttribute("style", "display: block;");
      questionHeading.textContent = "Your score is: " + gameTimer;
      gameTimer = 100;
    }
    // clock stops when user ends quiz and resets for a new game
    else if (questionNumber === 10) {
      clearInterval(timerInterval);
      questionNumber = 0;
      gameTimer = numberOfQuestions * 15;
    }
  }, 1000);
}
// adds event when end user click on the answer (button) to see if it matches the correct one in the questions array
document.addEventListener("click", function (event) {
  if (event.target.matches('.choice-btn')) {
    event.stopPropagation();
    event.preventDefault();
    //correct answer condition
    if (event.target.textContent === questions[questionNumber].answer) {
      // moves to next question
      questionNumber = questionNumber + 1;
      // adding time to clock
      gameTimer += 5;
      if (questionNumber <= (numberOfQuestions - 1)) {
        questionHeading.textContent = questions[questionNumber].title;
        // clearing buttons after choice and lists new ones
        choicesContent.innerHTML = " ";
        listChoices();
        // end user informed of correct answer
        correctAnswer();
      } else {
        // clears choices at end of game
        choicesContent.innerHTML = " ";
        correctAnswer();
        // end user receives a form to enter initials for highscore
        enterInitialsMenu.setAttribute("style", "display: block;");
        // end user can restart the quiz
        startMenu.setAttribute("style", "display: block;");
        viewHighScoresLink.setAttribute("style", "display: inline;");
        // displays final score
        questionHeading.textContent = "Your score is: " + gameTimer;
        // end user final score is added to remaining time
        finalScore = gameTimer;
      }
    }
    // wrong answer condition
    else if (event.target.textContent !== questions[questionNumber].answer) {

      // moves to next question
      questionNumber = questionNumber + 1;
      // removing time from clock
      gameTimer -= 10;

      if (questionNumber <= (numberOfQuestions - 1)) {
        questionHeading.textContent = questions[questionNumber].title;
        // clearing buttons after choice and lists new ones
        choicesContent.innerHTML = " ";
        listChoices();
        // end user informed of incorrect answer
        incorrectAnswer();
      } else {
        // clears choices at end of game
        choicesContent.innerHTML = " ";
        incorrectAnswer();
        // end user receives a form to enter initials for highscore
        enterInitialsMenu.setAttribute("style", "display: block;");
        // end user can restart the quiz
        startMenu.setAttribute("style", "display: block;");
        viewHighScoresLink.setAttribute("style", "display: inline;");
        // displays final score
        questionHeading.textContent = "Your score is: " + gameTimer;
        // end user final score is added to remaining time
        finalScore = gameTimer;
      }
    }
  }
});

function enterInitials(event) {
  event.preventDefault();
  // value taken from user input at end of game
  let userInitials = document.getElementById('initialsForm').value;

  // object with user-inputted initials and final score
  let userScores = {
    initials: userInitials,
    score: finalScore
  };

  // pushing userScores object into high score array
  highScores.push(userScores);

  // decomposes object into strings
  let highScoresString = JSON.stringify(highScores);

  // strings stored in localstorage
  window.localStorage.setItem("high scores", highScoresString);

  // end user notified their score has been entered
  questionHeading.textContent = "Thank you for entering your score. Restart?";
  enterInitialsMenu.setAttribute("style", "display: none;");
  choicesContent.innerHTML = " ";
}

// return to start menu of quiz
function returnToQuiz() {
  backToStartLink.setAttribute("style", "display: none;")
  viewHighScoresLink.setAttribute("style", "display: inline;")
  startMenu.setAttribute("style", "display: block;");
  scoresMenu.setAttribute("style", "display: none;");
  choicesContent.setAttribute("style", "display: none");
  enterInitialsMenu.setAttribute("style", "display: none;");
  questionHeading.textContent = "Coding Quiz Challenge";
}

// submit button stores input into localstorage
enterInitialsBtn.addEventListener("click", enterInitials);

function viewHighScores() {
  // shows highscore menu
  scoresMenu.innerHTML = " ";
  startMenu.setAttribute("style", "display: none;");
  scoresMenu.setAttribute("style", "display: block;");
  choicesContent.setAttribute("style", "display: none");
  enterInitialsMenu.setAttribute("style", "display: none;");
  questionHeading.textContent = "View High Scores";
  backToStartLink.setAttribute("style", "display: inline;");
  viewHighScoresLink.setAttribute("style", "display: none;");
  // high scores from localstorage is grabbed
  let highScoreList = window.localStorage.getItem("high scores");

  // high score strings converted to array of objects
  let highScoreObject = JSON.parse(highScoreList);

  // ranking highest score to lowest
  highScoreObject.sort(highestToLowest);

  // goes through array and each initial with their high scores are listed as an element
  for (let i = 0; i <= highScores.length - 1; i++) {
    let highScoreEntry = document.createElement("div");
    highScoreEntry.setAttribute("class", "alert alert-warning");
    highScoreEntry.innerHTML = "<span style='font-weight: bold;''>" + highScoreObject[i].initials + ":</span> " + highScoreObject[i].score;
    scoresMenu.appendChild(highScoreEntry);
  }
}

// sorting highest score to lowest in the array
function highestToLowest(x, y) {
  let scoreX = x.score;
  let scoreY = y.score;
  let comparison = 0;
  if (scoreX > scoreY) {
    comparison = 1;
  } else if (scoreX < scoreY) {
    comparison = -1;
  }
  return comparison * -1;
}
