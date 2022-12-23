const gameBoard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  const mark = (square, player) => {
    if (board[square] === "X" || board[square] === "O") return;
    board[square] = player.marker;
    return true;
  };
  const printBoard = () => {
    let output = "";
    board.forEach((square, index) => {
      //*new line for each row
      if (index === 3 || index === 6) {
        output += "\n";
      }
      output += ` ${square} `;
    });
    return output;
  };
  const checkWinner = () => {
    const checkTriplet = (triplet) => {
      const value = triplet[0];
      if (!(value === "X" || value === "O")) return undefined;
      return triplet[1] === value && triplet[2] === value ? true : false;
    };
    //*Check rows
    const row1 = checkTriplet(board.slice(0, 3));
    const row2 = checkTriplet(board.slice(3, 6));
    const row3 = checkTriplet(board.slice(6));
    //*Check cols
    const col1 = checkTriplet([board[0], board[3], board[6]]);
    const col2 = checkTriplet([board[1], board[4], board[7]]);
    const col3 = checkTriplet([board[2], board[5], board[8]]);
    //*Check diagonally
    const diag1 = checkTriplet([board[0], board[4], board[8]]);
    const diag2 = checkTriplet([board[6], board[4], board[2]]);
    //*If one row, col or diag is true, there is a winner
    return row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2;
  };

  const clear = () => board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

  return {
    mark,
    printBoard,
    checkWinner,
    clear,
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
    const moveResult = gameBoard.mark(square, currentPlayer);
    //* Don't increase turn if move wasn't successful (square was occupied)
    if (!moveResult) return;
    //* The game can be won starting from the 5th turn.
    if (turn >= 5 && gameBoard.checkWinner()) {
      return `${currentPlayer.marker} wins!`;
    }
    ++turn;
  };
  const printTurn = () => turn;
  const reset = () => {
    gameBoard.clear();
    turn = 1;
  }

  return {
    playTurn,
    printTurn,
    reset,
  };
})();

p1 = createPlayer("X");
p2 = createPlayer("O");

console.log(game.printTurn());
game.playTurn(6);
console.log(gameBoard.printBoard());

console.log(game.printTurn());
game.playTurn(5);
console.log(gameBoard.printBoard());

console.log(game.printTurn());
game.playTurn(4);
console.log(gameBoard.printBoard());

console.log(game.printTurn());
game.playTurn(7);
console.log(gameBoard.printBoard());

console.log(game.printTurn());
console.log(game.playTurn(2));
console.log(gameBoard.printBoard());

console.log(game.printTurn());
console.log(game.reset());
console.log(game.playTurn(0));
console.log(gameBoard.printBoard());
