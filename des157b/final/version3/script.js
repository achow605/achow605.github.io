 (function() {
     'use strict'

     // Define DOM elements ##############################################################################
     //  const body = document.querySelector('body');
     const writeButton = document.querySelector('#write');
     const dropdownOptions = document.querySelectorAll('.ageGroup');
     const dropdownBtn = document.querySelector('.dropbtn');
     const formContainer = document.querySelector('#write-screen');
     const form = document.querySelector('form');
     const formCloseBtn = document.querySelector('#write-card > .close-btn');
     const cardCloseBtn = document.querySelector('#full-card > .close-btn');
     //  const formSubmitBtn = document.querySelector('#submit');
     const cardScreen = document.querySelector('#card-screen');
     const fullCard = document.querySelector('#full-card-content');
     const cardsContainer = document.querySelector('#cards1');
     let cardJustMade = false;

     // Initial Function Calls ###########################################################################

     initTypeHeader();

     AOS.init();

     Parse.initialize("llWBPHDIt2XMzcU4gvueZDP7REJo113753a54osN", "rgxSAF8WWRsqnocOzgqrvnbgtjeBWzzKqompnZ1L"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
     Parse.serverURL = 'https://parseapi.back4app.com/'

     generateCards();

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
     form.addEventListener('submit', function(e) {
         e.preventDefault();
         saveNewCard(this.elements.shortResponse.value, this.elements.longResponse.value, this.elements.fname.value, this.elements.age.value);

     })

     //// Close card back overlay on outside click
     //  cardScreen.addEventListener('click', function(e) {
     //      if (e.target == this) {
     //          cardScreen.className = 'hidden';
     //      }
     //  })


     //// Close card overlay on close btn click
     cardCloseBtn.addEventListener('click', function() {
         cardScreen.className = 'hidden';
     })



     //// Filter cards from dropdown

     dropdownOptions.forEach(function(ageGroup) {

         ageGroup.addEventListener('click', function() {

             // Change name of current selected filter
             dropdownBtn.innerHTML = `${ageGroup.innerText}<i class="fa-solid fa-angle-down"></i>`;

             // Get age range selected
             const range = ageGroup.getAttribute('id');

             if (range === 'all') {
                 filterCards(0, 85);
             } else {
                 const min = range.split('-')[0];
                 const max = range.split('-')[1];
                 filterCards(min, max);
             }

             // scrolls to top of the page
             window.scrollTo({ top: 0, behavior: 'smooth' });

         });

     });


     //// Hide arrow animation when at bottom of page
     document.addEventListener('scroll', function(e) {
         let documentHeight = document.body.scrollHeight;
         let currentScroll = window.scrollY + window.innerHeight;

         // When the user is [modifier]px from the bottom, fire the event.
         let modifier = 200;
         if (currentScroll + modifier > documentHeight) {
             document.querySelector('.fa-down-long').classList.add('hidden');
         } else {
             document.querySelector('.fa-down-long').className = "fa-solid fa-down-long"
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

     function generateCards() {

         displayResponses(function() {
             updateDropdown();
             addSpaceholder();
         });


     }

     async function displayResponses(callback, min = 10, max = 85) {
         const response = Parse.Object.extend('Responses');
         const query = new Parse.Query(response);

         try {
             const results = await query.ascending('Age').find();
             //  console.log(results);

             results.forEach(function(eachResponse) {
                 // const id = eachResponse.id;
                 const name = eachResponse.get('Name');
                 const age = eachResponse.get('Age');
                 const shortResponse = eachResponse.get('shortResponse');
                 const longResponse = eachResponse.get('longResponse');

                 // creates card if fit into set range (default is all cards)

                 if (age >= min && age <= max) {
                     createCard(shortResponse, longResponse, name, age);
                 }

             })
         } catch (error) {
             console.error('Error while fetching responses', error);
         }

         callback();
     };

     async function saveNewCard(text, longText, author, age) {

         const responses = new Parse.Object('Responses');

         if (Number.isInteger(parseInt(age))) {

             if (author == '') {
                 author = 'Anonymous';
             }

             responses.set('Name', author);
             responses.set('Age', parseInt(age));
             responses.set('shortResponse', text);
             responses.set('longResponse', longText);

             try {
                 let result = await responses.save();
                 console.log('New card created with objectId:' + result.id);
             } catch (error) {
                 console.error('Error with creating new response:' + error);
             }

             formContainer.className = 'hidden';

             // refreshes cards
             filterCards(0, 85, text);

             // updates dropdown to show all
             dropdownBtn.innerHTML = 'All Ages <i class="fa-solid fa-angle-down"></i>';

             // sets boolean as true to trigger scroll to new card
             cardJustMade = true;

             // resets form
             form.reset();

         } else {
             alert('Please ensure that your age is an integer');
         }


     }

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
         cardBg.className = "card-bg isCard";
         cardBg.setAttribute('data-aos', 'fade');

         let cardContainer = document.createElement('div');
         cardContainer.className = "card-container";

         let card = document.createElement('div');
         card.className = "card";

         let footer = document.createElement('footer');

         // Prepare text for processing
         text = `${text}`;

         // Add text to card
         card.innerHTML = text;
         card.style.fontSize = '100px'; // Default font size
         footer.innerHTML = `— ${author}, <span>${age}</span>`;

         // Set age attribute
         cardBg.setAttribute("age", age);

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

         cardsContainer.appendChild(cardBg);

         // Resize text font
         resize_to_fit(card, cardContainer);

     }

     function addSpaceholder() {
         let space = document.createElement('div');
         space.innerText = " ";
         space.style.minHeight = '200px';
         space.style.minWidth = '10px';
         space.className = 'spaceholder';
         document.querySelector('#cards1').appendChild(space);
     }

     function updateDropdown() {
         let cards = document.querySelectorAll('.card-bg');
         //  console.log(cards);

         // marks all age subgroups if they're populated based on current data
         cards.forEach(function(card) {
             let a = parseInt(card.getAttribute('age'));
             //  console.log('card age is ' + a);

             // initial min and max values for first subgroup
             let max = 15;
             let min = 11;

             for (var i = 0; i < 14; i++) {
                 if ((a < max && a > min) || a == max || a == min) {
                     document.getElementById(`${min}-${max}`).setAttribute('populated', true);
                 }

                 max += 5;
                 min += 5;
             }
         })

         // hides all unmarked subgroups
         let dropdown = document.querySelectorAll('.ageGroup');

         dropdown.forEach(function(subgroup) {
             if (subgroup.getAttribute('populated') == 'true') {
                 subgroup.style.display = 'block';
             } else {
                 subgroup.style.display = 'none';
             }
         })
     }

     function filterCards(min, max, text) {
         // remove all existing cards + spacehoilder
         let cards = document.querySelectorAll('.isCard, .spaceholder');

         cards.forEach(card => {
             card.remove();
         })

         // add cards that fit within range
         displayResponses(function() {
             addSpaceholder();

             // scrolls to new card if this was a refresh from that
             if (cardJustMade == true) {
                 scrollToCard(text);
             }
         }, min, max);
     }

     function scrollToCard(shortResponse) {
         let cards = document.querySelectorAll('.card');

         cards.forEach(card => {
             console.log(`comparing "${card.innerText}" to "${shortResponse}"`);
             if (card.innerText == shortResponse) {
                 card.scrollIntoView({ behavior: "smooth", block: "center" });
             } else {
                 console.log('couldnt find the card you made!');
             }
         })

         cardJustMade = false;
     }


 })();