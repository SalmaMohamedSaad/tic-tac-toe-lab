/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr')
let messageEl = document.querySelector('#message')
let resetBtnEl = document.querySelector('#reset')
console.log(resetBtnEl)
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  // and so on
]

// console.log(squareEls)
// console.log(messageEl)
/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  //console.log('hi')
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  squareEls.forEach((sqr, inx) => {
    sqr.style.backgroundColor = '#fffff0'
    sqr.innerText = ''
  })
}

const updateBoard = () => {
  board.forEach((element, index) => {
    //console.log(index)
    squareEls.forEach((sqr, inx) => {
      if (inx === index && element) {
        if (element === 'X') {
          sqr.style.backgroundColor = 'red'
          sqr.innerText = 'X'
        } else if (element === 'O') {
          sqr.style.backgroundColor = 'green'
          sqr.innerText = 'O'
        }
      }
    })
  })
}

const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.innerText = 'Game On!'
  } else if (!winner && tie) {
    messageEl.innerText = 'Its A Tie!!'
  } else {
    messageEl.innerText = 'Congratulations ' + turn
  }
}

const placePiece = (index) => {
  //console.log(turn)

  board[index] = turn
  //console.log(board)
}
const checkForWinner = () => {
  /*
  1. loop through the winning combinations array
  2. get the first element that has three indexs values and loop through it
  3. loop through the board array
  4. use the indexs of the combinations to get the values inside the board cell
  5. compare the actual values in the cells

  */
  board.forEach((element, index) => {
    for (let i = 0; i < winningCombos.length; i++) {
      for (let j = 0; j < winningCombos[i].length; j++) {
        if (
          board[winningCombos[i][j]] !== '' &&
          board[winningCombos[i][j]] === board[winningCombos[i][j + 1]] &&
          board[winningCombos[i][j]] === board[winningCombos[i][j + 2]]
        ) {
          winner = true
        }
      }
    }
  })
}
const checkForTie = () => {
  if (winner) {
    return
  } else {
    //console.log(board)
    let i = 0
    board.forEach((element) => {
      if (element === '') {
        i++
      }
      if (i > 0) {
        tie = false
      } else {
        tie = true
      }
      console.log('=========>', element)
    })
  }
}
const switchPlayerTurn = () => {
  if (winner) {
    return
  } else {
    if (turn === 'X') {
      //console.log('======', turn)
      turn = 'O'
    } else {
      //console.log('======', turn)
      turn = 'X'
    }
  }
  //console.log(turn)
}
const colorDiv = (event) => {
  if (event.target.innerText) return
  event.target.style.backgroundColor = '#40E0D0'
}
const removeColorDiv = (event) => {
  if (event.target.innerText) return
  event.target.style.backgroundColor = '#fffff0'
}
const render = () => {
  updateBoard()
  updateMessage()
}
const handleClick = (event) => {
  if (event.target.innerText || winner) {
    return
  } else {
    const squareIndex = event.target.id
    //console.log(squareIndex)
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
    //console.log(board)
  }
}

init()

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((div) => {
  div.addEventListener('click', handleClick)
  div.addEventListener('mouseover', colorDiv)
  div.addEventListener('mouseout', removeColorDiv)
})

resetBtnEl.addEventListener('click', init)
