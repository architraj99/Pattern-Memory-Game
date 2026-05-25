let patternText = document.querySelector(".pattern-text");
let startBtn = document.getElementById("startBtn");
let optionsArea = document.querySelector(".options-area");
let message = document.querySelector(".message");
let score = document.querySelector(".score");
let lives = document.querySelector(".lives");

let items = [

    "🔴",
    "🟢",
    "🔵",
    "🟡",
    "25",
    "17",
    "Dinosaur",
    "Rocket",
    "Cat",
    "Alien"
];

let currentPattern = [];
let playerSequence = [];
let totalScore = 0;
let totalLives = 3;
let timeLeft = 10;
let countdown;

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        let randomIndex = Math.floor(Math.random() * (i + 1) );
        let temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}

function startTimer() {

    clearInterval(countdown);
    timeLeft = 10;
    let timerBox = document.querySelector(".timer");
    timerBox.innerText = "Time: " + timeLeft;

    countdown = setInterval(function () {

            timeLeft--;
            timerBox.innerText = "Time: " + timeLeft;

            if (timeLeft <= 0) {

                clearInterval(countdown);

                totalLives--;
                lives.innerText = "Lives: " + totalLives;
                message.innerText = "Time Up";
                message.style.color = "#dc2626";

                checkGameOver();

                if (totalLives > 0) {

                    setTimeout(function () {

                        generatePattern();
                        showPattern();
                    }, 1000);
                }
            }
        }, 1000);
}

function generatePattern() {

    currentPattern = [];
    playerSequence = [];
    let mixedItems = [...items];

    shuffleArray(mixedItems);

    for (let i = 0; i < 5; i++) {

        currentPattern.push(mixedItems[i] );
    }
}

function showPattern() {

    patternText.innerText = currentPattern.join(" ");
    patternText.style.visibility = "visible";
    optionsArea.innerHTML = "";

    setTimeout(function () {

        patternText.style.visibility = "hidden";

        generateOptions();
        startTimer();
    }, 3000);
}

function generateOptions() {

    optionsArea.innerHTML = "";
    let options = [...items];

    shuffleArray(options);

    options.forEach(function (item) {

        let optionBtn = document.createElement("button");
        optionBtn.innerText = item;
        optionBtn.classList.add("option-btn");

        optionBtn.addEventListener("click", function() {
    
            handlePlayerChoice(item);
        });

        optionsArea.appendChild(optionBtn);
    });
}

function checkGameOver() {

    if(totalLives <= 0) {

        clearInterval(countdown);

        totalLives = 0;
        lives.innerText = "Lives: 0";
        message.innerText = "Game Over";
        message.style.color = "#dc2626";
        optionsArea.innerHTML = "";
        startBtn.innerText = "Restart Game";
    }
}

function handlePlayerChoice(item) {

    playerSequence.push(item);
    let currentIndex = playerSequence.length - 1;

    if(playerSequence[currentIndex] !== currentPattern[currentIndex] ) {

        totalLives--;
        lives.innerText = "Lives: " + totalLives;
        message.innerText = "Wrong Pattern";
        message.style.color = "#dc2626";
        playerSequence = [];

        checkGameOver();
        return;
    }

    if (playerSequence.length === currentPattern.length) {

        clearInterval(countdown);

        totalScore++;
        score.innerText ="Score: " + totalScore;
        message.innerText = "Correct Pattern";
        message.style.color = "#16a34a";

        setTimeout(function() {

            generatePattern();
            showPattern();
        }, 1200);
    }
}

startBtn.addEventListener("click", function() {

        if (totalLives <= 0) {
            location.reload();
            return;
        }

        message.innerText = "Memorize the pattern";
        message.style.color = "#475569";

        generatePattern();
        showPattern();
    }
);