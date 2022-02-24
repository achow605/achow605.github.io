(function() {

    // Initial Function Calls
    initTypeHeader();

    generateCards();
    // updateDropdown();

    // Define DOM elements
    const writeButton = document.querySelector('#write');
    const ageDropdown = document.querySelector('#ages');
    const formContainer = document.querySelector('#write-screen');
    const form = document.querySelector('form');
    const formCloseBtn = document.querySelector('.close-btn');
    const formSubmitBtn = document.querySelector('#submit');

    // Other Values
    let formComplete = false;


    // Event Listeners

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


    // Defined Functions

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
            createCard("Lorem Ipsum sjfsjflksajdklfjaslkdfj sdfjk lkasjflksjdfkl", "Anthony", 22, i + 1);
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

        function createCard(text, author, age, cardIndex) {
            // create element & children
            let cardBg = document.createElement('div');
            cardBg.className = "card-bg";
            cardBg.setAttribute('data-aos', 'fade-up');

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
            footer.innerText = `— ${author}, ${age}`;

            // Add transformX to odd cards only except first
            // adjustOddCardX(cardIndex, cardBg);
            // if (cardIndex % 2 == 1 && cardIndex != 1) {
            //     cardBg.style.transform = `translateY(${-364}px)`;
            //     console.log('this is odd')
            // } else {
            //     console.log('this is even or 1');
            // }

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
            document.querySelector('#cards').appendChild(space);
        }

        function adjustOddCardX(index, cardObj) {
            if (index % 2 == 1 && index != 1) {
                cardObj.style.transform = `translateY(-332 * ${index})`;
                console.log('this is odd')
            } else {
                console.log('this is even or 1');
            }
        }

    }

})();