(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const icon = document.querySelector('#icon');

    let mode = 'dark';


    // flowers falling
    setInterval(createRandomFlowers, 500);

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            icon.className = 'fas fa-sun fa-lg';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            icon.className = 'fas fa-moon fa-lg';
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark'
        }
    })

    function randomInt(min,max) {
        // random number generator
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    function createFlower(time, top, right) {

        // set parameters for flower and animation
        let newFlower = document.createElement("div");
        newFlower.className = "flower";
        newFlower.style.animation = `fall ${time}s ease-in`;
        newFlower.style.top = top + 'px';
        newFlower.style.right = right + 'px';

        //put flower in DOM
        banner.appendChild(newFlower);

        // delete flower from DOM once animation ends
        setTimeout(function(){
            banner.removeChild(newFlower);
        }, time*1000)

    }

    function createRandomFlowers() {
        // randomize variable values for flower creation
        var time = randomInt(5,8);
        var top = randomInt(-100,150);
        var right = randomInt(0,200);

        createFlower(time, top, right);
    }

})()