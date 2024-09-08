const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Tie';
}

function showWinner(winner) {
  const modal = document.getElementById('winner-modal');
  const message = document.getElementById('winner-message');
  if (winner === 'Tie') {
    message.textContent = 'It\'s a Tie!';
  } else {
    message.textContent = `${winner} Wins!`;
  }
  modal.style.display = 'block';
}

function handleClick(event) {
  const index = Array.from(cells).indexOf(event.target);
  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  const winner = checkWinner();
  if (winner) {
    showWinner(winner);
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// Close modal when the user clicks on <span> (x)
const closeModal = document.getElementById('close-modal');
closeModal.onclick = function() {
  document.getElementById('winner-modal').style.display = 'none';
}

// Log Out
document.getElementById('logout-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});