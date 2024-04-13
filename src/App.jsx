import { useState } from "react"
import Gameboard from "../components/Gameboard"
import Player from "../components/Player"
import Log from "../components/Log";
import { WINNING_COMBINATIONS } from "../components/Winning-combinations";
import GameOver from "../components/GameOver";

const deriveSymbol = (gameTurns) => {

  let currentTurn = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentTurn = "O";
  }
  return currentTurn;
}

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [playerWin, setPlayerWin] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  // const [activePlayer, setActivePlayer] = useState("X");
  const currentSymbol = deriveSymbol(gameTurns)

  let gameBoard = [...initialGameboard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (firstSquare  && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = playerWin[firstSquare];
      console.log(winner)
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;


  const handleRestart = () => {
    setGameTurns([])
  }

  const handleWinner=(symbol,newName)=>{
    console.log(symbol,newName)
    setPlayerWin((prev)=>{
      return{
        ...prev,
        [symbol]:newName

    };
    });
  }


  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentTurn = deriveSymbol(prevTurns)
      const updatedTerm = [
        { square: { row: rowIndex, col: colIndex }, player: currentTurn }, ...prevTurns,
      ]

      return updatedTerm;
    })

  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player 1" symbol="X" onWin={handleWinner} isActive={currentSymbol === "X"} />
          <Player name="player 2" symbol="O" onWin={handleWinner} isActive={currentSymbol === "O"} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSelect={handleRestart} />}
        <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
