"use strict";

const containerEl = document.querySelector('.container');
let playerTxt = document.querySelector('.message');
let restartBtn = document.getElementById('restartbtn');
let boxes = document.querySelectorAll('.box');

const O_TXT = 'O';
const X_TXT = 'X';

let currentPlayer = X_TXT;
let spaces = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    boxes.forEach(box => {
        box.addEventListener('click', boxClicked);
    });
    restartBtn.addEventListener('click', restartGame);
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerWon()) {
            playerTxt.innerHTML = `<h2 class="message">Congratulations Player ${currentPlayer}</h2>`;
            const winnerIndicator = playerWon();
            winnerIndicator.forEach(box => {
                boxes[box].style.backgroundColor = "#f4do3f";
            });
            containerEl.classList.add('success');
        } else if (spaces.every(space => space !== null)) {
            playerTxt.innerHTML = `<h2 class="message">It's a Draw!</h2>`;
            containerEl.classList.add('success');
        } else {
            currentPlayer = currentPlayer === X_TXT ? O_TXT : X_TXT;
        }
    }
}

function playerWon() {
    for (const condition of winningCombinations) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

function restartGame() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
    });

    playerTxt.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TXT;
    containerEl.classList.remove('success');
}

startGame();
