/*-------------- UNLOCK THE TREASURE CHEST -------------*/
/* Main Javascript File. Created by Rosemarie Gonzales. */


//Variables for the different DOM elements and game logic
var body;
var gameArea;
var gameIntro;
var startButton;
var homeButton;
var messageContainer;
var lockContainer;
var lockCarouselArea;
var lockCarousel;
var upButton;
var chevronUp;
var downButton;
var chevronDown;
var lockNumber;
var unlockButton;
var hintButton;
var giveUpButton;
var timerDiv;
var second;
var minute;
var timer;
var carouselIndex1 = 0;
var carouselIndex2 = 0;
var carouselIndex3 = 0;
var lockCombination = [];
var selectedNumbers;
var selectedNumbersArray = [];
var message = [];
var match = false;
var counter = 0;
var correctNumbersArray = [];
var playAgainButton;


/*---------- DOM ELEMENT CREATION ----------*/

//Activate click handlers once the window loads
window.onload = function () {
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
    startButton.addEventListener("click", startGame);
    homeButton = document.createElement("div");
    homeButton.id = "homeButton";
    homeButton.setAttribute("class", "gameButton");
    homeButton.innerHTML = "Home";
    homeButton.addEventListener("click", reloadHomePage);
    gameArea.appendChild(gameIntro);
    gameArea.appendChild(startButton);
    gameArea.appendChild(homeButton);
    body.appendChild(gameArea);

}

//Start the game
function startGame() {
    clickSound();
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#72d1f6";
    gameArea.innerHTML = "";
    generateLockCombination();
    createLockArea();
    createHintButton();
    createGiveUpButton();
    createTimerDiv();
    startTimer();
}

//When "Home" button is click, reload page
function reloadHomePage() {
    clickSound();
    setTimeout(function(){location.reload()}, 300);
}

//Create lock area
function createLockArea() {
    //Create container for messages
    messageContainer = document.createElement("div");
    messageContainer.id = "messageContainer";
    message = []; //To make sure message array is empty
    message.push("Start guessing!");
    messageContainer.innerHTML = message[0];
    gameArea.appendChild(messageContainer);

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
    unlockButton.innerHTML = "Unlock";
    enableUnlockButton();
    lockContainer.appendChild(unlockButton);
}

//Create "Hint" button
function createHintButton() {
    hintButton = document.createElement("div");
    hintButton.id = "hintButton";
    hintButton.innerHTML = "Hint";
    hintButton.addEventListener("click", showHint);
    gameArea.appendChild(hintButton);
}

//Create "Give Up" button
function createGiveUpButton() {
    giveUpButton = document.createElement("div");
    giveUpButton.id = "giveUpButton";
    giveUpButton.innerHTML = "Give Up";
    giveUpButton.addEventListener("click", giveUp);
    gameArea.appendChild(giveUpButton);
}

//Create div element to display timer
function createTimerDiv() {
    timerDiv = document.createElement("div");
    timerDiv.id = "timer";
    second = 0;
    minute = 0;
    timerDiv.innerHTML = minute + " min : " + second + " sec";
    gameArea.appendChild(timerDiv);
}


/*---------- GAME LOGIC ----------*/

//Generate 3-digit lock combination
function generateLockCombination() {
    lockCombination = []; //To make sure lockCombination array is empty
    for (var i = 0; i < 3; i++) {
        var number = Math.floor(Math.random() * 10);
        lockCombination.push(number);
    }
    checkLockCombination();
}

//Check if lock combination contains 2 same numbers
function checkLockCombination() {
    if (lockCombination[0] == lockCombination[1] ||
        lockCombination[0] == lockCombination[2] ||
        lockCombination[1] == lockCombination[2]) {
        lockCombination = [];
        generateLockCombination();
    } else {
        return lockCombination;
    }
}

