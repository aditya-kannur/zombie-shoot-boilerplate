// Iteration 1: Declare variables required for this game

var gameElement = document.getElementById("game-body");
var initialTimer = document.getElementById("timer").textContent;
var livesDisplay = document.getElementById("lives");
var currentZombieId = 0;
const zombieImages = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
  ];
// Iteration 1.2: Add shotgun sound

const shotgunAudio = new Audio("https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav");
gameElement.onclick = () =>{
    shotgunAudio.pause();
    shotgunAudio.currentTime = 0;
    shotgunAudio.play();
}
// Iteration 1.3: Add background sound

const backgroundAudio = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3");
backgroundAudio.play();
backgroundAudio.loop = true;

// Iteration 1.4: Add lives

const maxLives = 4;
var remainingLives = 4;

// Iteration 2: Write a function to make a zombie

function createZombie(){
    var randomImage = zombieImages[getRandomInt(0, zombieImages.length)];
    gameElement.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${currentZombieId}">`;
    let zombieElement = document.getElementById("zombie" + currentZombieId);
    console.log(zombieElement);
    zombieElement.style.transform = `translateX(${getRandomInt(10, 80)}vw)`;
    zombieElement.style.animationDuration = `${getRandomInt(2, 6)}s`;
    zombieElement.onclick = () => {
        destroyZombie(zombieElement);
      };
}
// Iteration 3: Write a function to check if the player missed a zombie

function checkMissedZombie(zombieElement){
    if(zombieElement.getBoundingClientRect().top <= 0) {
        remainingLives--;
        return true;
    }
    return false;
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function destroyZombie(zombieElement){
    zombieElement.style.display = "none";
    currentZombieId++;
    createZombie();
}
// Iteration 5: Creating timer

var timerId = setInterval(function(){
        initialTimer--;
        document.getElementById("timer").textContent = initialTimer;
        let zombieElement = document.getElementById("zombie" + currentZombieId);
        if(checkMissedZombie(zombieElement) == true){
            destroyZombie(zombieElement);
            if (remainingLives == 0){
                clearInterval(timerId);
                window.location.href = "./game-over.html";
            }
        }
        if(initialTimer == 0){
            clearInterval(timerId);
            window.location.href = "./win.html";
        }
    }, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie

createZombie(currentZombieId);

// Iteration 7: Write the helper function to get random integer

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }
