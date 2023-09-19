let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let isGameStart = false;
let level = 0;

if($(window).width() <= 900){
    let text = `Press the Button Below to Start Game`;
    $("header").text(text);
}

let randomChoosenColor;
$(document).on("keypress",function(){
    if(!isGameStart){
        isGameStart = true;
        randomChoosenColor = nextSequence();
        let patternStartColor = buttonColors[randomChoosenColor];
        animatePress(patternStartColor);
        gamePattern.push(patternStartColor);
        playSound(patternStartColor);
    }
});

function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    let text = `level ${level}`;
    $("header").text(text);
    return randomNumber;
}

  let selectedButton;
  let buttons = $("button");

    buttons.on("click",function () {
    if(isGameStart)
    {
        let $userChoosenColor = $(this);
        playSound($userChoosenColor.attr("id"));
        
        userClickedPattern.push($userChoosenColor.attr("id"));

        animatePress($userChoosenColor.attr("id"));

        if(gamePattern.length != userClickedPattern.length)
        {
           let result = checkAnswer();

           if(!result)
           {
                gameOver();
           }
        }
        else if(level == 0)
        {
            let result = checkAnswer();
    
            if(!result)
            {
                 gameOver();
            }
            else{
                nextLevel();
            }
        }
        else
        {
            nextLevel();
        }
    }
  });

  function playSound(name) {
    const path = `./sounds/${name}.mp3`;

    let audioele = new Audio(path);
    audioele.play();
  }

  function animatePress(currentColor) {
    let button;
    for (let i = 0; i < 4; i++) {
      if ($(buttons[i]).attr("id") == currentColor) {
        button = buttons[i];
        break;
      }
    }

    $(button).addClass("pressed");
    setTimeout(() => {
      $("button").removeClass("pressed");
    }, 100);
  }


function checkAnswer()
{
    for(let i = 0; i < userClickedPattern.length; i++)
    {
        if(userClickedPattern[i] != gamePattern[i]){
            return false;
        }
    }

    return true;
}

function gameOver() {
    setTimeout(()=>{
        $("body").css("background-color", "red");
        $("header").text("Game Over");
      
        playSound("wrong");
    }, 1000);

  setTimeout(() => {
    location.reload();
  }, 3000);
}

function nextLevel() {
  level++;
  userClickedPattern = [];
  setTimeout(() => {
    let randomColor = nextSequence();
    playSound(buttonColors[randomColor]);
    animatePress(buttonColors[randomColor]);
    gamePattern.push(buttonColors[randomColor]);
  }, 2000);
}

// for Mobile Device
$("#start").click(function(){
    setTimeout(()=>{
        if(!isGameStart){
            $("#start").css("display", "none");
            isGameStart = true;
            randomChoosenColor = nextSequence();
            let patternStartColor = buttonColors[randomChoosenColor];
            animatePress(patternStartColor);
            gamePattern.push(patternStartColor);
            playSound(patternStartColor);
        }
    }, 1000);
});
