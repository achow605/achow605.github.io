(function() {
  'use strict';

  const headerFooter = document.querySelectorAll('.static');
  const headerLink = document.querySelector('header h1');
  const progressBar = document.querySelector('#progress');

  let q1, q2, q3;

  const q1Section = document.querySelector('#q1');
  const q2Section = document.querySelector('#q2');
  const q3Section = document.querySelector('#q3');

  // FUNCTIONS

  function changeHeaderFooterCol(color) {
    for (const element of headerFooter) {
      element.style.color = color;
      element.style.borderColor = color;
    }
  }

  function updateSpotlight(e) {
    spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize}`;
  }

  // START SCREEN

  const startScreen = document.querySelector('#start');
  const startBg = document.querySelector('#start-bg');
  const startBtn = document.querySelector("#start-btn");
  const bigPlant = "M207.7 86.2C207.9 83.4 205.6 81 202.8 80.9C183.7 80.5 109.7 76.6 92.1 144.6C71.8 114 18.6 104.7 4.89998 105C2.09998 105.1 -0.100017 107.4 -1.73498e-05 110.3C4.89998 192.3 49.4 220.1 102.6 224.7C105.1 224.9 106.9 227.2 106.9 229.6V376.8C106.9 379.6 109.1 381.8 111.9 381.8H126.5C129.3 381.8 131.5 379.6 131.5 376.8V215.8C131.2 205.2 129.6 195.7 127.1 187.3C166.9 181.3 203.7 153.4 207.7 86.2Z";
  const smallPlant = "M207.7 167.6C207.9 164.8 205.6 162.4 202.8 162.3C183.7 161.9 116.1 164 88.3 213.6C57.3 194.6 18.5 193.6 4.89998 194C2.09998 194.1 -0.100017 196.4 -1.73498e-05 199.3C4.89998 281.3 65.7 291.2 102.6 300.8C105 301.4 106.9 303.3 106.9 305.7V376.8C106.9 379.6 109.1 381.8 111.9 381.8H126.5C129.3 381.8 131.5 379.6 131.5 376.8V292C131.2 281.4 129.6 271.9 127.1 263.5C162.2 253.6 203.7 234.8 207.7 167.6Z";

  startBtn.addEventListener('mouseover', function() {
    const timeline = anime.timeline({
      duration: 500,
      easing: "easeOutExpo"
    });

    timeline.add({
      targets: ".small-plant",
      d: [{
        value: bigPlant
      }]
    });
  });

  startBtn.addEventListener('mouseout', function() {
    const timeline = anime.timeline({
      duration: 750,
      easing: "easeOutExpo"
    });

    timeline.add({
      targets: ".small-plant",
      d: [{
        value: smallPlant
      }]
    });
  });

  startBtn.addEventListener('click', function(event) {
    event.preventDefault();
    startBg.style.transform = "rotate(-20deg) scale(1.5) translateY(-250vh)";
    changeHeaderFooterCol('#213F2B');
    startScreen.className = 'hidden';
    progressBar.className = 'revealed';
  })

  // QUESTION 1
  const introverted = document.querySelector('#introverted').querySelector('h1');
  const extroverted = document.querySelector('#extroverted');
  const extroAbove = document.querySelector('.above');
  const extroBelow = document.querySelector('.below');

  const spotlight = document.querySelector('.spotlight');
  let spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.40) 250px)';

  const q1Next = document.querySelector('#q1 a');


  extroverted.addEventListener('mouseover', function(){
    extroAbove.className = "above visible";
    extroBelow.className = "below visible";

  });

  extroverted.addEventListener('mouseout', function() {
      extroAbove.className = "above hidden";
      extroBelow.className = "below hidden";

  });

  extroverted.addEventListener('click', function(){
    q1 = "extroverted";

    // next button revealed
    q1Next.className = "revealed";

    // undoes animation from other option
    spotlight.className = ('spotlight hidden');

    // scale text and add underline
    extroverted.querySelector('h1').className = 'clicked';
    introverted.className = '';

  })

  introverted.addEventListener('mouseover', function(){
    spotlight.className = ('spotlight revealed');

    introverted.addEventListener('mousemove', e => updateSpotlight(e));
  })

  introverted.addEventListener('mouseout', function(){
      spotlight.className = ('spotlight hidden');
  })

  introverted.addEventListener('click', function(e){
    q1 = "introverted";

    // undoes animation from other option
    extroAbove.className = "above hidden";
    extroBelow.className = "below hidden";

    // scales text and adds underline
    introverted.classList.add('clicked');
    extroverted.querySelector('h1').className = '';

    // reveals button
    q1Next.className = "revealed";
  })

  q1Next.addEventListener('click', function(e){
    e.preventDefault();
    // progress bar update
    progressBar.src = "images/q2.svg";

    // transition to next question
    q1Section.classList.add('wipeUp');
    q2Section.classList.add('wipeIn');
  })



  // QUESTION 2
  const hiking = document.querySelector('.hiking');
  const beach = document.querySelector('.beach');
  const q2Next = document.querySelector('#q2 a');
  const beachLayers = document.querySelectorAll('.beach img');
  const hikeLayers = document.querySelectorAll('.hike img');

  hiking.addEventListener('click', function(){
    q2 = "hiking";

    // undoes animation for other option FIRST
    for (const layer of beachLayers) {
      layer.classList.remove('wipeIn');
    }

    // THEN animates this current option
    setTimeout(() => {
      for (let i = 0; i < hikeLayers.length; i++) {
        hikeLayers[i].style.transition= `transform ${0.5 + (i*0.1)}s ease`;
        hikeLayers[i].classList.add('wipeIn');
      }
    }, 50);

    // scales text and adds underline
    hiking.classList.add('clicked');
    beach.className = '';


    // reveals button
    q2Next.className = "revealed";
  })

  beach.addEventListener('click', function(){
    q2 = "beach";

    // undoes animation for other option FIRST
    for (const layer of hikeLayers) {
      layer.classList.remove('wipeIn');
    }

    // THEN animated this current option
    setTimeout(() => {
      for (let i=0; i < beachLayers.length; i++) {
        beachLayers[i].style.transition = `transform ${0.5 + (i*0.1)}s ease`;
        beachLayers[i].classList.add('wipeIn');
      }
    }, 50);

    // scales text and adds underline
    beach.classList.add('clicked');
    hiking.className = '';

    // reveals button
    q2Next.className = "revealed";
  })

  q2Next.addEventListener('click', function(e) {
    e.preventDefault();

    // progress bar update
    progressBar.src = "images/q3.svg";

    // transition to next question
    q2Section.className = 'wipeUp';
    q3Section.classList.add('wipeIn');
    setTimeout(()=>{
      q3Section.classList.add('dark');
    }, 350)

    // change header and footer color
    changeHeaderFooterCol('#EEEED7');
  })



  // QUESTION 3
  const toggle = document.querySelector('#q3 input');
  const questionTitle = document.querySelector('#q3 h1');
  const q3Next = document.querySelector('#q3 a');

  const whiteLeaf = document.querySelector('#white-transition');
  const greenLeaf = document.querySelector('#green-transition');

  toggle.addEventListener('change', function() {
    if (this.checked) {
      changeHeaderFooterCol('#213F2B');
      q3Section.classList.remove('dark');
      q3Section.classList.add('light');
      progressBar.src = 'images/q3-dark.svg';
      questionTitle.className = 'darkText';
      q3Next.className = 'invertedButton';
    } else {
      changeHeaderFooterCol('#EEEED7');
      q3Section.classList.remove('light');
      q3Section.classList.add('dark');
      progressBar.src = 'images/q3.svg';
      questionTitle.className = '';
      q3Next.className = '';
    }

  })

  q3Next.addEventListener('click', function(e){
    e.preventDefault();

    whiteLeaf.style.transform = "rotate(-20deg) scale(1.6) translateX(0vh)";
    greenLeaf.style.transform = "rotate(20deg) scale(1.8) translateX(0vh)"

    progressBar.className = "hidden";
    changeHeaderFooterCol('#EEEED7');
  })





}())
