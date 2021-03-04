(function(){
  'use strict';

  const headerFooter = document.querySelectorAll('.static');
  const headerLink = document.querySelector('header h1');
  const startScreen = document.querySelector('#start');
  const startBg = document.querySelector('#start-bg');
  const startBtn = document.querySelector("#start-btn");
  const bigPlant = "M207.7 86.2C207.9 83.4 205.6 81 202.8 80.9C183.7 80.5 109.7 76.6 92.1 144.6C71.8 114 18.6 104.7 4.89998 105C2.09998 105.1 -0.100017 107.4 -1.73498e-05 110.3C4.89998 192.3 49.4 220.1 102.6 224.7C105.1 224.9 106.9 227.2 106.9 229.6V376.8C106.9 379.6 109.1 381.8 111.9 381.8H126.5C129.3 381.8 131.5 379.6 131.5 376.8V215.8C131.2 205.2 129.6 195.7 127.1 187.3C166.9 181.3 203.7 153.4 207.7 86.2Z";
  const smallPlant = "M207.7 167.6C207.9 164.8 205.6 162.4 202.8 162.3C183.7 161.9 116.1 164 88.3 213.6C57.3 194.6 18.5 193.6 4.89998 194C2.09998 194.1 -0.100017 196.4 -1.73498e-05 199.3C4.89998 281.3 65.7 291.2 102.6 300.8C105 301.4 106.9 303.3 106.9 305.7V376.8C106.9 379.6 109.1 381.8 111.9 381.8H126.5C129.3 381.8 131.5 379.6 131.5 376.8V292C131.2 281.4 129.6 271.9 127.1 263.5C162.2 253.6 203.7 234.8 207.7 167.6Z";

  // FUNCTIONS

  function changeHeaderFooterCol(color) {
    for (const element of headerFooter) {
      element.style.color = color;
      element.style.borderColor = color;
    }
  }


  // START SCREEN

  startBtn.addEventListener('mouseover', function(){
    const timeline = anime.timeline({
      duration: 500,
      easing: "easeOutExpo"
    });

    timeline.add({
        targets: ".small-plant",
        d: [{value: bigPlant}]
      });
  });

  startBtn.addEventListener('mouseout', function(){
    const timeline = anime.timeline({
      duration: 750,
      easing: "easeOutExpo"
    });

    timeline.add({
        targets: ".small-plant",
        d: [{value: smallPlant}]
      });
  });

  startBtn.addEventListener('click', function(event){
  event.preventDefault();
  startBg.style.transform = "rotate(-20deg) scale(1.5) translateY(-250vh)";
  changeHeaderFooterCol('#213F2B');
  startScreen.className = 'hidden';
})


  // HEADER HOVER
  headerLink.addEventListener('mouseover', function(){
    document.querySelector('.underline').classList.add('wider');
    document.querySelector('.underline').classList.remove('normalWidth');
  });

  headerLink.addEventListener('mouseout', function(){
    document.querySelector('.underline').classList.remove('wider');
    document.querySelector('.underline').classList.add('normalWidth');
  });


}())
