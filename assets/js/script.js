// global variables
let header = document.querySelector(".header");
let score = document.getElementById("score");
let startBtn = document.getElementById("startBtn");

let quizHeader = document.getElementById("quizHeader");
let option1 = document.getElementById("one");
let option2 = document.getElementById("two");
let option3 = document.getElementById("three");
let option4 = document.getElementById("four");
let option5 = document.getElementById("five");
let correct = document.getElementById("correct");
let answerConfirm = document.getElementById("answerConfirm");

let totalScore = document.getElementById("totalScore");
let quizQuestions = document.getElementById("quizQuestions");
let questionBtn = document.getElementById("questionBtn");

let highScoreList = document.getElementById("highScoreList");
let highScoreBtn = document.getElementById("highScoreBtn");
let quizOpen = document.getElementById("quizOpen");
let finalScore = document.getElementById("finalScore");

let initials = document.getElementById("initials");
let initialLog = document.getElementById("initialLog");
let initialBtn = document.getElementById("initialBtn");

let gameOver = document.getElementById("gameOver");
let gameOverBtn = document.getElementById("form-inline");

let timerInterval;
let timer = document.getElementById("timer");

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
    highScores.style.display = "none";

    let openingScore = 0;
    timer.textContent = `Time: ${openingScore}`;
};

// Global variable reset
let variableReset = () => {
    openingScore = 0;
    qIndex = 0;
};

// start of quiz
let startQuiz = () => {
    quizOpen.style.display = "none";
    quizQuestions.style.display = "block";

    secondsLeft = 75;

    timerInterval = setInterval(() => {
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
};

displayQuestions();
option1.addEventListener("click", (event) => {
    testAnswer(event);
});
option2.addEventListener("click", (event) => {
    testAnswer(event);
});
option3.addEventListener("click", (event) => {
    testAnswer(event);
});
option4.addEventListener("click", (event) => {
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
        gameOverScore();
        return;
    }
    qIndex++;
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
    highScores.style.display = "block";

    totalScore.textContent = `Your total score is ${secondsLeft}`;
    initialBtn.textContent = "Submit";
    initials.textContent = `Enter Your Initials: `;
    clearInterval(timerInterval);
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

    // let highScores = `${getInitials} : ${secondsLeft}`;
    populateLeaderboard();
}

let populateLeaderboard = () => {
    //console.log('Populate!')
    let scoreHistory = JSON.parse(localStorage.getItem("highScore"));
    for (let i = 0; i < scoreHistory.length; i++) {

        // Create Element and store in variable
        let scoreEl = document.createElement("li");
        // Give lelemnt content
        scoreEl.textContent = `Initials: ${scoreHistory[i].initials}, Score: ${scoreHistory[i].score}`;
        // Set any appropriate attributes (optional)

        // Append element to page
        highScoreList.append(scoreEl);
    }
}

startBtn.addEventListener("click", () => {
    startQuiz();
});

score.addEventListener("click", () => {
    displayLeaderboard();
});

initialBtn.addEventListener("click", () => {
    displayLeaderboard();
});

clear.addEventListener("click", () => {
    localStorage.clear();
});

back.addEventListener("click", () => {
    codeQuizGame();
});

codeQuizGame();

