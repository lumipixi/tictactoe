/*
* Create gameBoard
* Create function to fill array element:
  // This should take (player, square)
  // If square is full return
  // Depending on the value of player, use X - O
* Create player factory:
  * Create id
  * Add name functionality
  * 
*/

const gameBoard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const mark = (square, player) => {
    if (board[square] === "X" || board[square] === "O") return;
    board[square] = player.marker;
    return true;
  };
  const printBoard = () => board;
  return {
    mark,
    printBoard,
  };
})();

const createPlayer = (marker) => {
  return { marker };
};

const game = (() => {
  let turn = 1;
  const playTurn = (square) => {
    const isOdd = (n) => n % 2 !== 0;
    //* Cross only plays odd turns. Circle only plays even turns.
    const currentPlayer = isOdd(turn) ? p1 : p2;
    console.log(currentPlayer);
    const moveResult = gameBoard.mark(square, currentPlayer);
    //* Don't increase turn if move wasn't successful (square was occupied)
    if (!moveResult) return;
    ++turn;
  };
  const printTurn = () => turn;

  return {
    playTurn,
    printTurn,
  };
})();

p1 = createPlayer("X");
p2 = createPlayer("O");

console.log(game.printTurn());
game.playTurn(0);
console.log(gameBoard.printBoard());

console.log(game.printTurn());
game.playTurn(1);
console.log(gameBoard.printBoard());

console.log(game.printTurn());
game.playTurn(4);
console.log(gameBoard.printBoard());

console.log(game.printTurn());
