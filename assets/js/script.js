// global variables
const header = document.querySelector(".header");
const score = document.getElementById("score");
const submitButton = document.getElementById("submitBtn");
const timer = document.getElementById("timer");
let finalScore = document.getElementById("finalScore");
// Questions
let questions = [
    {
        "quizHeader": "JavaScript is a _______-side programming language.",
        "one": "1. Client",
        "two": "2. Server",
        "three": "3. Both",
        "Four": "4. None",
        "correct": "3. Both"
    },
    {
        "quizHeader": "Which of the following is visible everywhere in your JavaScript code?",
        "one": "1. Global Variable",
        "two": "2. Local Variable",
        "three": "3. Both of the above",
        "Four": "4. None of the above",
        "correct": "1. Global Variable"
    },
    {
        "quizHeader": "Which built-in method calls a function for each element in the array?",
        "one": "1. While()",
        "two": "2. Loop()",
        "three": "3. forEach()",
        "Four": "4. None of the above",
        "correct": "3. forEach()"
    },
    {
        "quizHeader": "Which statement cannot be used to declare a variable in JavaScript?",
        "one": "1. Let",
        "two": "2. Var",
        "three": "3. Int",
        "Four": "4. Const",
        "correct": "3. Int"
    },
    {
        "quizHeader": `Given the following, what is the value of x? 
        var x = typeof abc`,
        "one": "1. Abc",
        "two": "2. String",
        "three": "3. Undefined",
        "Four": "4. Error",
        "correct": "2. String"
    },
];

let openingScore = 0;
let qIndex = 0;

// Start Quiz Game
const codeQuizGame = () => {
    quizOpen.style.display = "block";
    header.style.display = "block";
    quizQuestions.style.display = "none";
    finalScore.style.display = "none";

    let startScore = 0;
    timer.textContent = `Time: ${openingScore}`;
};

// Global variable reset
const variableReset = () => {
    openingScore = 0;
    qIndex = 0;
}

// start of quiz
const quizStart = () => {
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

