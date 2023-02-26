
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;

document.addEventListener("keydown",function(event){
    if((event.key==="s" || event.key==="S") && started==false){
       nextSequence();
       started=true;
    }
})

function nextSequence(){
    level++;
    document.querySelector("h1").textContent="Level "+level;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio("sounds/"+randomChosenColor+".mp3");
}

function playAudio(audioPath){
    var audio=new Audio(audioPath);
    audio.play();
}

$(".btn").click(function(){
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    playAudio("sounds/"+userChosenColor+".mp3");
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColor){
    currentColor="#"+currentColor;
    $(currentColor).addClass("pressed");
    setTimeout(function(){
        document.querySelector(currentColor).classList.remove("pressed")
    },100);
}

function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.toString()===gamePattern.toString()){
            console.log("Success...")
            setTimeout(function(){
                userClickedPattern=[];
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");
        playAudio("sounds/wrong.mp3");
        document.body.classList.add("game-over");
        setTimeout(function(){
            document.body.classList.remove("game-over");
        },500)
        document.querySelector("h1").textContent="Game over, Press S to Restart";
        reStart();
    }
}

function reStart(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}