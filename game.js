$(document).ready(function() {
    const buttonColours  = ["red", "blue", "green", "yellow"];
    let gamePattern =[];
    let userClickedPattern = [];

    function nextSequence() {   
        userClickedPattern = [];
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        let choseBtn = $(`#${randomChosenColour}`); 
        choseBtn.fadeOut(300).fadeIn(300); 
        
        // Play sound 
        playSound(randomChosenColour); 
        level++; 
        $("#level-title").text(`Level ${level}`);
        userClicked=0;
    }  

    let userClicked = 0;
    $(".btn").click(function() {
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        // Play Sound
        playSound(userChosenColour);

        // Animation Press
        animatePress(userChosenColour);

        // Check Answer 
        userClicked++;
        checkAnswer(userClicked);
    }) 

    function playSound(name) {
        // Play audio  
        let audio = new Audio(`sounds/${name}.mp3`);
        audio.play();
    }

    function animatePress(currentColour) {
        let currentBtn = $(`.${currentColour}`);
        currentBtn.addClass("pressed");
        setTimeout(function() {
            currentBtn.removeClass("pressed");
        },100)
    }  

    // Check game started
    let started = false; 
    
    // Level
    let level = -1;

    $(document).keypress(function() {
        if (started === false) {
            nextSequence();
            started = true;
        }
    }) 

    function checkAnswer(currentLevel) {     
        console.log(gamePattern);
        console.log(userClickedPattern);
        if (gamePattern[currentLevel-1] !== userClickedPattern[currentLevel-1]) {
            let audio = new Audio("sounds/wrong.mp3");
            audio.play(); 
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            },100);
            startOver(); 
        }   
        if (currentLevel == level + 1) {
            setTimeout(nextSequence,1000); 
        }
    }
    // Restart The Game
    function startOver() {
        level = -1;
        gamePattern = [];
        started = false;
    }
})