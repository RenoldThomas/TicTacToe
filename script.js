/**
 * TicTacToe Game Logic
 * 
 * This file contains the core game logic for a Tic-Tac-Toe game,
 * organized using the module pattern and factory functions.
 */

/**
 * Gameboard Module
 * Manages the game board state and rendering.
 * Implemented as an IIFE (Immediately Invoked Function Expression) to create private scope.
 * @returns {Object} Public methods for interacting with the game board
 */
const gameboard = (function() {
    // Private board array representing the 9 cells (indexed 0-8)
    let board = ["", "", "", "", "", "", "", "", ""];
    
    /**
     * Returns the current state of the game board
     * @returns {Array} Current board state
     */
    const getBoard = () => board;

    /**
     * Resets the game board to its initial empty state
     */
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    /**
     * Attempts to place a player's symbol on the board
     * @param {Number} index - Cell index (0-8)
     * @param {String} playerSymbol - Player's symbol ('X' or 'O')
     * @returns {Boolean} True if placement was successful, false if cell was already occupied
     */
    const placeSymbol = (index, playerSymbol) => {
        if (board[index] === "") {
            board[index] = playerSymbol;
            return true;
        }
        return false;
    };

    /**
     * Updates the DOM to reflect the current board state
     */
    const displayBoard = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.textContent = "" + board[index];
        });
    };

    // Return public methods
    return {getBoard, resetBoard, placeSymbol, displayBoard};
})();

/**
 * Player Factory
 * Creates player objects with name and symbol properties
 * @param {String} name - Player's name 
 * @param {String} symbol - Player's symbol ('X' or 'O')
 * @returns {Object} Player object
 */
const Player = (name, symbol) => {
    return {name, symbol};
};

/**
 * Game Master Module
 * Controls game flow, turn management, and win condition checking
 * Implemented as an IIFE to create private scope
 * @returns {Object} Public methods for game control
 */
const gameMaster = (() => {
    // Initialize players with default names
    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let isGameActive = true;

    // DOM reference for displaying game messages
    let display = document.querySelector("#displayText");

    /**
     * Sets custom names for both players
     * @param {String} name1 - Name for Player 1
     * @param {String} name2 - Name for Player 2
     */
    const setPlayerNames = (name1, name2) => {
        player1.name = name1;
        player2.name = name2;
        display.textContent = `${currentPlayer.name}'s turn.`;
    }

    /**
     * Switches turn between players
     */
    const switchTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    };
    
    /**
     * Checks if there is a winner or draw
     * @returns {String|null} 'X', 'O' for winner, 'Draw' for draw, or null if game continues
     */
    const checkWinner = () => {
        // All possible winning combinations
        const possibleWins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        const board = gameboard.getBoard();
        // Check each winning pattern
        for (const pattern of possibleWins) {
            const [a, b, c] = pattern; // Destructuring the values in pattern and assigning it to a, b, c
            if (board[a] && board[a] === board[b] && board[a] === board[c])
                return board[a];
        }
        // If no winner but board is full, it's a draw
        return board.includes("") ? null : "Draw";
    };

    /**
     * Handles a player's turn
     * @param {Number} index - Cell index (0-8) where the player is making a move
     */
    const playTurn = (index) => {
        let board = gameboard.getBoard();

        // Check if the cell is already taken
        if (board[index] != "") {
            display.textContent = `Choose a different cell. Cell taken. Still ${currentPlayer.name}'s turn.`;
            return;
        }

        // If game is active, process the turn
        if (isGameActive) {
            gameboard.placeSymbol(index, currentPlayer.symbol);
            console.log(`Placed ${currentPlayer.symbol} in position ${index}`);
            gameboard.displayBoard();
            display.textContent = "";
        } 
        else
            return;
        
        // Check for winner or draw after the move
        const winner = checkWinner();
        if (winner) {
            isGameActive = false;
            console.log(winner === "Draw" ? "It's a draw!" : `${currentPlayer.name} is the Winner!`);
            display.textContent = (winner === "Draw" ? "It's a draw!" : `${currentPlayer.name} is the Winner!`);
        } 
        else {
            // Continue game with next player's turn
            switchTurn();
            display.textContent = `${currentPlayer.name}'s turn.`;
        }
    }

    /**
     * Resets the game state to start a new round
     */
    const resetGame = () => {
        gameboard.resetBoard();
        currentPlayer = player1;
        isGameActive = true;
        gameboard.displayBoard();
        display.textContent = `${currentPlayer.name}'s turn.`;
    };

    /**
     * Sets up initial event listeners and game state
     */
    const initializeGame = () => {
        const cells = document.querySelectorAll(".cell");
        let restart = document.querySelector("#restartButton");
        
        // Add click listeners to each cell
        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                if (isGameActive) {
                    const index = cell.getAttribute("id");
                    playTurn(index);
                }
            });
        });

        // Add listener for restart button
        restart.addEventListener("click", () => {
            resetGame();
        });

        // Set initial turn display
        display.textContent = `${currentPlayer.name}'s turn.`;
    };

    // Return public methods
    return {setPlayerNames, playTurn, resetGame, initializeGame};
})();

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
    gameMaster.initializeGame();
});

// New Game button opens the player name dialog
document.querySelector("#newGameButton").addEventListener("click", () => {
    enterPlayerNames.showModal();
});

// Start button on dialog sets player names and starts new game
document.querySelector("#start-button").addEventListener("click", () => {
    // Get player names from inputs (use defaults if empty)
    const player1Input = document.querySelector("#player1").value || "Player 1";
    const player2Input = document.querySelector("#player2").value || "Player 2";
    
    // Update player names and reset game
    gameMaster.setPlayerNames(player1Input, player2Input);
    gameMaster.resetGame();
    
    // Close the dialog
    document.querySelector("#enterPlayerNames").close();
});