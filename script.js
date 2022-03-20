'use strict';
// defining variables

let scores, roundScore, activePlayer, gamePlaying, roll6;
init();
// dice = Math.floor(Math.random() * 6) + 1; //this generates random integers between 1 and 6

// document.querySelector('#current--' + activePlayer).textContent = dice; // note that actve player is a number, but js is using type coercion to convert it to a string
// we can also read an element from html by just storig it in a varible in JS. EG
// var x = document.querySelector('#score--0');
// console.log(x);

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1 generate random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    //this generates random integers between 1 and 6

    // 2 disply the result

    document.getElementById('dice--1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice--2').src = 'dice-' + dice2 + '.png';
    // 3 update the roundscore if the rolle number was not a one

    document.getElementById('dice--1').style.display = 'block';
    document.getElementById('dice--2').style.display = 'block';
    // if (dice1 && dice2 === 6 && roll6 === 6) {
    //   scores[activePlayer] = 0;
    //   document.querySelector('#score--' + activePlayer).textContent =
    //     scores[activePlayer]; // or you can actually set it to 0 because they're the same;
    //   console.log(`you rolled 6 twice`);
    //   nextPlayer();
    // } else
    if (dice1 !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice1 + dice2; //roundscore= roundscore + dices
      document.querySelector('#current--' + activePlayer).textContent =
        roundScore;
    } else {
      //next player
      nextPlayer();
    }
    //roll6 = dice1 && dice2; // it is very important that this variable is inside this functin and most especially the 'if(gamePlaying)' statement because the game is still in session here because we are in the game plying part. note that I declared this variable in the global scope because we need other functions other
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    // update the UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    let input = document.querySelector('.final-score').value;
    let winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 150;
    }
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice--1').style.display = 'none';
      document.getElementById('dice--2').style.display = 'none';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('.player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('.player--active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
  // we should add the current score to the player's global score
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  roundScore = 0;

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  document.getElementById('dice--1').style.display = 'none';

  document.getElementById('dice--2').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  document.getElementById('dice--1').style.display = 'none';
  document.getElementById('dice--2').style.display = 'none';

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';

  document.getElementById('current--0').textContent = '0';

  document.getElementById('current--0').textContent = '0';
  document.getElementById('name--0').textContent = 'player 1';
  document.getElementById('name--1').textContent = 'player 2';

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('.player--0').classList.add('player--active');
}
