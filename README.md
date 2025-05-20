# TicTacToe

A classic Tic-Tac-Toe game implemented with HTML, CSS, and JavaScript using modern web development techniques.

## Overview

This project is a fully interactive Tic-Tac-Toe game where two players can compete against each other. The game features a clean, responsive interface with customizable player names.

## Features

- **Customizable Player Names**: Players can enter their names before starting a new game
- **Turn-Based Gameplay**: Clear indication of whose turn it is
- **Win/Draw Detection**: Automatic detection of win or draw conditions
- **Game State Management**: Ability to restart the current game or start a new game with different players

## Technical Implementation

This project demonstrates several important front-end development concepts:

### Object-Oriented Programming (OOP)
- **Module Pattern**: Using immediately-invoked function expressions (IIFE) to create private and public methods
- **Factory Pattern**: Creating player objects with the Player factory function
- **Encapsulation**: Organizing code into logical modules (gameboard, Player, gameMaster)

### DOM Manipulation
- Dynamic updates to the game board
- Real-time display of game status
- Modal dialog for player name input

### Event Handling
- Click events for game board cells
- Button interactions for game control
- Dialog interactions for player setup

### Game Logic
- Win condition checking across rows, columns, and diagonals
- Turn management between players
- State tracking for active/inactive game status

### CSS Implementation
- Grid layout for the game board
- Responsive design elements
- Consistent color scheme and styling

## How to Play

1. Open the game in a web browser
2. Click "New Game" to set player names, or play directly with default names
3. Players take turns clicking on empty cells to place their symbol (X or O)
4. The game automatically detects wins or draws
5. Use "Restart" to play again with the same players or "New Game" to change player names

## Installation

You can access the game directly in your browser at:
https://therealstealthwar.github.io/TicTacToe

Alternatively, clone this repository and open `index.html` in your web browser to play locally.

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling rules
- `script.js` - Game logic and interactivity

## Future Enhancements

Potential future improvements could include:
- AI opponent option
- Score tracking across multiple games
- Adjustable board size
- Sound effects
- Animations for wins/draws

## Author
Renold T (@renold)

## Credits
This project was created as part of The Odin Project curriculum (2021).