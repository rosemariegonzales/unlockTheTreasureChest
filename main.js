
var closeHowToPlayButton = document.getElementById("closeHowToPlay");
var closeAboutTheGameButton = document.getElementById("closeAboutTheGame");

//Activate click handlers once the window loads
window.onload = function (){
    console.log('window loaded');
    document.getElementById("playButton").addEventListener("click", play);
    document.getElementById("howToPlayButton").addEventListener("click", displayHowToPlayModal);
    document.getElementById("aboutTheGameButton").addEventListener("click", displayAboutTheGameModal);
    document.getElementById("closeHowToPlay").addEventListener("click", closeHowToPlayModal);
    document.getElementById("closeAboutTheGame").addEventListener("click", closeAboutTheGameModal);
};


//Play the game
function play() {
    console.log ("called play function");
    clickSound();
}

//Display the "How To Play" Modal
function displayHowToPlayModal() {
    clickSound();
    document.getElementById("howToPlay").style.display = "inline-block";
    document.getElementById("gameButtonsContainer").style.display = "none";
}

//Display the "About The Game" Modal
function displayAboutTheGameModal() {
    clickSound();
    document.getElementById("aboutTheGame").style.display = "inline-block";
    document.getElementById("gameButtonsContainer").style.display = "none";

}

//Close "How To Play" Modal
function closeHowToPlayModal() {
    clickSound();
    document.getElementById("howToPlay").style.display = "none";
    document.getElementById("gameButtonsContainer").style.display = "block";
}

//Close "About the Game" Modal
function closeAboutTheGameModal() {
    clickSound();
    document.getElementById("aboutTheGame").style.display = "none";
    document.getElementById("gameButtonsContainer").style.display = "block";
}


//Click sound effect
function clickSound (){
    var clickAudio = document.createElement("audio");
    clickAudio.src = "assets/clickOn.mp3";
    clickAudio.play();
}

