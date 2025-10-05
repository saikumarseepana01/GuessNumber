document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const resetButton = document.getElementById('resetButton');
    const resultEl = document.getElementById('result');
    const scoreEl = document.getElementById('score');
    const highscoreEl = document.getElementById('highscore');
    const body = document.body;

    let secretNumber, score, highscore = 0,
        gameActive;

    const updateUI = () => {
        scoreEl.textContent = score;
        highscoreEl.textContent = highscore;
        guessInput.value = '';
    };

    const resetGame = () => {
        secretNumber = Math.floor(Math.random() * 30) + 1;
        score = 20;
        gameActive = true;
        resultEl.textContent = '';
        resultEl.classList.remove('correct', 'game-over');
        body.classList.remove('win', 'lose');
        guessInput.disabled = false;
        guessButton.disabled = false;
        updateUI();
    };

    const checkGuess = () => {
        if (!gameActive) return;

        const userGuess = Number(guessInput.value);

        if (!userGuess || userGuess < 1 || userGuess > 30) {
            resultEl.textContent = 'Please enter a valid number between 1 and 30.';
            return;
        }

        if (userGuess === secretNumber) {
            resultEl.textContent = `Correct! The number was ${secretNumber}.`;
            resultEl.classList.add('correct');
            body.classList.add('win');
            if (score > highscore) {
                highscore = score;
                highscoreEl.textContent = highscore;
            }
            gameActive = false;
            guessInput.disabled = true;
            guessButton.disabled = true;
        } else {
            if (score > 1) {
                score--;
                scoreEl.textContent = score;
                resultEl.textContent = userGuess < secretNumber ? 'Too low! Try again.' : 'Too high! Try again.';
            } else {
                score = 0;
                scoreEl.textContent = score;
                resultEl.textContent = `Game over! The number was ${secretNumber}.`;
                resultEl.classList.add('game-over');
                body.classList.add('lose');
                gameActive = false;
                guessInput.disabled = true;
                guessButton.disabled = true;
            }
        }
    };

    guessButton.addEventListener('click', checkGuess);
    resetButton.addEventListener('click', resetGame);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });

    // Initialize game
    resetGame();
});