// Global Variables
let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = '';
const song = new Audio("../assets/mtfc.mp3");

// DOM Elements
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

// Event Listeners for Difficulty Selection
document.getElementById("easy").addEventListener("click", () => difSelect("easy"));
document.getElementById("normal").addEventListener("click", () => difSelect("normal"));
document.getElementById("hard").addEventListener("click", () => difSelect("hard"));

// Event Listener for Start Button
startButton.addEventListener("click", startGame);

// Functions

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  } else {
    console.error("Invalid difficulty");
    return 1000; // Default is normal
  }
}

function chooseHole(holes) {
  let index = randomInteger(0, holes.length - 1); 
  let hole = holes[index];
  
  if (hole === lastHole) {
    return chooseHole(holes);
  }  
  lastHole = hole;
  return hole;
}

function setEventListeners() {
  moles.forEach(mole => mole.addEventListener("click", whack)); // Attach whack to moles
}

function toggleVisibility(hole){
  hole.classList.toggle("show");
  return hole;
}

function showAndHide(hole, delay){
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay); 
  return timeoutID;
}

function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function updateScore() {
  points++;
  score.textContent = points;
  return points;  
}

function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

function startTimer() {
  updateTimer(); // Update timer immediately
  timer = setInterval(updateTimer, 1000);
}

function hitSound() {
  const audio = new Audio("../assets/grunt.mp3"); 
  audio.play();
}

function startAudio(song) {
  song.play();
  song.loop = true;
}

function stopAudio(song) {
  song.pause();
  song.load();
}

function stopGame() {
  stopAudio(song);  
  clearInterval(timer);
  menuShow(); 
  return "game stopped";
}

function startGame() {
  setDuration(30);
  showUp();
  startAudio(song);
  points = 0;
  clearScore();
  startTimer();
  setEventListeners();
  menuHide(); 
  setDelay(difficulty);
  return "game started";
}

function gameOver() {
  if (time > 0) {
    let timeoutID = showUp();
    return timeoutID; 
  } else {
    let gameStopped = stopGame();
    return gameStopped;
  }
}

function difSelect(newDifficulty) {
  difficulty = newDifficulty; 
}

function setDuration(duration) {
  time = duration;
  return time;
}

function menuHide() {
  const moleSpeedContainer = document.getElementById('moleSpeed');
  const clickStart = document.getElementById('startTitle');
  const pressStart = document.getElementById('start');
    moleSpeedContainer.style.visibility = 'hidden';
    clickStart.style.visibility = 'hidden';
    pressStart.style.visibility = 'hidden';
  } 

function menuShow() {
  const moleSpeedContainer = document.getElementById('moleSpeed');
  const clickStart = document.getElementById('startTitle');
  const pressStart = document.getElementById('start');
    moleSpeedContainer.style.visibility = 'visible';
    clickStart.style.visibility = 'visible';
    pressStart.style.visibility = 'visible';
  } 

// Mole whacking function, sound and point registry
function whack(event) {
  hitSound(); 
  const updatedScore = updateScore(); 
  return updatedScore;
}



// Exports for Testing
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
