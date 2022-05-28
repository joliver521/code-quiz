// global variables
let header = document.querySelector(".header");
let score = document.getElementById("score");
let submitBtn = document.getElementById("submitBtn");

let quizHeader = document.getElementById("quizHeader");
let option1 = document.getElementById("one");
let option2 = document.getElementById("two");
let option3 = document.getElementById("three");
let option4 = document.getElementById("four");
let option5 = document.getElementById("five");
let answerConfirm = document.getElementById("answerConfirm");

let timer = document.getElementById("timer");

let finalScore = document.getElementById("finalScore");
let totalScore = document.getElementById("totalScore");
let highScoreBtn = document.getElementById("highScoreBtn");

let initials = document.getElementById("initials");
let initialLog = document.getElementById("initialLog");
let initialBtn = document.getElementById("initialBtn");

let gameOver = document.getElementById("gameOver");
let gameOverBtn = document.getElementById("form-inline");
// Questions
let questions = [
    {
        "quizHeader": "JavaScript is a _______-side programming language.",
        "one": "1. Client",
        "two": "2. Server",
        "three": "3. Both",
        "four": "4. None",
        "correct": "3. Both"
    },
    {
        "quizHeader": "Which of the following is visible everywhere in your JavaScript code?",
        "one": "1. Global Variable",
        "two": "2. Local Variable",
        "three": "3. Both of the above",
        "four": "4. None of the above",
        "correct": "1. Global Variable"
    },
    {
        "quizHeader": "Which built-in method calls a function for each element in the array?",
        "one": "1. While()",
        "two": "2. Loop()",
        "three": "3. forEach()",
        "four": "4. None of the above",
        "correct": "3. forEach()"
    },
    {
        "quizHeader": "Which statement cannot be used to declare a variable in JavaScript?",
        "one": "1. Let",
        "two": "2. Var",
        "three": "3. Int",
        "four": "4. Const",
        "correct": "3. Int"
    },
    {
        "quizHeader": `Given the following, what is the value of x? 
        var x = typeof abc`,
        "one": "1. Abc",
        "two": "2. String",
        "three": "3. Undefined",
        "four": "4. Error",
        "correct": "2. String"
    },
];

let openingScore = 0;
let qIndex = 0;

// Opening Page
let codeQuizGame = () => {
    quizOpen.style.display = "block";
    header.style.display = "block";
    quizQuestions.style.display = "none";
    finalScore.style.display = "none";

    let startScore = 0;
    timer.textContent = `Time: ${openingScore}`;
};

// Global variable reset
let variableReset = () => {
    openingScore = 0;
    qIndex = 0;
}

// start of quiz
let quizStart = () => {
    quizOpen.style.display = "none";
    quizQuestions.style.display = "block";

    secondsLeft = 75;

    let timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0 || questions.length === qIndex) {
            clearInterval(timerInterval);
            gameOverScore();
        }
    }, 1000);
};

// Questions will show when this function runs
let displayQuestions = () => {
    let qDisplay = questions[qIndex];

    quizHeader.innerHTML = qDisplay.quizHeader;
    option1.innerHTML = qDisplay.one;
    option1.setAttribute("data-answer", qDisplay.one);
    option2.innerHTML = qDisplay.two;
    option2.setAttribute("data-answer", qDisplay.two);
    option3.innerHTML = qDisplay.three;
    option3.setAttribute("data-answer", qDisplay.three);
    option4.innerHTML = qDisplay.four;
    option4.setAttribute("data-answer", qDisplay.four);
    option5.innerHTML = qDisplay.five;
    option5.setAttribute("data-answer", qDisplay.five);
};

displayQuestions();
option1.addEventListener("click", function (event) {
    testAnswer(event);
});
option2.addEventListener("click", function (event) {
    testAnswer(event);
});
option3.addEventListener("click", function (event) {
    testAnswer(event);
});
option4.addEventListener("click", function (event) {
    testAnswer(event);
});
option5.addEventListener("click", function (event) {
    testAnswer(event);
});

// Test to see if answer is correct
let testAnswer = (event) => {
    event.preventDefault();

    let answer = event.currentTarget.dataset.answer;
    let rightAnswer = null;

    if (questions[qIndex].correct === answer) {
        rightAnswer = answer;
    }
    if (answer === rightAnswer) {
        answerConfirm.textContent = "Correct!";
    } else {
        answerConfirm.textContent = "Wrong!";
        secondsLeft -= 10
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    }
    if (questions.length === qIndex + 1) {
        return;
    }
    qIndex++
    displayQuestions();
};

let gameOverScore = () => {
    quizQuestions.style.display = "none";
    highScoreBtn.style.display = "none";
    finalScore.style.display = "block";
    totalScore.style.display = "block";
    initials.style.display = "block";
    initialBtn.style.display = "block";
    initialLog.style.display = "block";

    totalScore.textContent = `Your total score is ${secondsLeft}`;
    initialBtn.textContent = "Submit";
    initials.textContent = `Enter Your Initials: `;
};

let leaderboard = [];


let displayLeaderboard = () => {
    header.style.display = "none";
    gameOver.style.display = "none";
    totalScore.style.display = "none";
    initials.style.display = "none";
    initialBtn.style.display = "none";
    initialLog.style.display = "none";
    highScoreBtn.style.display = "block";

    let getInitials = document.getElementById("initialLog").value;

    let leaderboard = JSON.parse(localStorage.getItem("highScore")) || [];

    let localStorageIndex = { score: secondsLeft, initials: getInitials };
    leaderboard.push(localStorageIndex)
    localStorage.setItem("highScore", JSON.stringify(leaderboard));

    let highScores = `${getInitials} : ${secondsLeft}`;
}

submitBtn.addEventListener("click", () => {
    quizStart();
    console.log("it's working");
});

score.addEventListener("click", function () {
    displayLeaderboard();
    console.log("Display Leaderboard");
});

initialBtn.addEventListener("click", function () {
    displayLeaderboard();
    console.log("Log Initials");
});

clearScore.addEventListener("click", function () {
    localStorage.clear();
});

codeQuizGame();

