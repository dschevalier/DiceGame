// variables
var scores, roundScore, activePlayer, gamePlaying;

// init function called to start / reset game
init();

//   when the roll dice button is clicked
document.querySelector('.btn-roll').addEventListener('click', function () {

    // if statement to make sure game is not ended and playing
    if (gamePlaying) {

        // create random number
        var dice = Math.floor(Math.random() * 6 + 1);

        // display result of random number with dice png
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = 'dice-' + dice + '.png';

        // update the round score IF the rolled number was not a 1
        if (dice !== 1) {
            // add the score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            // goes onto the next player with nextPlayer function
            nextPlayer();
        }
    }

});

// when the hold button is clicked
document.querySelector('.btn-hold').addEventListener('click', function () {

    // if statement to make sure game is not ended and playing
    if (gamePlaying) {

        // add current score to global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector(".dice").style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // ending the game by setting the gamePlaying to false, or else game continues
            gamePlaying = false;

        } else {
            // goes onto the next player with nextPlayer function
            nextPlayer();
        }
    }
});

// nextplayer function
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

// new game button - call init function to start new game 
document.querySelector('.btn-new').addEventListener('click', init);

// init function to start / reset game
function init() {

    // reset the variables
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    // state variable to check condition of gameplay
    gamePlaying = true;

    // reset the text content and dice
    document.querySelector('.dice').style.display = 'none';
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    // reset player names
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    // remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // remove active class
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    // add active class back to player 1
    document.querySelector(".player-0-panel").classList.add("active");
}

// how to play alert / or when how play button is clicked 
document.querySelector('.btn-help').addEventListener('click', function () {
    alert("First player to 100 TOTAL POINTS wins.\n\nThe active player rolls the dice as many times as they wish to gain CURRENT POINTS and can press hold to add to their total score - then its the next players turn.\n\nIf a 1 is rolled all the CURRENT POINTS are lost and its the next players turn.");
});