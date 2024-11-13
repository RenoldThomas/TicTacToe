const gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    const resetBoard = () => {board = ["", "", "", "", "", "", "", "", ""]};

    const placeSymbol = (index, playerSymbol) => {
        if (board[index] === "") {
            board[index] = playerSymbol;
            return true;
        }
        return false;
    };

    const displayBoard = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.textContent = "" + board[index];
        });
    };

    return {getBoard, resetBoard, placeSymbol, displayBoard};
})();

const Player = (name, symbol) => {
    return {name, symbol};
};

const gameMaster = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let isGameActive = true;

    const switchTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    };
    
    const checkWinner = () => {
        const possibleWins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        const board = gameboard.getBoard();
        for (const pattern of possibleWins) {
            const [a, b, c] = pattern; // Destructuring the values in pattern and assigning it to a, b, c
            if (board[a] && board[a] === board[b] && board[a] === board[c])
                return board[a];
        }
        return board.includes("") ? null : "Draw";
    };

    const playTurn = (index) => {
        let board = gameboard.getBoard();

        if (board[index] != "") {
            console.log("Choose a different cell. Cell taken.");
            return;
        }
        
        if (isGameActive) {
            gameboard.placeSymbol(index, currentPlayer.symbol);
            console.log(`Placed ${currentPlayer.symbol} in position ${index}`);
            gameboard.displayBoard();
        } 
        else
            return;
        
        const winner = checkWinner();
        if (winner) {
            isGameActive = false;
            console.log(winner === "Draw" ? "It's a draw!" : `${currentPlayer.name} is the Winner!`);
        } 
        else {
            switchTurn();
        }
    }

    const resetGame = () => {
        gameboard.resetBoard();
        currentPlayer = player1;
        isGameActive = true;
    };

    const initializeGame = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                if (isGameActive) {
                    const index = cell.getAttribute("id");
                    playTurn(index);
                }
            });
        });
        // gameboard.displayBoard();
    };

    return {playTurn, resetGame, initializeGame};
})();

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
    gameMaster.initializeGame();
});