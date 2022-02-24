(function() {

    // Initial Function Calls
    initTypeHeader();

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

})();