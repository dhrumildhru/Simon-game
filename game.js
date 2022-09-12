var userClickedPattern=[];
var gamePattern = [];
var startedToToggle=false;
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;

$("body").on("keypress",function(){
  if (startedToToggle===false){
    $("#level-title").text("Level " + level);
    nextSequence();
    startedToToggle=true;
  }
});

$(".btn").on("click",handler);
function handler(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  playSound(randomChosenColour);
}


function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  console.log(currentLevel);
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length==gamePattern.length){
        setTimeout(nextSequence, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Sorry You lost here, Press any key to start again");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function playSound(name) {
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}


function startOver(){
  gamePattern=[];
  level=0;
  startedToToggle=false;
}
