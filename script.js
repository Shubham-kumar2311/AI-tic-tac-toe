const btns = document.querySelectorAll(".btn");
const resetBtn = document.querySelector(".reset");
const win = document.querySelector(".win");
const difficultySelect = document.querySelector(".difficulty");

let turn = "X";
let ct = 0;
let board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."]
];
const ai = "O";
const player = "X";

const winningStates = [
    [[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]], // Rows
    [[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]], // Columns
    [[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]] // Diagonals
];

function heuristic(board, ai, difficulty) {
    const opponent = ai === "X" ? "O" : "X";
    let score = 0;

    for (let state of winningStates) {
        const [[a0, a1], [b0, b1], [c0, c1]] = state;
        const a = board[a0][a1], b = board[b0][b1], c = board[c0][c1];

        // Count potential wins
        if (a !== opponent && b !== opponent && c !== opponent) {
            score += (a === ai) + (b === ai) + (c === ai);
        }
        // Count potential blocks
        if (a !== ai && b !== ai && c !== ai) {
            score -= (a === opponent) + (b === opponent) + (c === opponent);
        }
    }

    // Adjust heuristic based on difficulty
    if (difficulty === "easy") {
        score = score * 0.5; // Less aggressive
    } else if (difficulty === "medium") {
        score = score * 1; // Balanced
    } else { // hard
        score = score * 2; // More aggressive
    }

    return score;
}

function terminal(board) {
    for (let state of winningStates) {
        const [[a0, a1], [b0, b1], [c0, c1]] = state;
        if (
            board[a0][a1] !== "." &&
            board[a0][a1] === board[b0][b1] &&
            board[a0][a1] === board[c0][c1]
        ) {
            return board[a0][a1];
        }
    }
    if (board.flat().every(cell => cell !== ".")) {
        return "D";
    }
    return "N";
}

function successor(board, symbol) {
    let successors = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ".") {
                let newBoard = board.map(row => [...row]);
                newBoard[i][j] = symbol;
                successors.push(newBoard);
            }
        }
    }
    return successors;
}

function randomMove(board, symbol) {
    const emptyCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ".") {
                emptyCells.push([i, j]);
            }
        }
    }
    if (emptyCells.length === 0) return board;
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = symbol;
    return newBoard;
}

function minValue(board, player, ai, depth, alpha, beta, difficulty) {
    const end = terminal(board);
    if (end !== "N") {
        if (end === "D") return 0;
        if (end === ai) return 100;
        return -100;
    }
    if (depth === 0) {
        return heuristic(board, ai, difficulty);
    }

    let bestValue = Infinity;
    for (let s of successor(board, player)) {
        let v = maxValue(s, player, ai, depth - 1, alpha, beta, difficulty);
        bestValue = Math.min(bestValue, v);
        if (bestValue <= alpha) return bestValue;
        beta = Math.min(beta, bestValue);
    }
    return bestValue;
}

function maxValue(board, player, ai, depth, alpha, beta, difficulty) {
    const end = terminal(board);
    if (end !== "N") {
        if (end === "D") return 0;
        if (end === ai) return 100;
        return -100;
    }
    if (depth === 0) {
        return heuristic(board, ai, difficulty);
    }

    let bestValue = -Infinity;
    for (let s of successor(board, ai)) {
        let v = minValue(s, player, ai, depth - 1, alpha, beta, difficulty);
        bestValue = Math.max(bestValue, v);
        if (bestValue >= beta) return bestValue;
        alpha = Math.max(alpha, bestValue);
    }
    return bestValue;
}

function miniMax(board, player, ai, difficulty) {
    let depth = difficulty === "easy" ? 1 : difficulty === "medium" ? 3 : 5;
    let bestBoard = board.map(row => [...row]);
    let bestValue = -Infinity;

    // In Easy mode, 70% chance to pick a random move
    if (difficulty === "easy" && Math.random() < 0.7) {
        return randomMove(board, ai);
    }

    for (let s of successor(board, ai)) {
        let v = minValue(s, player, ai, depth - 1, -Infinity, Infinity, difficulty);
        if (v > bestValue) {
            bestValue = v;
            bestBoard = s;
        }
    }
    return bestBoard;
}

function aiMove() {
    const difficulty = difficultySelect.value;
    board = miniMax(board, player, ai, difficulty);
    updateButtons();
    ct = board.flat().filter(cell => cell !== ".").length;
    checkWinner();
    turn = "X";
}

function updateButtons() {
    btns.forEach((btn, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        btn.innerText = board[row][col] === "." ? "" : board[row][col];
        btn.disabled = board[row][col] !== ".";
        // Apply class based on symbol
        btn.classList.remove("cross", "circle");
        if (board[row][col] === "X") {
            btn.classList.add("cross");
        } else if (board[row][col] === "O") {
            btn.classList.add("circle");
        }
    });
}

function checkWinner() {
    for (let state of winningStates) {
        const [[a0, a1], [b0, b1], [c0, c1]] = state;
        if (
            board[a0][a1] !== "." &&
            board[a0][a1] === board[b0][b1] &&
            board[a0][a1] === board[c0][c1]
        ) {
            foundWinner(board[a0][a1]);
            return;
        }
    }
    if (ct === 9) {
        foundDraw();
    }
}

function foundWinner(winner) {
    btns.forEach(btn => btn.disabled = true);
    win.innerText = `${winner} is the Winner!`;
    win.style.display = "block";
}

function foundDraw() {
    win.innerText = "It's a Draw!";
    win.style.display = "block";
}

btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (turn === "X" && !btn.disabled) {
            const row = Math.floor(index / 3);
            const col = index % 3;
            board[row][col] = "X";
            ct++;
            btn.innerText = "X";
            btn.classList.add("cross"); // Add cross class
            btn.disabled = true;
            checkWinner();
            if (terminal(board) === "N") {
                turn = "O";
                setTimeout(aiMove, 500);
            }
        }
    });
});

resetBtn.addEventListener("click", () => {
    board = [
        [".", ".", "."],
        [".", ".", "."],
        [".", ".", "."]
    ];
    btns.forEach(btn => {
        btn.innerText = "";
        btn.disabled = false;
        btn.classList.remove("cross", "circle"); // Remove symbol classes
    });
    win.style.display = "none";
    win.innerText = "";
    turn = "X";
    ct = 0;
});