//Hide numbers in lock carousel
function hideNumbers(lockCarouselId) {
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
    hideMessage();
    enableUnlockButton();
    removeErrorClass();

    //Check whether to scroll up or down
    var n;
    if (this.getAttribute("class") == "upButton") {
        n = 1;
    }
    else if (this.getAttribute("class") == "downButton") {
        n = -1;
    }

    //Identify which carousel to scroll
    var scrollThisCarousel = this.parentElement;
    switch (scrollThisCarousel.id) {
        case "lockCarousel1":
            hideNumbers(scrollThisCarousel.id);
            carouselIndex1 += n;
            carouselIndex1 = checkCarouselIndexValue(carouselIndex1);
            showNumber(scrollThisCarousel.id, carouselIndex1);
            break;
        case "lockCarousel2":
            hideNumbers(scrollThisCarousel.id);
            carouselIndex2 += n;
            carouselIndex2 = checkCarouselIndexValue(carouselIndex2);
            showNumber(scrollThisCarousel.id, carouselIndex2);
            break;
        case "lockCarousel3":
            hideNumbers(scrollThisCarousel.id);
            carouselIndex3 += n;
            carouselIndex3 = checkCarouselIndexValue(carouselIndex3);
            showNumber(scrollThisCarousel.id, carouselIndex3);
            break;
    }
}

