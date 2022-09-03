var colorArray = ["green","red","yellow","blue"]; // Declare the list of colors available
var gamePattern = []; // Declare the data of game pattern initially
var ButtonClickedPattern = []; // Declare the data of buttons clicked pattern initially
var level; // Declare the initial game level

// The function generate when a new game is restart
function NewGame (){

    $("h1").text("Press A Key  To Start");

    // Add event handler when pressing a key
    document.addEventListener("keypress", function(evt){
        
        //Set the heading to current level
        level = gamePattern.length + 1;
    
        //Calling the function to generate new round
        setTimeout(function(){
            $("h1").text("Level " + level);
            nextSequence();
        }, 600);
    });
};

// Call the new game function for the first time
NewGame();

//Declare event handler for each button
/* Green Button event handler */
$(".green").click(function() {

    //Playing the sound every time clicking
    PlaySound("green");

    //Adding the clicking effects for the button
    ButtonEffects("green");

    //Adding the clicked button to the Pattern
    ButtonClickedPattern.push("green");

    //Checking the answer if it is correct
    GameCheckingAnswer();
});

/* red Button event handler */
$(".red").click(function() {

    //Playing the sound every time clicking
    PlaySound("red");

    //Adding the clicking effects for the button
    ButtonEffects("red");

    //Adding the clicked button to the Pattern
    ButtonClickedPattern.push("red");

    //Checking the answer if it is correct
    GameCheckingAnswer();
});

/* yellow Button event handler */
$(".yellow").click(function() {

    //Playing the sound every time clicking
    PlaySound("yellow");

    //Adding the clicking effects for the button
    ButtonEffects("yellow");

    //Adding the clicked button to the Pattern
    ButtonClickedPattern.push("yellow");

    //Checking the answer if it is correct
    GameCheckingAnswer();
});

/* blue Button event handler */
$(".blue").click(function() {

    //Playing the sound every time clicking
    PlaySound("blue");

    //Adding the clicking effects for the button
    ButtonEffects("blue");

    //Adding the clicked button to the Pattern
    ButtonClickedPattern.push("blue");

    //Checking the answer if it is correct
    GameCheckingAnswer();
});

// This is the function using to play sound every time the button is selected
function PlaySound (color) {
    var soundURL = "sounds/" + color + ".mp3";
    var audio = new Audio(soundURL);
    audio.play();
};

// This is the function using to add effect every time the button is selected
function ButtonEffects(color) {
    var TargetButton = $("."+color);
    TargetButton.addClass("pressed");
    setTimeout(function() {
        TargetButton.removeClass("pressed");
    }, 150);
};

// This is the function using to generate the new level of the game
function nextSequence() {
    
    /* Declare a new random number between 0 - 3
    and match the random color from the list by this index*/
    var randomNumber = Math.round(Math.random()*3);
    var randomColor = colorArray[randomNumber];
    
    PlaySound(randomColor); // Play sound when new random button is generated
    ButtonEffects(randomColor); // Add effect when new random button is generated
    gamePattern.push(randomColor); // Add the new random color generated to the game pattern data
    ButtonClickedPattern = []; // Clear the list of buttons that user has clicked when new sequence is generated
};

// This is the function using to check if the game is over or keep going
function GameCheckingAnswer(){
    // This is to check if we have clicked the button as many times as the current level
    if(gamePattern.length === ButtonClickedPattern.length)
    {
        // Compare the current game pattern with the buttons that user have clicked
        if(JSON.stringify(ButtonClickedPattern) == JSON.stringify(gamePattern))
        { // If the user pressed the correct buttons
            console.log("True");
            console.log(ButtonClickedPattern);
            level = gamePattern.length + 1; // Increase the level indicator

            // Generate the next round of the game
            setTimeout(function() {
                $("h1").text("Level " + level);
                nextSequence();
                console.log(gamePattern);
            }, 800);
        } else { // The user did not press the correct buttons
            console.log("false");
            console.log(ButtonClickedPattern);
            GameOver();
        }
    } // The user has not clicked the buttons as many times as the current level 
    else {
        // Check every respective elements between the Button Pattern and the Game Pattern
        for (var i = 0; i < ButtonClickedPattern.length; i++)
        {
            if(ButtonClickedPattern[i] !== gamePattern[i]) // Pressed wrong button
            {
                console.log("False");
                GameOver(); // game over
            }
        }
    }
};

// This is the function generated when the game is over
function GameOver (){

    gamePattern = []; //clearing the game Pattern

    // Adding effects to the HTML when the user is game over
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    PlaySound("wrong");
};
