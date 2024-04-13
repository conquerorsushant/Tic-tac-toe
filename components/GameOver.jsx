import React from "react";

const GameOver = ({ winner, onSelect }) => {
    console.log({ winner })
    return (
        <div id="game-over">
            <h>Game Over!</h>

            {winner && <p>{winner} won!</p>}
            {!winner && <p> It's a Draw</p>}
            <p><button onClick={onSelect}>Rematch</button></p>

        </div>

    )
}

export default GameOver;