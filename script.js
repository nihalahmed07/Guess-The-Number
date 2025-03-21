let randomNumber, chances, isGameOver, countdown, timeLeft;
const winSound = document.getElementById('winSound');
const wrongSound = document.getElementById('wrongSound');
const bgMusic = document.getElementById('bgMusic');

function startGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  chances = 0;
  isGameOver = false;
  timeLeft = 60;
  document.getElementById('message').innerText = '';
  document.getElementById('score').innerText = '';
  document.getElementById('userGuess').value = '';
  startTimer();
  bgMusic.play();
  updateHighScore();
}

function checkGuess() {
  if (isGameOver) return;

  const userGuess = parseInt(document.getElementById('userGuess').value);
  const messageEl = document.getElementById('message');
  const scoreEl = document.getElementById('score');

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    messageEl.innerText = "⚠️ Enter a valid number between 1 and 100.";
    return;
  }

  chances++;

  if (userGuess === randomNumber) {
    winSound.play();
    launchConfetti();
    let score = 100 - chances;
    messageEl.innerText = "🎉 Congratulations! You guessed it right!";
    scoreEl.innerHTML = `Your Score: <strong>${score}</strong><br>Actual Number was: <strong>${randomNumber}</strong>`;
    saveHighScore(score);
    isGameOver = true;
    clearInterval(countdown);
  } else {
    wrongSound.play();
    messageEl.innerText = userGuess > randomNumber ? "⬇️ Too high! Try again." : "⬆️ Too low! Try again.";
  }

  document.getElementById('userGuess').value = '';
  saveAttempts();
}

function resetGame() {
  clearInterval(countdown);
  startGame();
}

function restartMusic() {
  bgMusic.currentTime = 0;
  bgMusic.play();
}

function startTimer() {
  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      isGameOver = true;
      document.getElementById('message').innerText = "⏰ Time's up! Game Over.";
      document.getElementById('score').innerHTML = `The number was: <strong>${randomNumber}</strong>`;
      bgMusic.pause();
    } else {
      document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
      timeLeft--;
    }
  }, 1000);
}

function launchConfetti() {
  const myConfetti = confetti.create(document.getElementById('confetti'), { resize: true });
  myConfetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}

function saveHighScore(currentScore) {
  let bestScore = localStorage.getItem('bestScore') || 0;
  if (currentScore > bestScore) {
    localStorage.setItem('bestScore', currentScore);
  }
  updateHighScore();
}

function updateHighScore() {
  let bestScore = localStorage.getItem('bestScore') || 0;
  document.getElementById('highScore').innerHTML = `🏆 Best Score: ${bestScore}`;
}

function saveAttempts() {
  localStorage.setItem('lastAttempts', chances);
}

// Start the game initially
startGame();
