import React from "react";
import { useState } from "react";

const Player = ({ name, symbol, isActive, onWin }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [currentName, setCurrentName] = useState(name)

    const handleClick = () => {
        setIsEditing((prevValue) => !prevValue)
        if (isEditing) {
            onWin(symbol, currentName);
        }
    }

    const handleChange = (e) => {
        setCurrentName(e.target.value)
    }

    let playerName = <span className="player-name">{currentName}</span>

    if (isEditing) {
        playerName = <input type="text" value={currentName} required onChange={handleChange} />
    }
    return (

        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerName}

                <span className="player-symbol">{symbol}</span>
            </span>

            <button onClick={handleClick}>{isEditing ? "save" : "edit"}</button>
        </li>

    )
}

export default Player;