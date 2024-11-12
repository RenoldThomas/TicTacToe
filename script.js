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

    return {getBoard, resetBoard, placeSymbol};
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
        // if (!isGameActive || !gameboard.placeSymbol(index, currentPlayer.symbol)) 
        if (isGameActive) {
            gameboard.placeSymbol(index, currentPlayer.symbol);
            console.log(`Placed ${currentPlayer.symbol} in position ${index}`);
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

    return {playTurn, resetGame};
})();