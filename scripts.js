'use strict'

const againstAI = document.querySelector('.against-ai');
const againstPlayer = document.querySelector('.against-friend');
const startGame = document.querySelector('.start-game');

againstAI.addEventListener('click', () => {
    document.querySelector('.welcome-container').style.display = 'none'
    document.querySelector('.game-container').style.display = 'grid'
    player1 = PlayerFactory(`It's your`, 'x');
    player2 = PlayerFactory('CPU', 'o')
    const newGame = GameController(player1, 'cpu')
})

againstPlayer.addEventListener('click', () => {
    document.querySelector('.against-friend-container').style.display = 'grid';
})

startGame.addEventListener('click', () => {
    const player1Name = document.querySelector('.player1-name').value;
    const player1NameError = document.querySelector('#player1-name-error');
    const player2Name = document.querySelector('.player2-name').value;
    const player2NameError = document.querySelector('#player2-name-error');
    
    player1Name == '' ? player1NameError.style.display = 'block' : player1NameError.style.display = 'none';
    player2Name == '' ? player2NameError.style.display = 'block' : player2NameError.style.display = 'none';

    if (player1NameError.style.display == 'none' && player2NameError.style.display == 'none') {
        document.querySelector('.welcome-container').style.display = 'none'
        document.querySelector('.game-container').style.display = 'grid'
        player1 = PlayerFactory(player1Name, 'x');
        player2 = PlayerFactory(player2Name, 'o')
        const newGame = GameController(player1)
    }


})

// Create the board
const GameBoard = (function() {
    const container = document.querySelector('.grid-container');
    
    const numSquares = new Array(9)
    const createBoard = () => {
        for (let i = 0; i < numSquares.length; i++) {
            const div = document.createElement('div');
            div.setAttribute('data-id', i + 1)
            container.appendChild(div);
        }
    }
    return {createBoard, container}
})();

GameBoard.createBoard()

const PlayerFactory = (name, symbol) => {

    const selectedDivs = [];
    const playerSymbol = symbol;
    const playerName = name

    return {playerName, playerSymbol, selectedDivs}
}

let player1 = null;
let player2 = null;

const GameController = function(currentPlayer, gameMode) {

    let playerTurnHeader = document.querySelector('.turn-container h1')
    let gameModeOption = gameMode

    playerTurnHeader.textContent = `It's ${currentPlayer.playerName}'s turn`

    const winningCombos = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];
    // let currentPlayer;
    let winner = '';

    GameBoard.container.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-id')) {
            if (e.target.textContent == '' && winner == '') {
                e.target.textContent = currentPlayer.playerSymbol
                currentPlayer.selectedDivs.push(parseInt(e.target.getAttribute('data-id'),10))

                checkWinner(currentPlayer) 
            }
            
        }
    })

    const cpuTurn = () => {
        const gameBoardDivs = document.querySelector('.grid-container').querySelectorAll("div");
        const openSpots = Array.from(gameBoardDivs).filter(ele => ele.textContent == '');
        const randomOpenSpot = openSpots[Math.floor(Math.random()*openSpots.length)]
        randomOpenSpot.click();

    }

    const checkWinner = (player) => {
        const res = winningCombos.map(ele => {
            return ele.every(i => player.selectedDivs.includes(i))
        })
        
        if (res.includes(true)) {
            winningCombos[res.findIndex(ele => ele == true)].forEach(item => {
                document.querySelector(`div[data-id='${item}']`).style.backgroundColor = '#42b7ff'
                document.querySelector(`div[data-id='${item}']`).style.color = '#fafafa'
            })
            winner = player
            playerTurnHeader.textContent = `${winner.playerName} wins!`
        } else {
            if ([...player1.selectedDivs, ...player2.selectedDivs].length == 9) {
                playerTurnHeader.textContent = `It's a draw...`
                GameBoard.container.style.backgroundColor = '#e8e8e8'
            } else {

                    currentPlayer = (currentPlayer == player1) ? player2 : player1
                    playerTurnHeader.textContent = `It's ${currentPlayer.playerName}'s turn`
            }
        }
        if (gameMode == 'cpu') {
            if (currentPlayer == player2) cpuTurn()
        }
        
    }
};