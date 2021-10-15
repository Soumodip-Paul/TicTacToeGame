console.log("Welcome to our Tic Tac Toe Game")
const winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
]
const changeTurn = () => {
    return turn === 'X' ? 'O' : 'X'
}

const checkWin = () => {
    let gameWon = false;
    const boxes = document.getElementsByClassName('box')
    winArray.forEach(e => {
        if (boxes[e[0]].innerText !== '' &&
            boxes[e[0]].innerText === boxes[e[1]].innerText &&
            boxes[e[2]].innerText === boxes[e[1]].innerText
        ) {
            document.getElementById('turn').innerText = `${turn === myTurn ? 'You' : turn} has won the game`
            gameWon = true
        }
        else gameWon = gameWon || false
    })
    if (gameWon) setTimeout(reset, 3000)
    return gameWon
}

const isGameOver = () => {
    let gameOver = true;
    Array.from(document.getElementsByClassName('box')).forEach((element) => {
        if (element.innerText === '') {
            gameOver = false
        }
        else gameOver = gameOver && true
    })
    return gameOver;
}

const main = () => {
    const grids = document.getElementsByClassName('grid')
    Array.from(grids).forEach((e, index) => {
        e.addEventListener('click', () => {
            let gridText = e.getElementsByClassName('box')[0].innerText
            if (gridText === '') {
                if (turn === myTurn) {
                    SendMessage({ index })
                    e.getElementsByClassName('box')[0].innerText = turn
                    if (!checkWin()) {
                        turn = changeTurn()
                        document.getElementById('turn').innerText = turn === myTurn ? `Your Turn (${myTurn})` : `Turn for ${turn}`
                    }
                }
                else if (remoteData !== null) {
                    e.getElementsByClassName('box')[0].innerText = turn
                    if (!checkWin()) {
                        turn = changeTurn()
                        document.getElementById('turn').innerText = turn === myTurn ? `Your Turn (${myTurn})` : `Turn for ${turn}`
                    }
                }
            }

        })
    })
}

// main()

const reset = () => {
    turn = 'X'
    myTurn = myTurn === 'X' ? 'O' : 'X'
    SendMessage({ turn: myTurn })
    document.getElementById('turn').innerText = turn === myTurn ? `Your Turn (${myTurn})` : `Turn for ${turn}`
    Array.from(document.getElementsByClassName('box')).forEach(e => e.innerHTML = '')
}

// document.getElementById('reset').onclick = reset