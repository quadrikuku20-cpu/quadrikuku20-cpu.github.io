// ================= GAME STATE =================
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let hasGameEnded = false;

let scoreX = 0;
let scoreO = 0;


// ================= LOAD =================
window.onload = function () {
    updateBoard();
    updateStatus();
};


// ================= UPDATE BOARD =================
function updateBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            let cell = document.getElementById(`cell${i}${j}`);
            cell.innerText = board[i][j];

            // Style X and O
            cell.classList.remove("X", "O");
            if (board[i][j] !== '') {
                cell.classList.add(board[i][j]);
            }
        }
    }
}


// ================= STATUS =================
function updateStatus() {
    document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
}


// ================= CLICK =================
function cellClicked(row, col) {

    if (board[row][col] !== '' || hasGameEnded) return;

    makeMove(row, col);

    // AI TURN
    if (!hasGameEnded &&
        document.getElementById("mode").value === "ai" &&
        currentPlayer === 'O') {

        document.getElementById("status").innerText = "AI is thinking... 🤖";

        setTimeout(aiMove, 700);
    }
}


// ================= MAKE MOVE =================
function makeMove(row, col) {

    board[row][col] = currentPlayer;
    updateBoard();

    let result = checkWinner();

    if (result !== null) {

        if (result.winner === 'tie') {
            document.getElementById("status").innerText = "It's a tie!";
        } else {

            document.getElementById("status").innerText = `Player ${result.winner} wins! 🎉`;

            // Update score
            if (result.winner === 'X') {
                scoreX++;
                document.getElementById("scoreX").innerText = scoreX;
            } else {
                scoreO++;
                document.getElementById("scoreO").innerText = scoreO;
            }

            highlightWin(result.cells);
        }

        hasGameEnded = true;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}


// ================= AI MOVE =================
function aiMove() {

    let emptyCells = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                emptyCells.push({ i, j });
            }
        }
    }

    if (emptyCells.length === 0) return;

    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    makeMove(move.i, move.j);
}


// ================= CHECK WINNER =================
function checkWinner() {

    // Rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' &&
            board[i][0] === board[i][1] &&
            board[i][1] === board[i][2]) {
            return { winner: board[i][0], cells: [`cell${i}0`, `cell${i}1`, `cell${i}2`] };
        }
    }

    // Columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== '' &&
            board[0][i] === board[1][i] &&
            board[1][i] === board[2][i]) {
            return { winner: board[0][i], cells: [`cell0${i}`, `cell1${i}`, `cell2${i}`] };
        }
    }

    // Diagonals
    if (board[0][0] !== '' &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) {
        return { winner: board[0][0], cells: ['cell00', 'cell11', 'cell22'] };
    }

    if (board[0][2] !== '' &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]) {
        return { winner: board[0][2], cells: ['cell02', 'cell11', 'cell20'] };
    }

    // Tie
    let isTie = board.flat().every(cell => cell !== '');
    if (isTie) return { winner: 'tie', cells: [] };

    return null;
}


// ================= HIGHLIGHT WIN =================
function highlightWin(cells) {
    cells.forEach(id => {
        document.getElementById(id).classList.add("win");
    });
}


// ================= RESET =================
function resetGame() {

    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    currentPlayer = 'X';
    hasGameEnded = false;

    // Remove win highlights
    document.querySelectorAll("td").forEach(cell => {
        cell.classList.remove("win");
    });

    updateBoard();
    updateStatus();
}