
"use strict";
//selecting Elements
const score0EL = document.querySelector("#score--0");
const score1EL = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0 = document.querySelector("#current--0")
const current1 = document.querySelector("#current--1")
const player0 = document.querySelector(".player--0")
const player1 = document.querySelector(".player--1")
const win = document.createElement("div");
const winh1 = document.createElement("h1");
win.style.cssText = "width:600px;display:flex;justify-content:center;align-items:center;font-size:25px; height:200px; background-color:white; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); text-align:center; border-radius:20px";
win.appendChild(winh1);
//starting conditions
let scores , currentScore , activePlayer , playing;

//initialize function
const init = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    diceEl.classList.add('hidden');
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
}

init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;   //setting the currentscore back to 0
        activePlayer = activePlayer === 0 ? 1 : 0;   //switching players dynamically
        player0.classList.toggle("player--active");  //if the class there it will remove it if not it will add the class
        player1.classList.toggle("player--active");  //if the class there it will remove it if not it will add the class
}
//rolling dice functionality

btnRoll.addEventListener("click" , function(e){
    
        if(playing){
        //1. Generating Random Dice Roll
        const dice = Math.trunc(Math.random() * 6) + 1 ;
        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./Images/dice-${dice}.png`;
        //3. check for rolled 1:if true , switch to next player 
        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;  //dynamicaly giving the score to the current player
            //  current0.textContent = currentScore;
        }else
        {
            switchPlayer();
        }
    }
});


btnHold.addEventListener("click" , function(e){
    if(playing){

        //1. add current score to the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //switch to next player
    if(scores[activePlayer] >= 100){ 
        //finish the game
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        playing = false;
        diceEl.classList.add('hidden');

        //  winh1.textContent = `Player ${activePlayer} Wins !!`;
        //  document.body.appendChild(win);
    }else
    {
        switchPlayer();
    }

    }
});


btnNew.addEventListener("click" , init);