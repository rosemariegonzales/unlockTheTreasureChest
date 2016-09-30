/*
 Unlock The Treasure Chest
 Main Javascript File
 Created by Rosemarie Gonzales
 */

//Variables for the different DOM elements and game logic
var body;
var gameArea;
var gameIntro;
var startButton;
var lockContainer;
var lockCarouselArea;
var lockCarousel;
var upButton;
var chevronUp;
var downButton;
var chevronDown;
var lockNumber;
var unlockButton;
var carouselIndex1 = 0;
var carouselIndex2 = 0;
var carouselIndex3 = 0;
var lockCombination = [];

//Activate click handlers once the window loads
window.onload = function () {
    console.log('window loaded');
    document.getElementById("playButton").addEventListener("click", createGameArea);
    document.getElementById("howToPlayButton").addEventListener("click", displayHowToPlayModal);
    document.getElementById("aboutTheGameButton").addEventListener("click", displayAboutTheGameModal);
    document.getElementById("closeHowToPlay").addEventListener("click", closeHowToPlayModal);
    document.getElementById("closeAboutTheGame").addEventListener("click", closeAboutTheGameModal);
};

//When the "Play" button is clicked, dynamically create the game area
function createGameArea() {
    clickSound();
    body = document.body;
    body.innerHTML = "";
    gameArea = document.createElement("div");
    gameArea.id = "gameArea";
    gameIntro = document.createElement("div");
    gameIntro.id = "gameIntro";
    gameIntro.innerHTML = "Ahoy Matey! I'm Captain Smith! I found a treasure chest but I'm havin' a hard time opening it. Would 'ya like to help me? You need to guess the 3-digit combination to open the chest. No 2 numbers are the same. We split whatever is inside. C'mon now mate!";
    startButton = document.createElement("div");
    startButton.id = "startButton";
    startButton.setAttribute("class", "gameButton");
    startButton.innerHTML = "Start";
    gameArea.appendChild(gameIntro);
    gameArea.appendChild(startButton);
    body.appendChild(gameArea);
    startButton.addEventListener("click", startGame);
}

//Start the game
function startGame() {
    clickSound();
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#72d1f6";
    gameArea.innerHTML = "";
    generateLockCombination();
    createLockArea();
}

//Generate 3-digit lock combination
function generateLockCombination() {
    for (var i = 0; i < 3; i++) {
        var number = Math.floor(Math.random() * 10);
        lockCombination.push(number);
    }
    console.log('lock combination: ', lockCombination);
    checkLockCombination();
}

//Check if lock combination contains 2 same numbers
function checkLockCombination() {
    if (lockCombination[0] == lockCombination[1] ||
        lockCombination[0] == lockCombination[2] ||
        lockCombination[1] == lockCombination[2]) {
        lockCombination = [];
        generateLockCombination();
        console.log('generate lock again.. 2 same numbers present');
    } else {
        return lockCombination;
    }
}

//Create lock area
function createLockArea() {
    //Create container for the lock carousel
    lockContainer = document.createElement("div");
    lockContainer.id = "lockContainer";
    gameArea.appendChild(lockContainer);
    lockCarouselArea = document.createElement("div");
    lockCarouselArea.id = "lockCarouselArea";
    lockContainer.appendChild(lockCarouselArea);
    createLockCarousel();
    createUnlockButton();
}

//Create lock carousel
function createLockCarousel() {
    for (var x = 1; x <= 3; x++) {
        lockCarousel = document.createElement("div");
        lockCarousel.setAttribute("class", "lockCarousel");
        lockCarousel.id = "lockCarousel" + x;
        lockCarouselArea.appendChild(lockCarousel);

        //Create div element for "up" button
        upButton = document.createElement("div");
        upButton.id = "upButton" + x;
        upButton.setAttribute("class", "upButton");
        upButton.addEventListener("click", scrollNumber);
        chevronUp = document.createElement("i");
        chevronUp.setAttribute("class", "fa fa-chevron-up fa-2x");
        chevronUp.setAttribute("aria-hidden", "true");
        upButton.appendChild(chevronUp);
        lockCarousel.appendChild(upButton);

        //Create lock number
        for (var i = 0; i < 10; i++) {
            lockNumber = document.createElement("div");
            lockNumber.setAttribute("class", "lockNumber");
            lockNumber.innerHTML = i;
            lockCarousel.appendChild(lockNumber);
        }

        //Create "down" button
        downButton = document.createElement("div");
        downButton.id = "downButton" + x;
        downButton.setAttribute("class", "downButton");
        downButton.addEventListener("click", scrollNumber);
        chevronDown = document.createElement("i");
        chevronDown.setAttribute("class", "fa fa-chevron-down fa-2x");
        chevronDown.setAttribute("aria-hidden", "true");
        downButton.appendChild(chevronDown);
        lockCarousel.appendChild(downButton);

        //Hide numbers and only show "0 0 0"
        hideNumbers(lockCarousel.id);
        showNumber(lockCarousel.id, 0);
    }
}

