(function() {
    'use strict'

    AOS.init();

    // Initial Function Calls ###########################################################################
    initTypeHeader();

    generateCards();
    // updateDropdown();

    // Define DOM elements ##############################################################################
    const body = document.querySelector('body');
    const writeButton = document.querySelector('#write');
    const ageDropdown = document.querySelector('#ages');
    const formContainer = document.querySelector('#write-screen');
    const form = document.querySelector('form');
    const formCloseBtn = document.querySelector('.close-btn');
    const formSubmitBtn = document.querySelector('#submit');
    const cardScreen = document.querySelector('#card-screen');
    const fullCard = document.querySelector('#full-card-content');

    // Other Values #####################################################################################
    let formComplete = false;


    // Event Listeners ##################################################################################

    //// Clicking to write a response opens form
    writeButton.addEventListener('click', function() {
        formContainer.className = 'visible';
    });

    //// Close form button
    formCloseBtn.addEventListener('click', function() {
        formContainer.className = 'hidden';
    })

    //// Submit form
    formSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();

        if (formComplete == true) {
            // shows confirmation screen

            // sends data to database

            // reset form
            form.reset();
            console.log("reset");
        }

    })

    //// Close card back overlay on outside click
    cardScreen.addEventListener('click', function(e) {
        if (e.target == this) {
            cardScreen.className = 'hidden';
        }
    })

    // Defined Functions ################################################################################

    function initTypeHeader() {
        var options = {
            stringsElement: '#prompt',
            typeSpeed: 35
        };

        var typed = new Typed('#typed', options);
    }

    // ***** eventually add a parameter that is an array of card objects ******
    function generateCards() {
        // this is temporary
        for (let i = 0; i < 10; i++) {
            createCard("Lorem Ipsum sjfsjflksajdkl", "dfsdfsdfsdf dsfsdfsdfsd fjaslkdfj sdfjk lkasjflksjdfkl", "Anthony", 22, i + 1);
        };

        addSpaceholder();

        function resize_to_fit(card, cardContainer) {
            let fontSize = window.getComputedStyle(card).fontSize;
            card.style.fontSize = (parseFloat(fontSize) - 1) + 'px';

            // console.log(`card height is ${card.clientHeight} and cardContainer height is ${cardContainer.clientHeight}`);
            if (card.clientHeight >= cardContainer.clientHeight) {
                resize_to_fit(card, cardContainer);
            }
        }

        function createCard(text, longText, author, age, cardIndex) {
            // create element & children
            let cardBg = document.createElement('div');
            cardBg.className = "card-bg";
            cardBg.setAttribute('data-aos', 'fade');

            let cardContainer = document.createElement('div');
            cardContainer.className = "card-container";

            let card = document.createElement('div');
            card.className = "card";

            let footer = document.createElement('footer');

            // Prepare text for processing
            text = `&ldquo;${text}&rdquo;`;

            // Add text to card
            card.innerHTML = text;
            card.style.fontSize = '100px'; // Default font size
            footer.innerHTML = `— ${author}, <span>${age}</span>`;

            // Add local event listener
            cardBg.addEventListener('click', function() {
                fullCard.innerHTML =
                    `<h1>${text}</h1>
                    <p>${longText}</p>
                    <footer>— ${author}, <span>${age}</span></footer>`;

                cardScreen.className = 'visible';
            })

            // Place in DOM
            cardContainer.appendChild(card);
            cardBg.appendChild(cardContainer);
            cardBg.appendChild(footer);

            document.querySelector('#cards1').appendChild(cardBg);

            // Resize text font
            resize_to_fit(card, cardContainer);

        }

        function addSpaceholder() {
            let space = document.createElement('div');
            space.innerText = " ";
            space.style.minHeight = '200px';
            space.style.minWidth = '10px';
            document.querySelector('#cards1').appendChild(space);
        }

    }

    // function flipBack() {
    //     // finds the flipped cardBg class in the DOM
    //     let flippedCard = document.querySelector('.card-flipped');

    //     // removes flipped classname
    //     flippedCard.classList.remove('card-flipped');
    // }

    // function toggleSpotlight() {
    //     if (spotlight.className == 'spotlight visible') {
    //         spotlight.className = 'spotlight hidden';
    //     } else {
    //         spotlight.className = 'spotlight visible';
    //     }

    // }

})();