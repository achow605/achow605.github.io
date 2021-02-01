(function() {
  'use strict';

  const myForm = document.querySelector('#input-form');
  const madlib = document.querySelector("#madlib");
  let words = [];

  myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = document.querySelectorAll("input[type=text]");
    for (let word of formData) {
      words.push(word.value);
      // word.value = "";
    }

    document.querySelector('#form-container').className = "hidden";

    setTimeout(function() {
      document.querySelector('#transition').className = "showing";
    }, 500)

    setTimeout(function() {
      document.querySelector('#transition').className = "hidden";
    }, 2000)

    setTimeout(function() {
      document.querySelector('#madlib-container').className = "showing";
    }, 2700)

    showMadlib(words);
  });

  function showMadlib(formData) {

    var aOrAn = "a";
    if (formData[2][0].toLowerCase() == "a" ||
        formData[2][0].toLowerCase() == "e" ||
        formData[2][0].toLowerCase() == "i" ||
        formData[2][0].toLowerCase() == "o" ||
        formData[2][0].toLowerCase() == "u") {
      aOrAn = "an";
    }

    madlib.innerHTML = `<b>${formData[0]}</b>, <br><br> It has come to my attention that for the past few weeks of class you have been caught with your webcam on trying to <b>${formData[3].toLowerCase()} ${formData[1].toLowerCase()}</b> ${aOrAn} <b>${formData[2].toLowerCase()}</b>. At the very least, please keep your mic muted–your <b>${formData[4].toLowerCase()}</b> noises during class are very distracting and it makes your classmates feel excessively <b>${formData[5].toLowerCase()}</b> <br><br> Please understand that even though our studio course is over Zoom, we still expect professional behavior. This is your first and final warning. <br><br>
    Regards, <br>
    William Mead`;
  }

  document.querySelector('#restart').addEventListener('click', function(){
    location.reload();
  })

}());
