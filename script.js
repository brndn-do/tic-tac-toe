"use strict"

const gameboard = (function() {
    const board = new Array(9).fill("");
    const winningSequences = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                              [0, 3, 6], [1, 4, 7], [2, 5, 8],
                              [0, 4, 8], [2, 4, 6]];

    const fillCell = (index, char) => board[index] = char;
    const getCell = (index) => board[index];
    const isEmpty = (index) => board[index] === "";

    const checkWin = () => {
        for (const sequence of winningSequences) {
            if (!isEmpty(sequence[0]) && getCell(sequence[0]) === getCell(sequence[1]) && getCell(sequence[0]) === getCell(sequence[2])) {
                return getCell(sequence[0]);
            }
        }
        return "";
    };

    const checkTie = () => {
        if (checkWin()) {
            return false;
        }
        for (let i = 0; i < 9; i++) {
            if (isEmpty(i)) {
                return false;
            }
        }
        return true;
    }

    return {fillCell, getCell, isEmpty, checkWin, checkTie};
})();

const createPlayer = function(name, char) {
    return {name, char};
}

const createGame = function(name1, char1, name2, char2) {
    let player1 = createPlayer(name1, char1);
    let player2 = createPlayer(name2, char2);
    let gameOver = false;
    let winner;

    const makeMove = (index) => {
        if (gameboard.isEmpty(index)) {
            gameboard.fillCell(index, player1.char);
            const checkWin = gameboard.checkWin();
            if (checkWin !== "") {
                if (checkWin === player1.char) {
                    winner = player1.name;
                }
                else {
                    winner = player2.name;
                }
                gameOver = true;
            }
            else if (gameboard.checkTie()) {
                gameOver = true;
            }
            let temp = player1;
            player1 = player2;
            player2 = temp;
        }
    };

    const getGameOver = () => gameOver;
    const getWinner = () => winner;

    return {makeMove, getGameOver, getWinner};
};

const display = (function() {
    const body = document.querySelector('body');
    const clickCell = (event) => {
        if (!game.getGameOver()) {
            let index = event.target.id;
            game.makeMove(index);
            render();
            if (game.getGameOver()) {
                const message = document.createElement('div');
                message.className = 'message';
                if (!game.getWinner()) {
                    message.textContent = 'Tie!';
                }
                else {
                    message.textContent = `${game.getWinner()} wins!`;
                }
                body.appendChild(message);
            }
        }
    };
    const render = () => {
        const board = document.createElement('div');
        board.className = 'board';
        for (let i = 0; i < 9; i++ ) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = i;
            cell.textContent = gameboard.getCell(i);
            cell.addEventListener('click', clickCell);
            board.appendChild(cell);
        }
        if (document.querySelector('.board')) {
            body.removeChild(document.querySelector('.board'));
        }
        body.appendChild(board);
    };
    return {render};
})();

function startGame(event) {
    event.preventDefault();
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    if (name1 && name2) {
        dialog.close();
        game = createGame(name1, "O", name2, "X");
        display.render();
    }
    else {
        alert("Please enter player names!");
    }
}

const button = document.querySelector('button');
button.addEventListener("click", startGame);
const dialog = document.querySelector('dialog');
dialog.showModal();
let game;