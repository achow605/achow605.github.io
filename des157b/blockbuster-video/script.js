(function(){
    'use strict'
    let w1 = document.querySelector('#lose');
    let w2 = document.querySelector('#yourself');
    let w3 = document.querySelector('#in');
    let w4 = document.querySelector('#nature');
    let w5 = document.querySelector('#and');
    let w6 = document.querySelector('#find');
    let w7 = document.querySelector('#peace');
    let w8 = document.querySelector('#source');
    let myVideo = document.querySelector('#myVideo');
    let loading = document.querySelector('.fa-pagelines');
    let ms = 0;
    const poem = {
        start: [1000, 1500, 2000, 2500, 3500, 4000, 4500, 5500],
        line: [w1, w2, w3, w4, w5, w6, w7, w8]
    };
    setInterval(showQuote, 500);

    function showQuote() {
        // start animation
        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] <= ms) {
                if (poem.line[i].className == "ul hidden") {
                    poem.line[i].className = "ul showing"; 
                } else if (poem.line[i].className == "hidden") {
                    poem.line[i].className = "showing";
                }
            }
        }

        ms += 500;
        console.log("current time in ms: "+ ms);
    }

    myVideo.addEventListener('playing', function() {
        loading.style.display = 'none';
    });

})();