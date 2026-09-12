const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const modeSelect = document.getElementById('modeSelect');
const resetBtn = document.getElementById('resetBtn');

let grid = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let currentSymbol = 'X'; // X always goes first
let isGameOver = false;

// Initialize the game board UI
function initGame() {
    grid = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    currentSymbol = 'X';
    isGameOver = false;
    statusElement.textContent = "Player X's turn";
    boardElement.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }

    // In Mode 1, Computer is 'X' and plays first
    if (modeSelect.value === '1' && currentSymbol === 'X') {
        setTimeout(makeBestComputerMove, 100);
    }
}

// Handle human clicks
function handleCellClick(e) {
    if (isGameOver) return;
    
    const index = e.target.dataset.index;
    
    // Check if cell is available (is a digit)
    if (!isNaN(grid[index])) {
        makeMove(index, currentSymbol);
        
        if (!isGameOver && modeSelect.value === '1') {
            setTimeout(makeBestComputerMove, 200);
        }
    }
}

// Update state and UI
function makeMove(index, symbol) {
    grid[index] = symbol;
    
    const cell = boardElement.children[index];
    cell.textContent = symbol;
    cell.classList.add(symbol.toLowerCase());

    const winner = checkWin(grid);
    if (winner !== 'N') {
        statusElement.textContent = `WINNER: Player ${winner}!`;
        isGameOver = true;
        return;
    }
    
    if (isFull(grid)) {
        statusElement.textContent = "It's a Draw!";
        isGameOver = true;
        return;
    }

    // Switch turns
    currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentSymbol}'s turn`;
}

// Computer Move Logic
function makeBestComputerMove() {
    if (isGameOver) return;
    
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (!isNaN(grid[i])) { // isAvailable
            let temp = grid[i]; // Store original number
            grid[i] = 'X'; // make move
            let score = minimax(grid, 0, false); // calculate score
            grid[i] = temp; // undo move

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    if (bestMove !== -1) {
        makeMove(bestMove, 'X');
    }
}

function minimax(currentGrid, depth, isMaximizing) {
    let result = checkWin(currentGrid);
    
    if (result === 'X') return 10 - depth; // computer wins
    if (result === 'O') return -10 + depth; // human wins
    if (isFull(currentGrid)) return 0; // draw

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!isNaN(currentGrid[i])) {
                let temp = currentGrid[i];
                currentGrid[i] = 'X';
                let score = minimax(currentGrid, depth + 1, false);
                currentGrid[i] = temp;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!isNaN(currentGrid[i])) {
                let temp = currentGrid[i];
                currentGrid[i] = 'O';
                let score = minimax(currentGrid, depth + 1, true);
                currentGrid[i] = temp;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Translated from Board.java checkWin()
function checkWin(g) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (g[a] === g[b] && g[b] === g[c] && isNaN(g[a])) {
            return g[a];
        }
    }
    return 'N';
}

// Translated from Board.java isFull()
function isFull(g) {
    return g.every(cell => isNaN(cell));
}

// Event Listeners
resetBtn.addEventListener('click', initGame);
modeSelect.addEventListener('change', initGame);

// Start game on load
initGame();