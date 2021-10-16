console.log("Welcome to our Tic Tac Toe Game")
const winArray = [
    [0, 1, 2, 1, 1 / 6, 0, 0],
    [3, 4, 5, 1, 3 / 6, 0, 0],
    [6, 7, 8, 1, 5 / 6, 0, 0],
    [0, 3, 6, 1, 0, 1 / 6, 90],
    [1, 4, 7, 1, 0, 3 / 6, 90],
    [2, 5, 8, 1, 0, 5 / 6, 90],
    [0, 4, 8, Math.SQRT2, 0, 0, 45],
    [2, 4, 6, Math.SQRT2, 1, 0, -45],
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
            const screen_height = (window.screen.width < 800 ? 75 : 30);
            document.getElementById('line').style.transform = `translate(${e[5] * screen_height}vw, ${e[4] * screen_height}vw) rotate(${e[6]}deg)`
            document.getElementById('line').style.width = screen_height * e[3] + 'vw'
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
    if (gameOver) document.getElementById('turn').innerText = `Match Drawn`
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
                    if (isGameOver()) setTimeout(reset, 3000)
                    else if (!checkWin()) {
                        turn = changeTurn()
                        document.getElementById('turn').innerText = turn === myTurn ? `Your Turn (${myTurn})` : `Turn for ${turn}`
                    }
                }
                else if (remoteData !== null) {
                    e.getElementsByClassName('box')[0].innerText = turn
                    if (!checkWin()) {
                        turn = changeTurn()
                        document.getElementById('turn').innerText = turn === myTurn ? `Your Turn ( ${myTurn} )` : `Turn for ${turn}`
                    }
                }
            }

        })
    })
}

// main()

const reset = () => {
    document.getElementById('line').style.width = 0
    setTimeout(() => {
        turn = 'X'
        myTurn = myTurn === 'X' ? 'O' : 'X'
        if (turn === myTurn)SendMessage({ turn: myTurn })
        console.log(myTurn);
        document.getElementById('line').style.transform = null
        document.getElementById('turn').innerText = turn === myTurn ? `Your Turn (${myTurn})` : `Turn for ${turn}`
        Array.from(document.getElementsByClassName('box')).forEach(e => e.innerHTML = '')
    }, 800)
}

// document.getElementById('reset').onclick = reset