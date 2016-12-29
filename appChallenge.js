/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;

// set all basic variables to 0

init();

// store last dice variable
var lastDice;

// select roll button element

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying){

		//1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//2. display result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

		//3. Update the round score IF the rolled number was not a 1

		if (dice1 !== 1 && dice2 !== 1) {
			//add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			
		} else {
			//next player
			nextPlayer();
		}

		// Used if two 6's are rolled delete score

		/*
		if(dice === 6 && lastDice === 6){
			//Player Loses score
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();

		} else if (dice !== 1) {
			//add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			
		} else {
			//next player
			nextPlayer();
		}

		// store last dice variable	 
		lastDice = dice;
		*/

	}

});

// btn-hold function

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		// Add current score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// adds the input field 
		var input = document.querySelector('.score-target').value;
		var winningScore;

		// Undefined, 0 , null or "" are COERCED to false
		// Anything is COERCED to true
		if(input){
			winningScore = input;
		} else {
			winningScore = 100;
		}

		// Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			// End game
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// next player
			nextPlayer();

		}

	}

});

function nextPlayer() {
			//next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		// Same as writing 
		/*  if (activePlayer === 0 ) {
			   activePlayer = 1;
		    } else {
			   activePlayer = 0;
		    }
		*/
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		// change player 1 active class to player 2

		// document.querySelector('.player-0-panel').classList.remove('active');
		// document.querySelector('.player-1-panel').classList.add('active');
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		// hide dice
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}

// New Game Button
document.querySelector('.btn-new').addEventListener('click', init);

// Start or re-start game - ie set value to 0

function init(){
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	// add css styling

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	// Set all the values to 0
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// change winner name back
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	// remove winner class
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');

}




// add score to html element dice

// console.log(dice);

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);





