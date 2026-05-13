
let score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

updateScoreElem();

let isAutoPlaying = false;
let intervalId;

const moveEmoji = {
  Rock: '✊',
  Paper: '✋',
  Scissors:'✌️'
};

    //Auto-Play 
function autoPlay(){

  const btn = document.querySelector('.auto-play-button');

      if(!isAutoPlaying){
        intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
        
      },1000);
      isAutoPlaying = true;
      btn.innerHTML = 'Stop Play';
      } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        btn.innerHTML = 'Auto Play';
      }
    }
   //Reset Scores
    function resetScore(){
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElem();

    }
   
    document.querySelector(".js-rock-button")
    .addEventListener('click', () => {
      playGame('Rock');
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click',() => {
      playGame('Paper');
    });

    document.querySelector('.js-scissors-button').
    addEventListener('click',() => {
      playGame('Scissors');
    });

     document.querySelector('.js-reset-button').
    addEventListener('click',() => {
      showResetConfirmation();
    });

    document.querySelector('.js-auto-play-button').
      addEventListener('click',() => {
        autoPlay();
      })

      document.body.addEventListener('keydown', (event) => {
          if (event.key === 'r' || event.key === 'R'){
              playGame('Rock');
          } else if (event.key === 'p' || event.key === 'P') {
              playGame('Paper');
          } else if (event.key === 's' || event.key === 'S') {
              playGame('Scissors');
          } else if (event.key ==='a' || event.key === 'A') {
            autoPlay();
          } else if (event.key ==='Backspace'){
              showResetConfirmation();
          }
      });

      function showResetConfirmation(){
        document.querySelector('.js-reset-confirmation').innerHTML = `
        Are you sure you want to reset the score?
        <button class = "js-reset-confirm-yes 
         reset-confirm-button">
        Yes
        </button>
        <button class = "js-reset-confirm-no reset-confirm-button">
        No
        </button>
        `;
      

      document.querySelector('.js-reset-confirm-yes').addEventListener('click',() => {
        resetScore();
        hideResetConfirmation();
      });

      document.querySelector('.js-reset-confirm-no').addEventListener('click',() => {
        hideResetConfirmation();
      });
    }

      function hideResetConfirmation(){
        document.querySelector('.js-reset-confirmation').innerHTML = '';
      }

    function playGame(playerMove){

      const computerMove = pickComputerMove();
        
      let result = ' ';
        if (playerMove === 'Scissors'){
            
          if(computerMove === 'Rock'){
            result = 'Lose';
          } else if (computerMove === 'Paper'){
            result = 'Win!';
          } else if (computerMove === 'Scissors'){
            result = 'Tie';
          }
        } else if (playerMove === 'Paper'){
                
          if(computerMove === 'Rock'){
            result = 'Win!';
          } else if (computerMove === 'Paper'){
            result = 'Tie';
          } else if (computerMove === 'Scissors'){
            result = 'Lose';
          }
        } else if (playerMove === 'Rock'){
              
            if (computerMove === 'Rock'){
            result = 'Tie';
          } else if (computerMove === 'Paper'){
            result = 'Lose';
          } else if (computerMove === 'Scissors'){
            result = 'Win!';
          }
        }
        
        if (result === 'Win!'){
          score.wins += 1;
        } else if (result === 'Lose'){
          score.losses += 1;
        } else if (result === 'Tie'){
          score.ties += 1;
        }

      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElem();

      //Update result with color class
      const resultElem = document.querySelector(".JS-result");
      resultElem.innerHTML = result;
      resultElem.classList.remove('result-win', 'result-lose','result-tie');
      if (result === 'Win!') {
        resultElem.classList.add('result-win');
      } else if (result === 'Lose') {
        resultElem.classList.add('result-lose');
      } else if (result === 'Tie') {
        resultElem.classList.add('result-tie');
      }
      
       document.querySelector(".JS-moves").
       innerHTML = `You &nbsp; <span class="move-icon">${moveEmoji[playerMove]}</span>
                    <span style="color:rgba(255,255,0.3);font-size:1.2rem">vs</span>
                    <span class="move-icon">${moveEmoji[computerMove]}</span>&nbsp; Computer`;

    }
    
    
    function updateScoreElem() {
      document.querySelector(".JS-score")
        .innerHTML = `Wins: ${score.wins} &nbsp;·&nbsp; Losses: ${score.losses} &nbsp;·&nbsp; Ties: ${score.ties}`;
    }
    


    function pickComputerMove(){
      const randomNumber = Math.random();
      let computerMove = ' ';

      if(randomNumber >= 0 && randomNumber <= 1/3){
        computerMove = 'Rock';
      } else if (randomNumber >= 1/3 && randomNumber <= 2/3){
        computerMove = 'Paper';
      } else if (randomNumber >= 2/3 && randomNumber <= 1){
        computerMove = 'Scissors';
      }

      return computerMove;
   }