const seqEl = document.getElementById("seq");
const startBtn = document.getElementById("startBtn");
const resignBtn = document.getElementById("resignBtn");
const optsEl = document.getElementById("opts");
const msgEl = document.getElementById("msg");
const scoreEl = document.getElementById("scoreEl");
const dotsEl = document.getElementById("dotsEl");
const bar = document.getElementById("bar");
const tnum = document.getElementById("tnum");
const timerRow = document.getElementById("timerRow");

const items = [
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

let pattern = [];
let sequence = [];
let score = 0;
let lives = 3;
let timeLeft = 20;
let timer;
let memorizeTimer;

function shuffle(arr) {

  let copy = [...arr];

  for(let i = copy.length - 1; i > 0; i--) {

    let j = Math.floor(Math.random() * (i + 1));

    let temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
}

function updateLives() {

  let dots = dotsEl.querySelectorAll(".dot");

  dots.forEach(function(dot, i) {

    if(i >= lives) {
      dot.classList.add("off");
    }
    else {
      dot.classList.remove("off");
    }
  });
}

function generatePattern() {

  pattern = shuffle(items).slice(0, 5);
  sequence = [];
}

function createButtons() {

  optsEl.innerHTML = "";

  shuffle(items).forEach(function(item) {

    let btn = document.createElement("button");

    btn.className = "opt";
    btn.innerText = item;

    btn.addEventListener("click", function() {
      checkAnswer(item);
    });

    optsEl.appendChild(btn);

  });

}

function startTimer() {

  clearInterval(timer);

  timeLeft = 20;

  timerRow.style.visibility = "visible";
  bar.style.width = "100%";
  bar.style.background = "green";
  tnum.innerText = timeLeft;

  timer = setInterval(function() {

    timeLeft--;

    tnum.innerText = timeLeft;

    let percent = (timeLeft / 20) * 100;
    bar.style.width = percent + "%";

    if(timeLeft <= 5) {
      bar.style.background = "red";
    }
    else if(timeLeft <= 10) {
      bar.style.background = "orange";
    }
    else {
      bar.style.background = "green";
    }

    if(timeLeft <= 0) {

      clearInterval(timer);

      lives--;

      updateLives();

      msgEl.innerText = "Time Up!";

      if(lives <= 0) {

        gameOver();
      }
      else {

        setTimeout(function() {

          generatePattern();
          showPattern();

        }, 1000);

      }

    }

  }, 1000);

}

function showPattern() {

  clearInterval(timer);
  clearInterval(memorizeTimer);

  startBtn.style.display = "none";
  resignBtn.style.display = "block";

  seqEl.innerText = pattern.join(" ");

  let seconds = 8;

  msgEl.innerText = "Memorize: " + seconds;

  memorizeTimer = setInterval(function() {

    seconds--;

    if(seconds > 0) {
      msgEl.innerText = "Memorize: " + seconds;
    }

  }, 1000);

  setTimeout(function() {

    clearInterval(memorizeTimer);

    seqEl.innerText = "· · · · ·";

    createButtons();

    msgEl.innerText = "Repeat the pattern";

    startTimer();

  }, 8000);

}

function gameOver() {

  clearInterval(timer);
  clearInterval(memorizeTimer);

  optsEl.innerHTML = "";

  msgEl.innerText = "Game Over";

  startBtn.innerText = "Play Again";

  startBtn.style.display = "block";
  resignBtn.style.display = "none";

  seqEl.innerText = "· · · · ·";
}

function checkAnswer(item) {

  sequence.push(item);

  let index = sequence.length - 1;

  if(sequence[index] !== pattern[index]) {

    clearInterval(timer);

    lives--;

    updateLives();

    msgEl.innerText = "Wrong Pattern";

    sequence = [];

    if(lives <= 0) {

      gameOver();
      return;
    }

    setTimeout(function() {

      generatePattern();
      showPattern();

    }, 1000);

    return;
  }

  if(sequence.length === pattern.length) {

    clearInterval(timer);

    score++;

    scoreEl.innerText = score;

    msgEl.innerText = "Correct!";

    setTimeout(function() {

      generatePattern();
      showPattern();

    }, 1000);

  }

}

startBtn.addEventListener("click", function() {

  if(lives <= 0) {
    location.reload();
    return;
  }

  generatePattern();
  showPattern();

});

resignBtn.addEventListener("click", function() {

  gameOver();

});
