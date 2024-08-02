const buttonBox = document.querySelector('.btns');
const btns = document.querySelectorAll('.btns .btn');
const X_turn = document.querySelector('.X_turn');
const O_turn = document.querySelector('.O_turn');
const showChange = document.querySelector('.showChange');
const winnerName = document.querySelector('.winnerName');
const choose = document.querySelectorAll('.choose');
const startingPage = document.querySelector('.starting_page');
const mainPage = document.querySelector('.main_page');
const winnerPage = document.querySelector('.winner_page');
const playAgainBtn = document.querySelector('.playAgainBtn');
const timer = document.querySelector('.timer');

let changeTurn = false;
let hasWinner = false;
let turnTimer;

function startTimer() {
    clearTimeout(turnTimer);
    requestAnimation();
    turnTimer = setTimeout(() => {
        changeTurn = !changeTurn;
        updateTurnIndicator();
        startTimer();
    }, 4000);
}

function requestAnimation() {
    timer.style.animation = 'none';
    timer.offsetHeight; // Trigger reflow
    timer.style.animation = 'animate 4s linear forwards';
}

function updateTurnIndicator() {
    if (changeTurn) {
        buttonBox.classList.remove('X');
        buttonBox.classList.add('O');
        timer.style.backgroundColor = 'red';
        showChange.style.left = '155px';
        showChange.style.backgroundColor = 'red';
        O_turn.style.color = '#fff';
        X_turn.style.color = '#000';
    } else {
        buttonBox.classList.remove('O');
        buttonBox.classList.add('X');
        timer.style.backgroundColor = 'blue';
        showChange.style.left = '0';
        showChange.style.backgroundColor = 'blue';
        O_turn.style.color = '#000';
        X_turn.style.color = '#fff';
    }
}

choose.forEach(chooseNow => {
    chooseNow.addEventListener('click', () => {
        if (chooseNow.id === 'playerX') {
            changeTurn = false;
            updateTurnIndicator();
        } else {
            changeTurn = true;
            updateTurnIndicator();
        }
        startingPage.style.display = "none";
        mainPage.style.display = "block";
        startTimer();
    });
});

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.innerHTML === "") {
            if (!changeTurn) {
                btn.innerHTML = 'X';
                btn.style.backgroundColor = 'blue';
                btn.id = "X";
            } else {
                btn.innerHTML = 'O';
                btn.style.backgroundColor = 'red';
                btn.id = "O";
            }
            btn.style.pointerEvents = "none";
            changeTurn = !changeTurn;
            updateTurnIndicator();
            startTimer();
            winningFunc();
            if (!hasWinner) {
                drawFunc();
            }
        }
    });
});

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

function winningFunc() {
    for (let a = 0; a < 8; a++) {
        let b = winningCombinations[a];
        if (btns[b[0]].id === "" || btns[b[1]].id === "" || btns[b[2]].id === "") {
            continue;
        } else if (btns[b[0]].id === "X" && btns[b[1]].id === "X" && btns[b[2]].id === "X") {
            winnerName.innerHTML = 'Player <span class="winnerText">X</span> Won the Game';
            let winnerText = document.querySelector('.winnerText');
            winnerText.style.color = 'blue';
            playAgainBtn.style.backgroundColor = 'blue';
            hasWinner = true;
            incrementWinCount("X");
            setTimeout(() => {
                mainPage.style.display = 'none';
                winnerPage.style.display = 'block';
            }, 300);
            clearTimeout(turnTimer);
            break;
        } else if (btns[b[0]].id === "O" && btns[b[1]].id === "O" && btns[b[2]].id === "O") {
            winnerName.innerHTML = 'Player <span class="winnerText">O</span> Won the Game';
            let winnerText = document.querySelector('.winnerText');
            winnerText.style.color = 'red';
            playAgainBtn.style.backgroundColor = 'red';
            hasWinner = true;
            incrementWinCount("O");
            setTimeout(() => {
                mainPage.style.display = 'none';
                winnerPage.style.display = 'block';
            }, 300);
            clearTimeout(turnTimer);
            break;
        }
    }
}

function drawFunc() {
    if (!hasWinner && Array.from(btns).every(box => box.id !== "")) {
        winnerName.innerHTML = 'Match has been Drawn!';
        setTimeout(() => {
            mainPage.style.display = 'none';
            winnerPage.style.display = 'block';
        }, 300);
        clearTimeout(turnTimer);
    }
}

function incrementWinCount(player) {
    if (player === 'X') {
        let xWins = document.getElementById('x_wins_count');
        xWins.innerHTML = parseInt(xWins.innerHTML) + 1;
    } else if (player === 'O') {
        let oWins = document.getElementById('o_wins_count');
        oWins.innerHTML = parseInt(oWins.innerHTML) + 1;
    }
}

function resetGame() {
    changeTurn = false;
    hasWinner = false;
    winnerName.innerHTML = "";
    btns.forEach(btn => {
        btn.innerHTML = "";
        btn.id = "";
        btn.style.backgroundColor = "";
        btn.style.pointerEvents = "auto";
    });
    startingPage.style.display = "block";
    mainPage.style.display = "none";
    winnerPage.style.display = "none";
}

playAgainBtn.addEventListener('click', () => {
    resetGame();
});
