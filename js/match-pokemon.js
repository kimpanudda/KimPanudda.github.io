

//Global variables
let difficulty = 0;
let numberOfPokemon = parseInt(difficulty);
let currentScore = 0;
let highScore = 0;
let counter = 15;
let gameTimer;
const theLeftSide = document.getElementById('leftSide');
const theRightSide = document.getElementById('rightSide');
const differentPokemon = ['pikachu.svg', 'squirtle.svg', 'bulbasaur.svg', 'charmander.svg', 'jigglypuff.svg', 'eevee.svg'];
const difficultySetting = document.getElementById('difficultySetting');


//audio
var gameOpenMusic = document.getElementById('open-music');
var gameWinMusic = document.getElementById('pokemon-victory')
var gameOverMusic = document.getElementById('gameover-music')

//score board
const scoreBoard = document.querySelector('.score-board-left');
const timerBoard = document.querySelector('.score-board-right');
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');
const high = document.querySelector('.highscore');


// Set Difficulty Modal

let modal = document.getElementById('myModal');
function openModal() { modal.style.display = 'block'; }
function closeModal() {
    debugger;
    modal.style.display = 'none';
    difficulty = difficultySetting.value;
    event.preventDefault();
    newGame();
}

// Game Over Modal

let gameOverModal = document.getElementById('gameover-modal');
function openGameOver() { gameOverModal.style.display = 'block'; }
function closeGameOver() { gameOverModal.style.display = 'none'; }


function setDifficulty() {
    modal.style.display = 'none';
    document.getElementById('score').innerHTML = 0;
    numberOfPokemon = parseInt(difficulty);
    stopTimer();
    startTimer(15);

    event.stopPropagation();

    while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
    }

    while (theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild);
    }
    debugger;
    startOpenMusic();
    generatePokemon();
    counter = 15;
    currentScore = 0;
}


// X to close Modal
let span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = 'none';
}


// play audio
function startOpenMusic() {
    gameOpenMusic.play();
    gameOpenMusic.volume = 0.4;
}

function stopOpenMusic() {
    gameOpenMusic.pause();
}

function startWinMusic() {
    gameWinMusic.play();
    gameWinMusic.volume = 1.0;
}

function playGameOver() {
    gameOverMusic.play();
    gameOverMusic.volume = 0.8;
}



//calculate current score
function calcCurrentScore() {
    currentScore = numberOfPokemon * 10;
    document.getElementById('score').innerHTML = currentScore;
}


// generate Pokemon
function generatePokemon() {

    event.stopPropagation();

    for (let i = 0; i < numberOfPokemon; i++) {
        let randomFaces = Math.floor(Math.random() * differentPokemon.length);
        let face = document.createElement('img');
        face.src = 'img/' + differentPokemon[randomFaces];
        const randomTop = Math.floor((Math.random() * 400) + 1);
        const randomLeft = Math.floor((Math.random() * 400) + 1);
        face.style.top = randomTop + 'px';
        face.style.left = randomLeft + 'px';
        theLeftSide.appendChild(face);
    }

    
    const leftSideImages = theLeftSide.cloneNode(true);
    leftSideImages.removeChild(leftSideImages.lastChild);
    theRightSide.appendChild(leftSideImages);

    theLeftSide.lastChild.addEventListener('click', nextLevel);
    // document.body.addEventListener('click', gameOver);
    document.getElementById('leftSide').addEventListener('click', gameOver);
    document.getElementById('rightSide').addEventListener('click', gameOver);
}


//next level
function nextLevel(event) {
    startWinMusic();
    calcCurrentScore();
    // event.stopPropagation();
    numberOfPokemon += parseInt(difficulty);
    counter += 10;

    while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
    }

    while (theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild);
    }
    generatePokemon();
}


// gameover
function gameOver() {
    playGameOver();
    stopTimer();
    checkIfHighScore();
    openGameOver();
    theLeftSide.lastChild.removeEventListener('click', nextLevel);
    document.body.removeEventListener('click', gameOver);
    stopOpenMusic();
}


//restart
const restart = document.getElementById('restart');
restart.addEventListener('click', newGame);



function newGame() {
    stopTimer();
    event.stopPropagation();
    // document.getElementById('seconds').innerHTML = '00:00';
    startTimer(15);
    document.getElementById('score').innerHTML = 0;
    numberOfPokemon = parseInt(difficulty);

    while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
    }

    while (theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild);
    }
    generatePokemon();
    startOpenMusic();

}

function checkIfHighScore() {
    if (currentScore >= highScore) {
        highScore = currentScore;
        document.getElementById('high-score').innerHTML = highScore;
    }
}

// timer functions and countdown
function startTimer(newTime) {
    counter = newTime;
    document.getElementById('seconds').innerHTML = '00:00';
    gameTimer = setInterval(function () {
        document.getElementById('seconds').innerHTML = timeConverter(counter);
        console.log(counter);
        counter--;
        if (counter <= -1) {
            clearInterval(gameTimer);
            document.getElementById('seconds').innerHTML = '00:00';
            gameOver();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(gameTimer);
    document.getElementById('seconds').innerHTML = '00:00';
}

function timeConverter(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = (seconds % 60);
    return `${(minutes < 10 ? "0" : "")}${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}


