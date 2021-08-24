'use strict'

// Create the board
const GameBoard = (function() {
    const container = document.querySelector('.container');
    let lastPlayer = '';
    const numSquares = new Array(9)
    const createBoard = () => {
        for (let i = 0; i < numSquares.length; i++) {
            const div = document.createElement('div');
            div.setAttribute('data-id', i + 1)
            container.appendChild(div);
        }
    }
    return {createBoard, lastPlayer, container}
})();

const PlayerFactory = (symbol) => {
    const addMarker = (ele) => {
        ele.textContent = symbol
    }

    const checkWinner = () => {
        const winningCombos = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7]
        ]
    
        const board = Array.from(GameBoard.container.querySelectorAll('div'))
        const playerSelection = board.filter(ele => ele.textContent == symbol).map(x => x.getAttribute('data-id')).map(i => parseInt(i, 10))
        
        const res = winningCombos.map(ele => {
            return ele.every(i => playerSelection.includes(i))
        })
    
        if (res.includes(true)) {
            winningCombos[res.findIndex(ele => ele == true)].forEach(item => {
                document.querySelector(`div[data-id='${item}']`)
                    .style.backgroundColor = 'lightblue';
            })
        } 
        // Tie game
        
    }
    return {addMarker, checkWinner}
}

const player1 = PlayerFactory('x');
const player2 = PlayerFactory('o');

GameBoard.createBoard()

GameBoard.container.querySelectorAll('div').forEach(item => {
    item.addEventListener('click', () => {
        if (item.textContent == '') {
            if (GameBoard.lastPlayer == 'x') {
                player2.addMarker(item)
                GameBoard.lastPlayer = 'o';
                player2.checkWinner()
            } else if (GameBoard.lastPlayer == 'o') {
                player1.addMarker(item)
                GameBoard.lastPlayer = 'x';
                player1.checkWinner()
            } else {
                player1.addMarker(item)
                GameBoard.lastPlayer = 'x';
            }
        }   
    })
})


