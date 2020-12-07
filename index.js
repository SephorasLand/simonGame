var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasBeenPressed = false;
var level = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  level++;
  userClickedPattern = [];
}

$(document).keypress(function(){
  if (!hasBeenPressed){
    nextSequence();
    hasBeenPressed = true;
    $("h1").text("Level " + level);
  }
})


$(".btn").on("click", function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  animatePress(userChosenColour);
  playSound(userChosenColour);
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(nextSequence,1000);
    }
  } else {
    playSound(wrong);
    $("h1").text("Game over");
    $("body").addClass("game-over");
  }
}

function playSound(input){
  var simonMusic = new Audio("sounds/" + input + ".mp3");
  simonMusic.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}
