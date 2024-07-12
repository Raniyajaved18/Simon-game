// Get all buttons
const buttons = document.querySelectorAll('.btn');
const message = document.querySelector('h2');

// Store the game state
let gameSequence = [];
let userSequence = [];
let level = 1;

// Display sequence to the user
function displaySequence(sequence) {
    // Disable button clicks during display
    buttons.forEach((button) => {
        button.removeEventListener('click', handleButtonClick);
    });

    sequence.forEach((buttonIndex, index) => {
        setTimeout(() => {
            animateButton(buttonIndex);
        }, (index + 1) * 1000);
    });

    // Re-enable button clicks after sequence display
    setTimeout(() => {
        buttons.forEach((button) => {
            button.addEventListener('click', handleButtonClick);
        });
        message.innerText = 'Your turn!';
    }, sequence.length * 1000 + 1000);
}

// Generate a random sequence
function generateSequence() {
    const sequence = [];
    for (let i = 0; i < level; i++) {
        sequence.push(Math.floor(Math.random() * 4) + 1);
    }
    return sequence;
}

// Check user's input against the current sequence
function checkInput() {
    const index = userSequence.length - 1;
    if (userSequence[index] !== gameSequence[index]) {
        endGame();
        return;
    }

    if (userSequence.length === gameSequence.length) {
        // User completed the sequence, proceed to the next level
        userSequence = [];
        level++;
        message.innerText = 'Correct! Next level.';
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
}

// Handle button click event
function handleButtonClick(event) {
    const buttonIndex = parseInt(event.target.innerText);
    animateButton(buttonIndex);
    userSequence.push(buttonIndex);
    checkInput();
}

// Animate button press
function animateButton(buttonIndex) {
    const button = buttons[buttonIndex - 1];
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 300);
}


// Start the game
function startGame() {
    level = 1;
    gameSequence = generateSequence();
    userSequence = [];
    message.innerText = 'Watch the sequence!';
    displaySequence(gameSequence);
}

// Proceed to the next level
function nextLevel() {
    gameSequence = generateSequence();
    displaySequence(gameSequence);
}

// End the game
function endGame() {
    message.innerText = `Game over! Your score: ${level - 1}. Press any key to restart.`;
    document.removeEventListener('keydown', startGame);
    document.addEventListener('keydown', restartGame);
}

// Restart the game
function restartGame() {
    document.removeEventListener('keydown', restartGame);
    document.addEventListener('keydown', startGame);
    startGame();
}

// Add event listener for button clicks
buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

// Add event listener for key press to start the game
document.addEventListener('keydown', startGame);
