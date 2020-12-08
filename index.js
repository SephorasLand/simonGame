var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasBeenPressed = false;
var level = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  userClickedPattern = [];
}

$("body").on("tap", function(event){
  if (!hasBeenPressed && event.target.id != "red" && event.target.id != "blue" && event.target.id != "yellow" && event.target.id != "green"){
    $("h1").text("Level " + level);
    nextSequence();
    hasBeenPressed = true;
  }
})

$(document).keypress(function(){
  if (!hasBeenPressed){
    $("h1").text("Level " + level);
    nextSequence();
    hasBeenPressed = true;
  }
})


$(".btn").on("click", function(event){
  if(hasBeenPressed){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  } else {
    $("h1").text("Level " + level);
    nextSequence();
    hasBeenPressed = true;
  }
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(nextSequence,1000);
    }
  } else {
    playSound("wrong");
    $("#title").text("Game Over, Press Here to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");;
    }, 200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  setTimeout(function(){
    hasBeenPressed = false;
  }, 200);
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
