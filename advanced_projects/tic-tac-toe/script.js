var DOMelements = (function () {

  const newGamePage = document.querySelector('.start-page');
  const startGameBtn = document.querySelector('.new-game');
  const gamePage = document.querySelector('.board');
  const ulBox = document.querySelector('.boxes');
  const boxes = document.querySelectorAll('.box');
  return {
    newGamePage,
    startGameBtn,
    gamePage,
    ulBox,
    boxes
  };

}());

var player, ai, currentPlayer, winner,
  gameOver = false,
  moves = 0,
  symbols = ['x', 'o'];

//Player will receive X or 0 randomly
function whoIsFirst() {
  var symbol = symbols[Math.floor(Math.random() * 2)];
  player = symbol;
  if (player === 'x') {
    ai = 'o'
    currentPlayer = player;
  } else {
    ai = 'x';
    currentPlayer = ai;
  }
  document.querySelector('.player').innerHTML += `<img src="img/${player}.svg">`;
  document.querySelector('.ai').innerHTML += `<img src="img/${ai}.svg">`;
}

//Start game handler
function startGame() {
  document.querySelector('.player').innerHTML = 'Player';
  document.querySelector('.ai').innerHTML = 'Ai';

  animation();
  whoIsFirst();
  /*The boxes from the board became new boxes created in reset function*/
  DOMelements.boxes = document.querySelectorAll('.box');
  gameOver = false;
  moves = 0;
  winner = undefined;
}

//Animations for initialisation page
var animation = function () {
  setTimeout(() => {
    DOMelements.newGamePage.classList.add('hide-new-game');
  }, 50);

  setTimeout(() => {
    DOMelements.newGamePage.style.display = 'none';
  }, 900);

  setTimeout(() => {
    DOMelements.gamePage.style.display = 'block';
  }, 1000);

  setTimeout(() => {
    DOMelements.gamePage.classList.add('show-board');
  }, 1100);
};

/*Create new li's when the game is finished.
We should create a new board after the game finished*/

function createLI() {
  var li = document.createElement('li');
  li.className = 'box';
  return li;
}

//Reset game handler
function reset() {
  //Delete old board
  DOMelements.ulBox.innerHTML = '';
  //Create new board
  for (let i = 0; i < 9; i++) {
    DOMelements.ulBox.appendChild(createLI());
  }
  //Hide result page
  var screens = document.querySelectorAll('.screen');
  for (let i = 0; i < screens.length; i++) {
    screens[i].classList.remove('fade');
    screens[i].style.display = 'none';
  }
  //Show the board
  DOMelements.gamePage.style.display = 'block';
  //Call start game handler
  startGame();
}

/*Create 3 handlers for winning page,tie page and loosing page.
The result page will show up after 0.7 seconds and after 1.1 seconds will add class fade for animation.For every result page we should hide the board*/ 

//Screen for when player win
var screenWin = function () {
  setTimeout(() => {
    DOMelements.gamePage.style.display = 'none';
    document.querySelector('.screen-win').style.display = 'block';
    var btn = document.querySelector('.screen-win').querySelector('.play-again');
    btn.addEventListener('click', reset);
  }, 700);

  setTimeout(() => {
    document.querySelector('.screen-win').classList.add('fade');
  }, 1100);

}

//Screen for when is tie
var screenTie = function () {
  setTimeout(() => {
    DOMelements.gamePage.style.display = 'none';
    document.querySelector('.screen-tie').style.display = 'block';
    var btn = document.querySelector('.screen-tie').querySelector('.play-again');
    btn.addEventListener('click', reset);
  }, 700);

  setTimeout(() => {
    document.querySelector('.screen-tie').classList.add('fade');
  }, 1100);
}

//Screen for when player loose
var screenLoose = function () {
  setTimeout(() => {
    DOMelements.gamePage.style.display = 'none';
    document.querySelector('.screen-loose').style.display = 'block';
    var btn = document.querySelector('.screen-loose').querySelector('.play-again');
    btn.addEventListener('click', reset);
  }, 700);

  setTimeout(() => {
    document.querySelector('.screen-loose').classList.add('fade');
  }, 1100);
}

//Check if is draw handler
function checkDraw() {
  if (moves === 9) {
    screenTie();
  }
}

//Show winner handler
function showWinner() {
  if (winner === player) {
    screenWin();
  } else if (winner === ai) {
    screenLoose();
  } else {
    checkDraw();
  }
}

//Change color for winning combination
function showCombo(c1, c2, c3) {
  c1.style.backgroundColor = '#54D17A';
  c2.style.backgroundColor = '#54D17A';
  c3.style.backgroundColor = '#54D17A';
}

