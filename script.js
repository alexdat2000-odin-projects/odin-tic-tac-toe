const GameStates = Object.freeze({
    PLAYING: 0,
    WIN1: 1,
    WIN2: 2,
    DRAW: 3,
});


function CreateGame(mainDisplay, field, score1, score2) {
    let board = Array(9).fill(0);
    let startedGame = 1;
    let currentPlayer = 1;
    let gameState = 0;
    let score = [0, 0];

    const checkWin = () => {
        let winLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const [a, b, c] of winLines) {
            if (board[a] === board[b] && board[b] === board[c] && board[a] !== 0) {
                gameState = board[a];
                score[board[a] - 1]++;
            }
        }

        for (let i = 0; i < 9; i++) {
            if (board[i] === 0) {
                return;
            }
        }
        gameState = 3;
    }

    const place = (id) => {
        if (board[id] !== 0 || gameState !== 0) {
            return;
        }
        board[id] = currentPlayer
        currentPlayer = (currentPlayer === 1 ? 2 : 1);
        checkWin();
    }

    const newGame = () => {
        board = Array(9).fill(0);
        startedGame = (startedGame === 1 ? 2 : 1);
        currentPlayer = startedGame;
        gameState = 0;
    }

    const renderField = () => {
        if (gameState === 0) {
            mainDisplay.innerHTML = `Current turn: <span class="player${currentPlayer}"> Player ${currentPlayer} </span>`;
        } else if (gameState === 1) {
            mainDisplay.innerHTML = `<span class="player1"> Player 1 won! </span>`;
        } else if (gameState === 2) {
            mainDisplay.innerHTML = `<span class="player2"> Player 2 won! </span>`;
        } else {
            mainDisplay.innerHTML = `It's a Draw!`;
        }

        for (let i = 0; i < 9; i++) {
            let cell = field.querySelector(`#cell${i}`);
            if (board[i] === 1) {
                cell.innerHTML = `<span class="player1"> X </span>`;
            } else if (board[i] === 2) {
                cell.innerHTML = `<span class="player2"> O </span>`;
            } else {
                cell.innerHTML = "";
            }
        }

        score1.textContent = score[0];
        score2.textContent = score[1];
        console.log(board);
    }

    return {place, newGame, renderField};
}


let game;


function init() {
    let mainDisplay = document.querySelector("#display");
    let field = document.querySelector("#field");
    let score1 = document.querySelector("#score1");
    let score2 = document.querySelector("#score2");
    game = CreateGame(mainDisplay, field, score1, score2);

    let restartBtn = document.querySelector("#restart");
    restartBtn.onclick = () => {
        game.newGame();
        game.renderField();
    };

    for (let i = 0; i < 9; i++) {
        let cell = field.querySelector(`#cell${i}`);
        cell.addEventListener("click", () => {
            game.place(i);
            game.renderField();
        });
    }
    game.renderField();
}

document.addEventListener("DOMContentLoaded", init);
