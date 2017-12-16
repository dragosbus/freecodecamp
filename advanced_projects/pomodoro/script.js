const divSession = document.querySelector('.session');
const divBreak = document.querySelector('.break');
const clock = document.querySelector('.clock');
const counterClock = document.querySelector('.count-clock');
const titleClock = document.querySelector('.clock-now');

let countSession = parseInt(divSession.querySelector('.timer').textContent);
let countBreak = parseInt(divBreak.querySelector('.timer').textContent);

divSession.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    var target = e.target;
    if (target.classList.contains('up')) {
      countSession += 1;
    } else if (target.classList.contains('down')) {
      if (countSession <= 25) {
        countSession = 25;
      } else {
        countSession -= 1;
      }
    }
  }
  divSession.querySelector('.timer').textContent = countSession;
});

divBreak.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    var target = e.target;
    if (target.classList.contains('up')) {
      countBreak += 1;
    } else if (target.classList.contains('down')) {
      if (countBreak <= 1) {
        countBreak = 1;
      } else {
        countBreak -= 1;
      }
    }
  }
  divBreak.querySelector('.timer').textContent = countBreak;
});

clock.addEventListener('click', e => {
  countSession *= 60;
  countBreak *= 60;
  var counter = setInterval(timer, 1000);
  var startBreak;
  function timer() {
    countSession -= 1;
    if (countSession === 0) {
      clearInterval(counter);
      startBreak = setInterval(breakTime, 1000);
    }
    if (countSession % 60 >= 10) {
      counterClock.textContent = Math.floor(countSession / 60) + ':' + countSession % 60;
    } else {
      counterClock.textContent = Math.floor(countSession / 60) + ':0' + countSession % 60;
    }
    titleClock.textContent = 'Session time';

  }
  function breakTime() {
    countBreak -= 1;
    if (countBreak === 0) {
      clearInterval(startBreak);
      document.querySelector('.reset').style.display = 'block';
    }
    if (countBreak % 60 >= 10) {
      counterClock.textContent = Math.floor(countBreak / 60) + ':' + countBreak % 60;
    } else {
      counterClock.textContent = Math.floor(countBreak / 60) + ':0' + countBreak % 60;
    }
    titleClock.textContent = 'Break time';
    counterClock.textContent = countBreak;
  }
});

document.querySelector('.reset').addEventListener('click', () => {
  countSession = 25;
  countBreak = 5;
  titleClock.textContent = 'Time';
  counterClock.textContent = '';
  document.querySelector('.reset').style.display = 'none';
});
