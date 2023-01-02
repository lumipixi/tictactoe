const gameBoard = (() => {
  let _board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  const mark = (square, player) => {
    if (_board[square] === "X" || _board[square] === "O") return;
    _board[square] = player.marker;
    return true;
  };
  const printBoard = () => {
    let output = "";
    _board.forEach((square, index) => {
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
    const row1 = checkTriplet(_board.slice(0, 3));
    const row2 = checkTriplet(_board.slice(3, 6));
    const row3 = checkTriplet(_board.slice(6));
    //*Check cols
    const col1 = checkTriplet([_board[0], _board[3], _board[6]]);
    const col2 = checkTriplet([_board[1], _board[4], _board[7]]);
    const col3 = checkTriplet([_board[2], _board[5], _board[8]]);
    //*Check diagonally
    const diag1 = checkTriplet([_board[0], _board[4], _board[8]]);
    const diag2 = checkTriplet([_board[6], _board[4], _board[2]]);
    //*If one row, col or diag is true, there is a winner
    return row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2;
  };
  let getSquare = (index) => _board[index];
  const clear = () => (_board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]);

  return {
    mark,
    printBoard,
    checkWinner,
    clear,
    getSquare,
  };
})();

const createPlayer = (marker) => {
  let _nickname = marker;
  const setName = newName => _nickname = newName;
  const getName = () => _nickname;
  return { setName, getName, marker };
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
      return `${currentPlayer.getName()} wins!`;
    }
    ++turn;
  };
  const printTurn = () => turn;
  const reset = () => {
    gameBoard.clear();
    turn = 1;
  };

  return {
    playTurn,
    printTurn,
    reset,
  };
})();

p1 = createPlayer("X");
p2 = createPlayer("O");

const drawController = (() => {
  const _squares = document.querySelectorAll(".square");
  const _resultsSection = document.querySelector(".results");
  const _p1Name = document.querySelector(".p1-name");
  const _p2Name = document.querySelector(".p2-name");

  const _updateResults = (string) => (_resultsSection.textContent = string);

  const _updateBoard = () => {
    _squares.forEach((square, index) => {
      const squareMark = gameBoard.getSquare(index);
      square.innerHTML = squareMark;
      switch (squareMark) {
        case "X":
          square.classList.replace("blankMark", "blueMark");
          break;
        case "O":
          square.classList.replace("blankMark", "redMark");
          break;
      }
    });
  };

  const play = (e) => {
    const selectedSquareIndex = e.target.getAttribute("data-index");
    console.log(game.printTurn());
    let winner = game.playTurn(selectedSquareIndex);
    console.log(gameBoard.printBoard());
    _updateBoard();
    if (winner) {
      _updateResults(winner);
      alert(winner);
      _squares.forEach((square) => square.removeEventListener("click", play));
    }
  };

  const rename = (e) => {
    const newNickname = prompt("What's your new name?");
    if (newNickname.length > 8 || newNickname.length <= 0) {
      alert("Invalid name! Make sure it has 1-8 characters.");
      return;
    }
    if (e.target.getAttribute("data-player") === "p1") {
      p1.setName(newNickname);
      _p1Name.textContent = `${newNickname} (X)`;
    } else {
      p2.setName(newNickname);
      _p2Name.textContent = `${newNickname} (O)`;
    };
  };

  const init = () => {
    _squares.forEach((square) => {
      square.classList.remove("redMark");
      square.classList.remove("blueMark");
      square.classList.add("blankMark");
      square.addEventListener("click", play);
    });
    game.reset();
    _updateBoard();
    _updateResults("");
    _p1Name.addEventListener("click", rename)
    _p2Name.addEventListener("click", rename)
    _p1Name.textContent = `${p1.getName()} (X)`;
    _p2Name.textContent = `${p2.getName()} (O)`;
  };

  return {
    play,
    init,
    rename,
  };
})();

p1.setName("P1")
p2.setName("P2")
drawController.init();
