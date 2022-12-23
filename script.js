/*
* Create gameBoard
* Create function to fill array element:
  // This should take (player, square)
  // If square is full return
  // Depending on the value of player, use X - O

*/

const gameBoard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const mark = (square, player) => {
    if (board[square] === "X" || board[square] === "O") return;
    const marker = player.id === "p1" ? "X" : "O";
    board[square] = marker;
    // console.log(board);
    return board;
  };
  return {
    mark,
  };
})();

playerOne = {
  id: "p1",
};

console.log(gameBoard.mark(0, playerOne));
