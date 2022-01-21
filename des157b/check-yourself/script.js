(function(){
    'use strict'

    let globalData;
    let numDataPoints;

    getData();

    async function getData(){
        const myBPM = await fetch('heartrate.json');
        const data = await myBPM.json();
        const dataPoints = Object.keys(data);

        globalData = Object.values(data);

        numDataPoints = dataPoints.length;
    }

    function deployValues(point, data){
        const speeds = [
            0.8, 0.75, 0.6, 0.4
        ];
        document.querySelector('#bpm').innerHTML = `${data[point].bpm} BPM`;
        document.querySelector('.fa-heart').style.animation = `beat ${speeds[data[point].speed]}s infinite`;
        document.querySelector('#time').innerHTML = `${data[point].time} minutes in`;
    }

    let prevLoc = 0;

    document.addEventListener('mousemove', function(e){
        const windowSize = window.innerWidth;
        const timeSection = windowSize / numDataPoints;
        const xPos = e.clientX;
        const changeTime = Math.floor(xPos / timeSection);

        // When you move the mouse into the next segment, change the interface.
        if (changeTime !== prevLoc) {
            deployValues(changeTime, globalData);
            prevLoc = changeTime;
        }
    })
})();