var startButton = document.querySelector(".start-btn");
var highscoresButton = document.querySelector(".highscores");
var timerElement = document.querySelector(".time-remaining");
var quizPanel = document.querySelector("#quiz-panel");
var statusPanel = document.querySelector("#status-panel");
var answerButtons;
var submitButton;
var nameInput;
var highscores = [];

var score;
var isFinished = false;
var questionCounter = 0;
var timer;
var timerCount;

//Array of Objects, the objects hold the quiz questions and answers
var quizQuestions = [
  {
    question: "JavaScript is a ___ language",
    choices: [
      "Object-Based",
      "Assembly-langauge",
      "Object-Oriented",
      "High-level",
    ],
    correctAnswer: "Object-Based",
  },
  {
    question: "JavaScript is ideal to ____",
    choices: [
      "increase the loading time of the website",
      "increase the download time for the client",
      "make computations in HTML simpler",
      "minimize storage requirements on the web server",
    ],
    correctAnswer: "minimize storage requirements on the web server",
  },
  {
    question:
      "Which of the following is not considered as an error in Javascript?",
    choices: [
      "Missing of Bracket",
      "Division by zero",
      "Syntax error",
      "Missing of semicolons",
    ],
    correctAnswer: "Division by zero",
  },
  {
    question: "JavaScript can be written ____",
    choices: [
      "directly into the css file",
      "directly into HTML pages",
      "directly into JS file and included into HTML",
      "directly on the server page",
    ],
    correctAnswer: "directly into JS file and included into HTML",
  },
  {
    question:
      "The expression of calling (or executing) a function or method in JavaScript is called _____",
    choices: [
      "Invocation expression",
      "Property Access Expression",
      "Functional Expression",
      "Primary Expression",
    ],
    correctAnswer: "Invocation expression",
  },
];

// startGame function is called when the start button is clicked
function startGame() {
  score = 0;
  timerCount = 30;
  questionCounter = 1;
  renderQuestions(quizQuestions[0]);
  startTimer();
}

// startTimer function starts and stops the timer
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    //Tests if finished condition is met
    if (isFinished && timerCount >= 0) {
      // Clears interval and stops timer
      clearInterval(timer);
    } else if (timerCount === 0) {
      clearInterval(timer);
    }

    //call function to add name to highscore list
  }, 1000);
}

//Populates the quiz panel with the new questions
function renderQuestions(quizQuestion) {
  //Clears quiz panel
  quizPanel.innerHTML = "";

  //Adding new elements
  var questionElement = document.createElement("h2");
  questionElement.textContent =
    "Question " + questionCounter + ": " + quizQuestion.question;
  quizPanel.appendChild(questionElement);

  var buttonA = document.createElement("button");
  buttonA.setAttribute("class", "btn btn-lg answer-btn");
  buttonA.setAttribute("value", quizQuestion.choices[0]);
  buttonA.textContent = quizQuestion.choices[0];
  quizPanel.appendChild(buttonA);

  var buttonB = document.createElement("button");
  buttonB.setAttribute("class", "btn btn-lg answer-btn");
  buttonB.setAttribute("value", quizQuestion.choices[1]);
  buttonB.textContent = quizQuestion.choices[1];
  quizPanel.appendChild(buttonB);

  var buttonC = document.createElement("button");
  buttonC.setAttribute("class", "btn btn-lg answer-btn");
  buttonC.setAttribute("value", quizQuestion.choices[2]);
  buttonC.textContent = quizQuestion.choices[2];
  quizPanel.appendChild(buttonC);

  var buttonD = document.createElement("button");
  buttonD.setAttribute("class", "btn btn-lg answer-btn");
  buttonD.setAttribute("value", quizQuestion.choices[3]);
  buttonD.textContent = quizQuestion.choices[3];
  quizPanel.appendChild(buttonD);

  //Attach query selector on answer buttons
  answerButtons = document.querySelectorAll(".answer-btn");
  // Attach event listener to buttons with the class question-btn to check its value
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener("click", function () {
      checkAnswer(answerButtons[i].value);
    });
  }
}

