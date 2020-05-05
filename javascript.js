var playing = false;
var score;
var counter;
var timeRemaining;
var correctAnswer;
//if we click on the start/reset button

document.getElementById("startReset").onclick = function () {
  //if we are playing
  if (playing == true) {
    location.reload(); //reload page
  } else {
    //if we are not playing

    //change mode to playing
    playing = true;

    //set score to 0
    score = 0;
    document.getElementById("scoreValue").innerHTML = score;

    //show countdown box
    show("timeRemaining");

    timeRemaining = 60;
    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

    //hide game over box
    hide("gameOver");

    //change button to reset
    document.getElementById("startReset").innerHTML = "Reset Game";

    //start countdown
    startCountdown();

    //generate a new Q&A
    generateQA();

    //reduce time by 1 sec in loops
  }
};

for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    //check if we are playing
    if (playing == true) {
      //yes
      if (this.innerHTML == correctAnswer) {
        //correct answer
        //increase score by 1
        score++;
        timeRemaining += 2;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

        document.getElementById("scoreValue").innerHTML = score;

        //hide wrong box and show correct box
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        //generate new QA
        generateQA();
      } else {
        //wrong answer

        timeRemaining -= 5;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

        show("wrong");
        hide("correct");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

//functions

//start counter
function startCountdown() {
  var counter = setInterval(function () {
    timeRemaining -= 1;

    document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

    if (timeRemaining <= 0) {
      timeRemaining = 0;
      document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
      //game over
      stopCountdown();
      show("gameOver");

      document.getElementById("gameOver").innerHTML =
        "<p>game over!</p><p>Your score is " + score + ".</p>";

      //hide time remaining, correct, wrong
      hide("timeRemaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startReset").innerHTML = "Start Game";
    }
  }, 1000);
}

//stop counter
function stopCountdown() {
  clearInterval(counter);
}

//hide elements
function hide(id) {
  document.getElementById(id).style.display = "none";
}

//show elements
function show(id) {
  document.getElementById(id).style.display = "block";
}

//generate Q&A
function generateQA() {
  var x = 1 + Math.round(19 * Math.random());
  var y = 1 + Math.round(19 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;
  var correctPosition = 1 + Math.round(3 * Math.random());

  //filling 1 box with the correct answer
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

  //filling other boxes with wrong answer
  var answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(19 * Math.random())) *
          (1 + Math.round(19 * Math.random()));
        // if (wrongAnswer % 10 == correctAnswer % 10) continue;
      } while (
        answers.indexOf(wrongAnswer) > -1 ||
        wrongAnswer % 10 !== correctAnswer % 10
      );
      //   if (wrongAnswer % 10 == correctAnswer % 10)
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
