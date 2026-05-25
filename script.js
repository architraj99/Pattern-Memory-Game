const seqEl = document.getElementById('seq');
const startBtn = document.getElementById('startBtn');
const resignBtn = document.getElementById('resignBtn');
const optsEl = document.getElementById('opts');
const msgEl = document.getElementById('msg');
const scoreEl = document.getElementById('scoreEl');
const dotsEl = document.getElementById('dotsEl');
const bar = document.getElementById('bar');
const tnum = document.getElementById('tnum');
const timerRow = document.getElementById('timerRow');

const items = [
  '🔴', '🟢', '🔵', '🟡',
  '25', '17', 'Dinosaur', 'Rocket', 'Cat', 'Alien'
];

let pattern = [];
let sequence = [];
let score = 0;
let lives = 3;
let timeLeft = 20;
let timer;
let memorizeTimer;

function shuffle(arr) {

  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1) );
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function setMsg(text, cls = '') {

  msgEl.textContent = text;
  msgEl.className = 'msg' + (cls ? ' ' + cls : '');
}

function updateDots() {

  const dots = dotsEl.querySelectorAll('.dot');
  dots.forEach((dot, i) => {

    dot.className = 'dot' + (i >= lives ? ' off' : '');
  });
}

function showStart() {

  startBtn.style.display = 'block';
  resignBtn.style.display = 'none';
}

function showResign() {

  startBtn.style.display = 'none';
  resignBtn.style.display = 'block';
}

function freezeBar() {

  timerRow.style.visibility = 'hidden';
  bar.style.transition = 'none';
  bar.style.width = '100%';
  bar.style.background = '#c4622d';
  tnum.textContent = '20';
}

function startTimer() {

  clearInterval(timer);
  clearInterval(memorizeTimer);

  timeLeft = 20;
  timerRow.style.visibility = 'visible';
  bar.style.transition = 'none';
  bar.style.width = '100%';
  bar.style.background = '#c4622d';
  tnum.textContent = '20';
  void bar.offsetWidth;
  bar.style.transition = 'width 1s linear';

  timer = setInterval(() => {

    timeLeft--;
    tnum.textContent = timeLeft;
    bar.style.width = (timeLeft / 20 * 100) + '%';

    if (timeLeft <= 5) {

      bar.style.background = '#dc2626';
    }

    else if (timeLeft <= 10) {

      bar.style.background = '#d97706';
    }

    else {

      bar.style.background = '#c4622d';
    }

    if (timeLeft <= 0) {

      clearInterval(timer);
      lives--;
      updateDots();
      setMsg("Time's up.", 'bad');
      checkGameOver();

      if (lives > 0) {

        setTimeout(() => {

          generate();
          show();
        }, 1200);

      }

    }

  }, 1000);
}

function generate() {

  pattern = shuffle(items).slice(0, 5);
  sequence = [];
}

function show() {

  clearInterval(timer);
  clearInterval(memorizeTimer);

  showResign();
  freezeBar();
  seqEl.classList.remove('fade');
  seqEl.textContent = pattern.join('  ');
  optsEl.innerHTML = '';
  let memTime = 8;

  setMsg( 'Memorize — ' + memTime + 's remaining.');

  memorizeTimer =
    setInterval(() => {

      memTime--;

      if (memTime > 0) {

        setMsg('Memorize — ' + memTime + 's remaining.');
      }
    }, 1000);

  setTimeout(() => {

    clearInterval(memorizeTimer);
    seqEl.classList.add('fade');

    setTimeout(() => {

      seqEl.textContent = '· · · · ·';
      seqEl.classList.remove('fade');
    }, 300);

    buildOptions();
    startTimer();
    setMsg('Rebuild it in order.');
  }, 8000);
}

function buildOptions() {

  optsEl.innerHTML = '';

  shuffle(items).forEach(item => {

    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.textContent = item;
    btn.addEventListener('click', () => pick(item) );
    optsEl.appendChild(btn);
  });

}

function endGame() {

  clearInterval(timer);
  clearInterval(memorizeTimer);

  lives = 0;

  updateDots();

  optsEl.innerHTML = '';
  timerRow.style.visibility = 'visible';
  bar.style.transition = 'none';
  bar.style.width = '0%';
  seqEl.textContent = '· · · · ·';

  setMsg('Game over.', 'bad');

  startBtn.textContent = 'Play again';

  showStart();
}

function checkGameOver() {

  if (lives <= 0) {

    endGame();
  }

}

function pick(item) {

  sequence.push(item);

  const currentIndex = sequence.length - 1;

  if (sequence[currentIndex] !== pattern[currentIndex] ) {

    clearInterval(timer);

    lives--;
    updateDots();
    setMsg('Wrong pattern.', 'bad');
    sequence = [];
    checkGameOver();

    if (lives > 0) {

      setTimeout(() => {

        generate();
        show();

      }, 1200);
    }

    return;
  }

  if (sequence.length === pattern.length) {

    clearInterval(timer);

    score++;
    scoreEl.textContent = score;

    setMsg('Correct!', 'ok');

    setTimeout(() => {

      generate();
      show();

    }, 1200);

  }

}

startBtn.addEventListener('click', () => {

    if (lives <= 0) {
      location.reload();
      return;
    }

    generate();
    show();
});

resignBtn.addEventListener('click', () => {

    setMsg('You resigned.', 'bad');
    endGame();
}); 