//Create "Unlock" button
function createUnlockButton() {
    unlockButton = document.createElement("div");
    unlockButton.id = "unlockButton";
    unlockButton.setAttribute("class", "gameButton");
    unlockButton.innerHTML = "Unlock";
    unlockButton.addEventListener("click", unlock);
    lockContainer.appendChild(unlockButton);

}

//Hide numbers in lock carousel
function hideNumbers(lockCarouselId) {
    console.log("hideNumber function called");
    var hideNumbersCarousel = document.getElementById(lockCarouselId);
    var hideNumbersArray = hideNumbersCarousel.getElementsByClassName("lockNumber");
    for (var i = 0; i < hideNumbersArray.length; i++) {
        hideNumbersArray[i].setAttribute("class", "lockNumber"); //to make sure no div has class of "selected"
        hideNumbersArray[i].style.display = "none";
    }
    hideNumbersArray = null;
}

//Show number in lock carousel
function showNumber(lockCarouselId, index) {
    var showNumberCarousel = document.getElementById(lockCarouselId);
    var showNumberArray = showNumberCarousel.getElementsByClassName("lockNumber");
    showNumberArray[index].style.display = "inline-block";
    showNumberArray[index].setAttribute("class", "lockNumber selected");
}

//Scroll number in lock carousel
function scrollNumber() {
    clickSound();

    //Check whether to scroll up or down
    var n;
    if (this.getAttribute("class") == "upButton") {
        n = 1;
    }
    else if (this.getAttribute("class") == "downButton") {
        console.log("scroll down");
        n = -1;
    }

    //Identify which carousel to scroll
    var scrollThisCarousel = this.parentElement;
    switch (scrollThisCarousel.id) {
        case "lockCarousel1":
            console.log("carouselIndex1: ", carouselIndex1);
            hideNumbers(scrollThisCarousel.id);
            carouselIndex1 += n;
            carouselIndex1 = checkCarouselIndexValue(carouselIndex1);
            showNumber(scrollThisCarousel.id, carouselIndex1);
            console.log("carouselIndex1: ", carouselIndex1);
            break;
        case "lockCarousel2":
            console.log("carouselIndex2: ", carouselIndex2);
            hideNumbers(scrollThisCarousel.id);
            carouselIndex2 += n;
            carouselIndex2 = checkCarouselIndexValue(carouselIndex2);
            showNumber(scrollThisCarousel.id, carouselIndex2);
            console.log("carouselIndex2: ", carouselIndex2);
            break;
        case "lockCarousel3":
            console.log("carouselIndex3: ", carouselIndex3);
            hideNumbers(scrollThisCarousel.id);
            carouselIndex3 += n;
            carouselIndex3 = checkCarouselIndexValue(carouselIndex3);
            showNumber(scrollThisCarousel.id, carouselIndex3);
            console.log("carouselIndex3: ", carouselIndex3);
            break;
    }
}

//Check carousel index value
function checkCarouselIndexValue(index) {
    console.log("checkCarouselIndexValue function called");
    if (index > 9) {
        index = 0;
        return index;
    }
    else if (index < 0) {
        index = 9;
        return index;
    }
    else {
        return index;
    }
}

//When the "Unlock" button is clicked, check if chosen combination matches the winning combination
function unlock() {
    console.log('unlock function called');
    clickSound();
    var selectedNumbers = document.getElementsByClassName("selected");
    var selectedNumbersArray = [];
    for (var i = 0; i < selectedNumbers.length; i++) {
        selectedNumbersArray.push(selectedNumbers[i].innerHTML);
    }
    for (var x=0; x < selectedNumbersArray.length; x++) {
        if (selectedNumbersArray[x] == lockCombination[x]) {
            correctNumber++;
        }
    }
    console.log(selectedNumbersArray);
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
function clickSound() {
    var clickAudio = document.createElement("audio");
    clickAudio.src = "assets/clickOn.mp3";
    clickAudio.play();
}