//Event listener for player
DOMelements.ulBox.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    var target = e.target;
    if (target.innerHTML === '') {
      target.classList.add(`box-${player}`);
      var icon = `<img src="img/${player}.svg">`;
      target.innerHTML = icon;
      moves += 1;
      checkWinner(player, DOMelements.boxes);
      aiMoves();
      showWinner();
    }
  }
});

//AI turn
function aiTurn(box) {
  //AI will draw every 0.7 seconds
  setTimeout(function () {
    var icon = `<img src="img/${ai}.svg">`;
    box.classList.add(`box-${ai}`);
    box.innerHTML = icon;
    moves += 1;
    checkWinner(ai, DOMelements.boxes);
    if (gameOver) {
      showWinner();
    }
  }, 700);
}

//Logic for AI
function aiMoves() {
  var box = DOMelements.boxes;

  if (!box[0].classList.contains('box-x') && !box[0].classList.contains('box-o')) {
    aiTurn(box[0]);

  } else if (!box[1].classList.contains('box-x') && !box[1].classList.contains('box-o')) {
    aiTurn(box[1]);

  } else if (!box[2].classList.contains('box-x') && !box[2].classList.contains('box-o')) {
    aiTurn(box[2]);

  } else if (!box[3].classList.contains('box-x') && !box[3].classList.contains('box-o')) {
    aiTurn(box[3]);

  } else if (!box[4].classList.contains('box-x') && !box[4].classList.contains('box-o')) {
    aiTurn(box[4]);

  } else if (!box[5].classList.contains('box-x') && !box[5].classList.contains('box-o')) {
    aiTurn(box[5]);

  } else if (!box[6].classList.contains('box-x') && !box[6].classList.contains('box-o')) {
    aiTurn(box[6]);

  } else if (!box[7].classList.contains('box-x') && !box[7].classList.contains('box-o')) {
    aiTurn(box[7]);

  } else if (!box[8].classList.contains('box-x') && !box[8].classList.contains('box-o')) {
    aiTurn(box[8]);

  }
}

/*Logic for check winning combinations.
A box is in winning combination if has class of activePlayer*/
function checkWinner(activePlayer, board) {

  if (board[0].classList.contains(`box-${activePlayer}`) && board[1].classList.contains(`box-${activePlayer}`) && board[2].classList.contains(`box-${activePlayer}`)) {
    winner = activePlayer;
    gameOver = true;
    showCombo(board[0], board[1], board[2]);

  } else if (board[0].classList.contains(`box-${activePlayer}`) && board[3].classList.contains(`box-${activePlayer}`) && board[6].classList.contains(`box-${activePlayer}`)) {
    winner = activePlayer;
    gameOver = true;
    showCombo(board[0], board[3], board[6]);

  } else if (board[0].classList.contains(`box-${activePlayer}`) && board[4].classList.contains(`box-${activePlayer}`) && board[8].classList.contains(`box-${activePlayer}`)) {
    winner = activePlayer;
    gameOver = true;
    showCombo(board[0], board[4], board[8]);

  } else if (board[1].classList.contains(`box-${activePlayer}`) && board[4].classList.contains(`box-${activePlayer}`) && board[7].classList.contains(`box-${activePlayer}`)) {
    winner = activePlayer;
    gameOver = true;
    showCombo(board[1], board[4], board[7]);

  } else if (board[2].classList.contains(`box-${activePlayer}`) && board[4].classList.contains(`box-${activePlayer}`) && board[6].classList.contains(`box-${activePlayer}`)) {
    winner = activePlayer;
    gameOver = true;
    showCombo(board[2], board[4], board[6]);

  } else if (board[2].classList.contains(`box-${activePlayer}`) && board[5].classList.contains(`box-${activePlayer}`) && board[8].classList.contains(`box-${activePlayer}`)) {
    winner = activePlayer;
    gameOver = true;
    showCombo(board[2], board[5], board[8]);

  } else if (board[3].classList.contains(`box-${activePlayer}`) && board[4].classList.contains(`box-${activePlayer}`) && board[5].classList.contains(`box-${activePlayer}`)) {
    winner = activePlayer;
    gameOver = true;
    showCombo(board[3], board[4], board[5]);

  } else if (board[6].classList.contains(`box-${activePlayer}`) && board[7].classList.contains(`box-${activePlayer}`) && board[8].classList.contains(`box-${activePlayer}`)) {
    winner = activePlayer;
    gameOver = true;
    showCombo(board[6], board[7], board[8]);

  } else {
    checkDraw();
  }
}

//Star game event
DOMelements.startGameBtn.addEventListener('click', startGame);