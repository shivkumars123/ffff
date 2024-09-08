const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Check for a winner
function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Tie';
}

// Display the winner in a modal
function showWinner(winner) {
  const modal = document.getElementById('winner-modal');
  const message = document.getElementById('winner-message');
  if (winner === 'Tie') {
    message.textContent = 'It\'s a Tie!';
  } else {
    message.textContent = `${winner} Wins!`;
  }
  setTimeout(() => {
    modal.style.display = 'block';
  }, 500); // Slight delay for the modal to appear
}

// Handle cell click
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
  document.getElementById('player-turn').textContent = `Player ${currentPlayer}'s turn`;
}

// Add click event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// Close modal when the user clicks on <span> (x)
const closeModal = document.getElementById('close-modal');
closeModal.onclick = function() {
  document.getElementById('winner-modal').style.display = 'none';
}

// Replay button functionality
const replayButton = document.getElementById('replay-button');
replayButton.onclick = function() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  document.getElementById('player-turn').textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('active'); // Remove active class for visual reset
  });
  document.getElementById('winner-modal').style.display = 'none';
}

// Log Out
document.getElementById('logout-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});