"use strict"

const gameboard = (function() {
    const board = new Array(9).fill("_");
    const winningSequences = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                              [0, 3, 6], [1, 4, 7], [2, 5, 8],
                              [0, 4, 8], [2, 4, 6]];

    const fillCell = (index, char) => board[index] = char;
    const getCell = (index) => board[index];
    const isEmpty = (index) => board[index] === "_";

    const checkWin = () => {
        for (const sequence of winningSequences) {
            if (!isEmpty(sequence[0]) && getCell(sequence[0]) === getCell(sequence[1]) && getCell(sequence[0]) === getCell(sequence[2])) {
                return getCell(sequence[0]);
            }
        }
        return "_";
    };

    const checkTie = () => {
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
            if (checkWin !== "_") {
                console.log("here2");
                if (checkWin === player1.char) {
                    winner = player1.name;
                }
                else {
                    winner = player2.name;
                }
                gameOver = true;
            }
            else if (gameboard.checkTie()) {
                console.log("here3");
                winner = "Tie!";
                gameOver = true;
            }
            let temp = player1;
            player1 = player2;
            player2 = temp;
        }
        else {
            console.log("error: already filled")
        }
    };

    const getGameOver = () => gameOver;
    const getWinner = () => winner;

    return {makeMove, getGameOver, getWinner};
};

function displayBoard() {
    let res = [[], [], []];
    for (let i = 0; i < 3; i++) {
        res[0].push(gameboard.getCell(i));
    }
    for (let i = 3; i < 6; i++) {
        res[1].push(gameboard.getCell(i));
    }
    for (let i = 6; i < 9; i++) {
        res[2].push(gameboard.getCell(i));
    }
    console.log(res);
}

const game = createGame("bot1", "O", "bot2", "X"); 

/*
while (!game.getGameOver) {
    game.makeMove();
}

console.log("Result: " + game.getWinner);
*/

game.makeMove(0);
info();
game.makeMove(1);
info();
game.makeMove(3);
info();
game.makeMove(5);
info();
game.makeMove(6);
info();

function info() {
    displayBoard();
    console.log(game.getGameOver());
    console.log(game.getWinner());
}