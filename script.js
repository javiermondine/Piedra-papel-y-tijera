let humanScore = 0;
let computerScore = 0;

const scoreDiv = document.getElementById('score');
const roundResultDiv = document.getElementById('round-result');
const finalResultDiv = document.getElementById('final-result');
const resetBtn = document.getElementById('reset-btn');
const buttons = document.querySelectorAll('.buttons button');

function getComputerChoice() {
    const randomNumber = Math.random();
    if (randomNumber < 0.33) {
        return "rock";
    } else if (randomNumber < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    let result = '';
    
    if (humanChoice === computerChoice) {
        result = `It's a tie! You both chose ${humanChoice}`;
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        result = `You win this round! ${humanChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        result = `You lose this round! ${computerChoice} beats ${humanChoice}`;
    }
    
    updateDisplay(result);
    checkWinner();
}

function updateDisplay(result) {
    roundResultDiv.textContent = result;
    scoreDiv.textContent = `You: ${humanScore} | Computer: ${computerScore}`;
}

function checkWinner() {
    if (humanScore === 5) {
        finalResultDiv.textContent = '🎉 You won the game! 🎉';
        endGame();
    } else if (computerScore === 5) {
        finalResultDiv.textContent = '💻 Computer won the game! 💻';
        endGame();
    }
}

function endGame() {
    buttons.forEach(button => button.disabled = true);
    resetBtn.style.display = 'inline-block';
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    roundResultDiv.textContent = '';
    finalResultDiv.textContent = '';
    scoreDiv.textContent = 'You: 0 | Computer: 0';
    buttons.forEach(button => button.disabled = false);
    resetBtn.style.display = 'none';
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        playRound(button.id);
    });
});

resetBtn.addEventListener('click', resetGame);
