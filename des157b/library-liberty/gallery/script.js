(function() {
    'use strict';

    AOS.init();

    for (let i = 0; i < 10; i++) {
        createCard("Lorem Ipsum sjfsjflksajdklfjaslkdfj sdfjk lkasjflksjdfkl", "Anthony", 22);
    };

    addSpaceholder();

    function resize_to_fit(card, cardContainer) {
        let fontSize = window.getComputedStyle(card).fontSize;
        card.style.fontSize = (parseFloat(fontSize) - 1) + 'px';

        console.log(`card height is ${card.clientHeight} and cardContainer height is ${cardContainer.clientHeight}`);
        if (card.clientHeight >= cardContainer.clientHeight) {
            resize_to_fit(card, cardContainer);
        }
    }

    function createCard(text, author, age) {
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

        // Place in DOM
        cardContainer.appendChild(card);
        cardBg.appendChild(cardContainer);
        cardBg.appendChild(footer);

        document.querySelector('#right').appendChild(cardBg);

        // Resize text font
        resize_to_fit(card, cardContainer);

    }

    function addSpaceholder() {
        let space = document.createElement('div');
        space.innerText = " ";
        space.style.minHeight = '200px';
        space.style.minWidth = '10px';
        document.querySelector('#right').appendChild(space);
    }
})();