//Creates the input page for highscores
function renderUsername() {
  quizPanel.innerHTML = "";

  var title = document.createElement("h2");
  title.textContent = "All Done!";
  quizPanel.appendChild(title);

  var scoreline = document.createElement("p");
  scoreline.textContent = "Your score is " + score;
  scoreline.setAttribute("class", "lead");
  quizPanel.appendChild(scoreline);

  var form = document.createElement("div");
  quizPanel.appendChild(form);

  var inputGroup = document.createElement("div");
  inputGroup.setAttribute("class", "input-group");
  form.appendChild(inputGroup);

  var label = document.createElement("label");
  label.setAttribute("for", "userName");
  inputGroup.appendChild(label);

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "userName");
  input.setAttribute("id", "userName");
  input.setAttribute("placeholder", "Enter your name");
  inputGroup.appendChild(input);

  var submitButton = document.createElement("button");
  submitButton.setAttribute("class", "btn btn-lg submit-btn");
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);

  //Attach query selector on submit button and name input
  submitButton = document.querySelector(".submit-btn");
  nameInput = document.querySelector("#userName");

  submitButton.addEventListener("click", function () {
    saveName(nameInput.value);
  });
}

function renderHighscores() {
  quizPanel.innerHTML = "";

  var title = document.createElement("h2");
  title.textContent = "High Scores";
  quizPanel.appendChild(title);

  //Sort highscores in descending order
  highscores.sort(
    (firstItem, secondItem) => secondItem.scoreSaved - firstItem.scoreSaved
  );

  //Render a new li for each highscore
  for (var i = 0; i < highscores.length; i++) {
    var currScore = highscores[i];
    var li = document.createElement("li");
    li.textContent = currScore.name + " - " + currScore.scoreSaved;
    quizPanel.appendChild(li);
  }

  var homeButton = document.createElement("button");
  homeButton.setAttribute("class", "btn btn-lg home-btn");
  homeButton.textContent = "Home";
  quizPanel.appendChild(homeButton);

  homeButton = document.querySelector(".home-btn");
  homeButton.addEventListener("click", renderStartPage);
}

function renderStartPage(){
  quizPanel.innerHTML = "";

  var title = document.createElement("h1");
  title.textContent = "Javascript Code Quiz";
  quizPanel.appendChild(title);

  var text = document.createElement("p");
  text.setAttribute("class", "lead");
  text.textContent = "This quiz will test your knowledge on Javascript concepts that we have gone over in this class.";
  quizPanel.appendChild(text);

  var startButtonNew = document.createElement("button");
  startButtonNew.setAttribute("class", "btn btn-lg start-btn");
  startButtonNew.textContent = "Start!";
  quizPanel.appendChild(startButtonNew);

  startButton = document.querySelector(".start-btn");
  startButton.addEventListener("click", startGame);
  console.log("reached end of start page");

}

//Saves name to local storage
function saveName(nameInput) {
  var userHighscores = {
    name: nameInput,
    scoreSaved: score,
  };
  highscores.push(userHighscores);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  //Reloads the page
  renderStartPage();
}

//Checks if the answer chosen is correct and adds points accordingly.
//Checks if you have reached the end of the quiz and if so will bring up the screen to input name for scoreboard.
function checkAnswer(answer) {
  statusPanel.innerHTML = "";
  if (answer === quizQuestions[questionCounter - 1].correctAnswer) {
    questionCounter++;
    score = score + 10;
    //Checks if there are no more questions left
    if (questionCounter > 5) {
      //End the game
      isFinished = true;
      //Bonus pts are added depending on how much time is left for finishing the quiz
      score = score + timerCount;
      renderUsername();
    } else {
      renderQuestions(quizQuestions[questionCounter - 1]);
    }
  } else {
    var statusElement = document.createElement("h4");
    statusElement.textContent = "Wrong! Try again.";
    statusPanel.appendChild(statusElement);
  }
}

// Initial function that will run when the page loads
function init() {
  //Get stored highscores
  var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

  // If highscores were retrieved from localStorage, update the highscores array
  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

//Attach event listener to view highscores button
highscoresButton.addEventListener("click", renderHighscores);

// Initial function. Retrieves data and stores in an array
init();
