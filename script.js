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

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        let randomIndex = Math.floor(Math.random() * (i + 1) );

        let temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}

function generatePattern() {

    currentPattern = [];
    let mixedItems = [...items];

    shuffleArray(mixedItems);

    for (let i = 0; i < 5; i++) {

        currentPattern.push(mixedItems[i] );
    }
}

function showPattern() {

    patternText.innerText = currentPattern.join(" ");
    patternText.style.visibility = "visible";

    setTimeout(function() {

        patternText.style.visibility = "hidden";
        generateOptions();
    }, 3000);
}

function generateOptions() {

    optionsArea.innerHTML = "";

    let options = [...items];
    shuffleArray(options);

    options.forEach(function(item) {

        let optionBtn = document.createElement("button");
        optionBtn.innerText = item;
        optionBtn.classList.add("option-btn");

        optionsArea.appendChild(optionBtn);
    });
}

startBtn.addEventListener("click", function() {      

    message.innerText = "Memorize the pattern";

    generatePattern();
    showPattern();
});