(function(){
  'use strict';
  // Establishing values

  const logoheader = document.querySelector('header');
  const startMsg = document.querySelector('#start-msg');
  const turnMsg = document.querySelector('#turn-msg');
  const noMatchMsg = document.querySelector('#no-match-msg');
  const winMsg = document.querySelector('#win-msg');
  const skipMsg = document.querySelector('#skip-msg');
  const startScreen = document.querySelector('#game-start');
  const playBtn = document.querySelector('#play-btn');
  const gameBoard = document.querySelector('#game-board');
  const stack = document.querySelector('#stack');
  const startCard = document.querySelector('#start-card');
  const cardHands = document.querySelector('#card-hands');
  const p1Hand = document.querySelector('#player1-hand');
  const p2Hand = document.querySelector('#player2-hand');


  let currentColor;
  let currentValue;
  let currentPlayer = 1;

  const cardColors = ['red', 'blue', 'green'];
  let randColor;
  let p1CardCount = 5;
  let p2CardCount = 5;
  let zIndex = 1;

  // Classes

  class Player {
    constructor() {
      this.hand = [];
    }
  }

  // establish players
  const player1 = new Player();
  const player2 = new Player();

  class Card {
    constructor(value, color){
      this.value = value;
      this.color = color;
    }
  }

  // Functions

  function getRandInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
  }

  function getRandCol() {
    return cardColors[getRandInt(3)-1];
  }

  function hideStart(){
    // start screen will hide
    startScreen.className = "hidden";

    // logo header will get smaller
    logoheader.className = "shorten";
    logoheader.style.marginBottom = '100px';

    // game start message

    startMsg.className = "fadein";
    setTimeout(function(){
      startMsg.className = "hidden";
    }, 1000);
  }

  function setupBoard(){
    // starting card will be randomly set

    currentColor = getRandCol();
    currentValue = getRandInt(5);

    setTimeout(function(){
      startCard.src=`images/${currentColor}-${currentValue}.jpg`;
    }, 1100);

    // starting card revealed

    setTimeout(function(){
      gameBoard.className = "fallin";
    }, 1110);

  }

  function getRandCard() {
    return new Card(getRandCol(), getRandInt(5));
  }

  function setupHands() {

    // randomize hands
    player1.hand = [getRandCard(), getRandCard(), getRandCard(), getRandCard(), getRandCard()];
    player2.hand = [getRandCard(), getRandCard(), getRandCard(), getRandCard(), getRandCard()];

    // create cards
    setTimeout(function(){
      for (const card of player1.hand) {
        let newCard = document.createElement('img');
        newCard.className = `card ${card.color} ${card.value}`;
        newCard.src = `images/${card.value}-${card.color}.jpg`;
        newCard.style.zIndex = zIndex;
        zIndex++;
        p1Hand.appendChild(newCard);
      }
      for (const card of player2.hand) {
        let newCard = document.createElement('img');
        newCard.className = `card ${card.color} ${card.value}`;
        newCard.src = `images/${card.value}-${card.color}.jpg`;
        newCard.style.zIndex = zIndex;
        zIndex++;
        p2Hand.appendChild(newCard);
      }
    }, 1500);
    // display cards
    setTimeout(function(){
      console.log("Starting game with Player 1");
      p2Hand.classList.add('hidden');
      cardHands.className = "slidein";
      turnMsg.innerHTML = `Player ${currentPlayer}'s Turn`;
      turnMsg.className = "fadein";
    }, 1600)

    setTimeout(function(){
      turnMsg.className = 'hidden';
    }, 3600)
  }

  function gameOver() {
    if (p1CardCount == 1 || p2CardCount == 1) {
      console.log(`P1: ${p1CardCount} Cards and P2: ${p2CardCount}`);
      return true;
    }
    console.log(`P1: ${p1CardCount} Cards and P2: ${p2CardCount}`);
    return false;
  }

  function playRound() {
    console.log(`Player ${currentPlayer}'s Turn'`);

    // get current hand
    const currHand = document.querySelector(`#player${currentPlayer}-hand`).querySelectorAll('.card');

    // find matches in hand
    let matchCount = 0;
    for (const card of currHand) {
      if (card.classList.contains(currentValue) || card.classList.contains(currentColor)) {
        card.classList.add('playable');
        matchCount++;
      }
    }

    console.log(`${matchCount} match(es) found for ${currentColor} ${currentValue}`);

    // check if no matches
    if (matchCount == 0){
      console.log(`No match found in player ${currentPlayer}`);
      noMatchMsg.className = 'fadein';
      setTimeout(function(){
        drawCard(currentPlayer);
      }, 500);


      setTimeout(function(){
        noMatchMsg.className = 'hidden';
        switchTurn();
      }, 1000);

      setTimeout(function(){
        playRound();
      }, 3500);
    }

    // Playable card event event listener
    const playableCards = document.querySelector(`#player${currentPlayer}-hand`).querySelectorAll('.playable');
    for (const card of playableCards) {
      card.addEventListener('click', function(event){
        event.preventDefault();

        //set new current color

        if (card.classList.contains('red')) {
          currentColor = 'red';
        } else if (card.classList.contains('green')) {
          currentColor = 'green';
        } else if (card.classList.contains('blue')){
          currentColor = 'blue';
        } else {
          throw(`Couldn't determine clicked card color in (${card.classList})`);
        }

        //set new current value

        if (card.classList.contains('1')) {
          currentValue = 1;
        } else if (card.classList.contains('2')) {
          currentValue = 2;
        } else if (card.classList.contains('3')) {
          currentValue = 3;
        } else if (card.classList.contains('4')) {
          currentValue = 4;
        } else if (card.classList.contains('5')) {
          currentValue = 5;
        } else {
          throw("Couldn't determine clicked card value and color");
        }

        console.log(`Player ${currentPlayer} played ${currentColor} ${currentValue}`);

        // card disappears

        card.classList.add('hidden');
        setTimeout(function(){
          card.remove();
        },500);

        if (currentPlayer == 1) {
          p1CardCount--;
        } else {
          p2CardCount--;
        }

        // play the card

        const newCard = document.createElement('img');
        newCard.className = "card hidden";
        newCard.style.transform += ` rotate(${getRandInt(3)*(-1*(getRandInt(2)))}deg) translateX(-11vw)`;
        newCard.style.position = 'absolute';
        newCard.src = `images/${currentColor}-${currentValue}.jpg`;
        newCard.style.zIndex = zIndex;
        zIndex++;
        stack.appendChild(newCard);

        setTimeout(function(){
          newCard.className = "card fadein";
        }, 500);

        // reset playable cards with new current card
        for (const card of document.querySelectorAll('.playable')) {
          card.classList.remove('playable');
        };

        // Next round or end game
        if (gameOver() == true) {
          console.log('game determined over');
          // end game here
          setTimeout(function(){
            gameBoard.className = "hidden";
            winMsg.innerHTML = `Player ${currentPlayer} Wins!`;
            winMsg.className = "fadein";
          }, 1000);

        } else {
          console.log("Game is not over; switching turns now");

          setTimeout(function() {
            switchTurn();
          },500);


          setTimeout(function(){
            console.log("turns should be switched; starting new round");
            playRound();
          }, 2000);
        }

      })
    };

  }

  function switchTurn() {
    console.log("#######switching players########");
    if (currentPlayer == 1) {
      p1Hand.className = "hand hidden";
      p2Hand.className = "hand slidein";
      currentPlayer = 2;
    } else {
      p2Hand.className = "hand hidden";
      p1Hand.className = "hand slidein";
      currentPlayer = 1;
    }

  }

  function drawCard(playerIndex) {
    const drawnCard = getRandCard();

    let newCard = document.createElement('img');
    newCard.className = `card hidden`;
    newCard.src = `images/${drawnCard.value}-${drawnCard.color}.jpg`;
    newCard.style.zIndex = zIndex;
    zIndex++;

    if (playerIndex == 1) {
      player1.hand.push(drawnCard);
      p1Hand.appendChild(newCard);
      p1CardCount++;
    } else if (playerIndex == 2){
      player2.hand.push(drawnCard);
      p2Hand.appendChild(newCard);
      p2CardCount++;
    } else {
      throw("Couldn't determine player turn for drawing card");
    }

    document.querySelector('#no-match-msg').className = 'fadein';

    setTimeout(function(){
      // Update card margin
      const currHand = document.querySelector(`#player${currentPlayer}-hand`);
      for (const card of currHand.querySelectorAll('.card')) {
        card.style.marginRight = `${-7-(0.25*(currHand.length-5))}vw`;
      }
      // add slidein class
      currHand.querySelector('.hidden').className = `card ${drawnCard.color} ${drawnCard.value} slidein`;
    }, 1000)

    console.log(`Player ${playerIndex} drew a card`);
  }


///////////////////////////////////////////////////////////////////////////////////////////////

  // Starting the game
  playBtn.addEventListener('click', function(event) {
    event.preventDefault();

    hideStart();
    setupBoard();
    setupHands();

    setTimeout(function(){
      playRound();
    }, 2000)

  });

  // Card Hover Event

  // make a function that updates all the playable cards that round by querying all cards and iterating to see if they have

}())