//Check carousel index value
function checkCarouselIndexValue(index) {
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

//Hide message container
function hideMessage() {
    messageContainer.style.visibility = "hidden";
}

//Show message container
function showMessage() {
    messageContainer.style.visibility = "visible";
}

//When the "Unlock" button is clicked, get selected numbers and run function to check matches
function unlock() {
    disableUnlockButton();
    clickSound();
    hideMessage();
    correctNumbersArray = [];
    selectedNumbers = document.getElementsByClassName("selected");
    selectedNumbersArray = [];
    message = [];
    for (var i = 0; i < selectedNumbers.length; i++) {
        selectedNumbersArray.push(selectedNumbers[i].innerHTML);
    }
    checkMatches();
}

//Enable "Unlock" button
function enableUnlockButton() {
    unlockButton.addEventListener("click", unlock);
    unlockButton.setAttribute("class", "gameButton");
}

//Disable "Unlock" button
function disableUnlockButton() {
    unlockButton.removeEventListener("click", unlock);
    unlockButton.setAttribute("class", "gameButton disabled");
}

//Check if chosen combination matches the computer-generated lock combination
function checkMatches() {
    for (var i = 0; i < selectedNumbersArray.length; i++) {
        if (selectedNumbersArray[i] == lockCombination[i]) {
            counter++;
            correctNumbersArray.push(selectedNumbers[i]);
        }
    }
    if (counter == 3) {
        match = true;
        counter = 0;
        stopTimer();
        message.push("Yay! You did it mate!");
        winningState();

    }
    else if (counter == 0) {
        message.push("Sorry, mate. Try Again!");
        tryAgainState();
    }
    else {
        if (selectedNumbersArray[0] == lockCombination[0]) {
            message.push("You got the first number! ");
        }
        if (selectedNumbersArray[1] == lockCombination[1]) {
            message.push("The second number is correct. ");
        }
        if (selectedNumbersArray[2] == lockCombination[2]) {
            message.push("You got the third number right.")
        }
        counter = 0;
        almostWinningState();
    }
}

//Change display to winning state
function winningState() {
    tadaSound();
    applyCorrectClass();
    var youDidItMessage = document.createElement("div");
    youDidItMessage.setAttribute("class", "winnerMessage");
    youDidItMessage.innerHTML = message[0];
    messageContainer.innerHTML = "";
    messageContainer.appendChild(youDidItMessage);
    showMessage();
    setTimeout(displayOpenTreasureChest, 2000);
}

//Display "try again" when there is no matching number
function tryAgainState() {
    sorrySound();
    for (var i = 0; i < selectedNumbers.length; i++) {
        selectedNumbers[i].setAttribute("class", "lockNumber selected error");
    }
    var tryAgainMessage = document.createElement("div");
    tryAgainMessage.setAttribute("class", "errorMessage");
    tryAgainMessage.innerHTML = message[0];
    messageContainer.innerHTML = "";
    messageContainer.appendChild(tryAgainMessage);
    showMessage();
}

//Display which number matches the lock combination
function almostWinningState() {
    chimeSound();
    applyCorrectClass();
    var correctNumberMessage = document.createElement("div");
    correctNumberMessage.setAttribute("class", "correctMessage");
    for (var x = 0; x < message.length; x++) {
        correctNumberMessage.innerHTML += message[x];
    }
    messageContainer.innerHTML = "";
    messageContainer.appendChild(correctNumberMessage);
    showMessage();
}

//Remove "error" class in currently displayed numbers
function removeErrorClass() {
    var errorClass = document.getElementsByClassName("error");
    while (errorClass.length != 0) {
        for (var i = 0; i < errorClass.length; i++) {
            errorClass[i].setAttribute("class", "lockNumber selected");
        }
        errorClass = document.getElementsByClassName("error");
    }
}

//Apply "correct" class to numbers currently displayed and match numbers in lock combination
function applyCorrectClass() {
    for (var i = 0; i < correctNumbersArray.length; i++) {
        correctNumbersArray[i].setAttribute("class", "lockNumber selected correct");
    }
}

//Display open treasure chest
function displayOpenTreasureChest() {
    lockContainer.parentNode.removeChild(lockContainer);
    hintButton.parentNode.removeChild(hintButton);
    giveUpButton.parentNode.removeChild(giveUpButton);
    timerDiv.parentNode.removeChild(timerDiv);
    var openTreasureChestDiv = document.createElement("div");
    openTreasureChestDiv.id = "openTreasureChest";
    var openTreasureChest = document.createElement("img");
    openTreasureChest.setAttribute("src", "assets/openTreasureChest.png");
    openTreasureChestDiv.appendChild(openTreasureChest);
    gameArea.appendChild(openTreasureChestDiv);
    var totalTimeMessage = document.createElement("div");
    totalTimeMessage.style.fontSize = "2.5vw";
    totalTimeMessage.innerHTML = "Total time it took you to unlock the chest is  " + minute + "-min : " + second + "-sec.";
    gameArea.appendChild(totalTimeMessage);
}

//Show hint
function showHint() {
    clickSound();
    var hint = 0;
    for (var i = 0; i < lockCombination.length; i++) {
        hint += lockCombination[i];
    }
    message = [];
    message.push("The sum of all 3 numbers is " + hint.toString());
    messageContainer.innerHTML = "";
    messageContainer.innerHTML = message[0];
    showMessage();
}

//Run this function when "Give Up" button is clicked
function giveUp() {
    stopTimer();
    clickSound();
    message = [];
    message.push("Oh well.. Here is the lock combination:");
    messageContainer.innerHTML = "";
    messageContainer.innerHTML = message[0];
    messageContainer.style.marginTop = "8vh";
    messageContainer.style.marginBottom = "8vh";
    showMessage();

    //Remove div elements containing lock carousel, "Hint" button, "Give Up" button and timer
    lockContainer.parentNode.removeChild(lockContainer);
    hintButton.parentNode.removeChild(hintButton);
    giveUpButton.parentNode.removeChild(giveUpButton);
    timerDiv.parentNode.removeChild(timerDiv);

    //Show lock combination
    for (var i = 0; i < lockCombination.length; i++) {
        var number = document.createElement("div");
        number.setAttribute("class", "lockNumber");
        number.style.display = "inline-block";
        number.innerHTML = lockCombination[i];
        gameArea.appendChild(number);
    }

    //Create "Play Again" button (reset game)
    playAgainButton = document.createElement("div");
    playAgainButton.setAttribute("class", "gameButton");
    playAgainButton.innerHTML = "Play Again";
    playAgainButton.addEventListener("click", startGame);
    gameArea.appendChild(playAgainButton);
}

function startTimer() {
    second = 0;
    minute = 0;
    timer = setInterval(setTimer, 1000);
}

function setTimer() {
    second += 1;
    if (second == 60) {
        minute += 1;
        second = 0;
    }
    timerDiv.innerHTML = minute + " min : " + second + " sec";
}

function stopTimer() {
    clearInterval(timer);
}


/*---------- MODALS ----------*/

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


/*---------- SOUND EFFECTS ----------*/

//Click sound effect
function clickSound() {
    var clickAudio = document.createElement("audio");
    clickAudio.src = "assets/clickOn.mp3";
    clickAudio.play();
}

//Try again sound effect
function sorrySound() {
    var sorryAudio = document.createElement("audio");
    sorryAudio.src = "assets/sowee.mp3";
    sorryAudio.play();
}

//Winner sound effect
function tadaSound() {
    var tadaAudio = document.createElement("audio");
    tadaAudio.src = "assets/TaDa.mp3";
    tadaAudio.play();
}

//Chime sound effect
function chimeSound() {
    var chimeAudio = document.createElement("audio");
    chimeAudio.src = "assets/chime.mp3";
    chimeAudio.play();
}




