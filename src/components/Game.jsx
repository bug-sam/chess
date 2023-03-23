import Board from "./Board";
import { useState } from "react";

const Game = (props) => {
    const [isPlayingWhite, setIsPlayingWhite] = useState(true);


    return (
        <div>
            <Board playing={isPlayingWhite ? "white" : "black"}>
            </Board>
        </div>
    );
}

export default Game;
