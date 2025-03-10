// ───── ByteShifter ─────
// Crafted with 💻 & ☕
// github.com/YourGitHubUsername

let secretWord = "";
let guessedWord = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;
let timer;
let timeLeft = 10;
let gameOverFlag = false;

const hangmanStages = [
`  
  -----
  |   |
      |
      |
      |
      |
=========`, 
`  
  -----
  |   |
  O   |
      |
      |
      |
=========`, 
`  
  -----
  |   |
  O   |
  |   |
      |
      |
=========`, 
`  
  -----
  |   |
  O   |
 /|   |
      |
      |
=========`, 
`  
  -----
  |   |
  O   |
 /|\\  |
      |
      |
=========`, 
`  
  -----
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`, 
`  
  -----
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
GAME OVER`
];

document.getElementById("setWord").addEventListener("click", () => {
    let input = document.getElementById("wordInput").value.trim().toUpperCase();

    if (input.length < 3 || input.length > 15) {
        document.getElementById("wordError").style.display = "block";
        return;
    }

    document.getElementById("wordError").style.display = "none";
    secretWord = input;
    guessedWord = Array(secretWord.length).fill("-");
    document.getElementById("wordDisplay").innerText = guessedWord.join("");
    document.getElementById("player1").style.display = "none";
    document.getElementById("player2").style.display = "block";
document.getElementById("letterInput").focus(); // Auto-focus on the input box

    startTimer();
});

document.getElementById("guessLetter").addEventListener("click", handleGuess);
document.getElementById("letterInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleGuess();
    }
});


function handleGuess() {
    if (gameOverFlag) return;

    let letter = document.getElementById("letterInput").value.trim().toUpperCase();
    document.getElementById("letterInput").value = "";

    if (letter.length !== 1 || !/^[A-Z]$/.test(letter)) {
        alert("Enter a single letter.");
        return;
    }

    if (secretWord.includes(letter)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        document.getElementById("wordDisplay").innerText = guessedWord.join("");
    } else {
        wrongGuesses++;
        document.getElementById("wrongGuesses").innerText = `${wrongGuesses}/6`;
        document.getElementById("hangmanDrawing").innerText = hangmanStages[wrongGuesses];
    }

    if (!guessedWord.includes("-")) {
        gameOver("🎉 You Win!");
    } else if (wrongGuesses >= maxWrongGuesses) {
        gameOver("💀 You Lose!");
        document.body.classList.add("shake");
        startSkullEffect();
    }
}

function startSkullEffect() {
    let skullContainer = document.getElementById("skullContainer");
    skullContainer.style.display = "block";

    for (let i = 0; i < 20; i++) {
        let skull = document.createElement("div");
        skull.classList.add("skull");
        skull.innerHTML = "💀";
        skull.style.left = Math.random() * 100 + "vw";
        skull.style.animationDelay = Math.random() * 2 + "s";
        skullContainer.appendChild(skull);
    }
}

function gameOver(message) {
    gameOverFlag = true;
    document.getElementById("feedback").innerText = message;
    document.getElementById("restart").style.display = "block";
}

document.getElementById("restart").addEventListener("click", () => {
    location.reload();
	function startConfetti() {
    let canvas = document.getElementById("confettiCanvas");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    let confetti = [];

    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 3 + 2
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((c, i) => {
            ctx.fillStyle = c.color;
            ctx.fillRect(c.x, c.y, c.size, c.size);
            c.y += c.speed;
            if (c.y > canvas.height) confetti[i].y = 0;
        });
        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();

    setTimeout(() => {
        canvas.style.display = "none";
    }, 5000);
}

});
window.onload = function () {
    document.getElementById("wordInput").focus();
};
