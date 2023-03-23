import Board from "./Board";
import { useState } from "react";

const Game = (props) => {
    const [board, setBoard] = useState([]);

    const generateBoard = () => {
        let b = [];
        for (let f=8; f >= 1; f--) {
            for (let r=1; r <= 8; r++) {
                b.push({
                    rank: r,
                    file: f,
                    name: String.fromCharCode(96 + r) + f,
                    piece: "",
                });
            }
        }

        setBoard(b);
        return b;
    };

    return (
        <div>
            <Board board={board.length === 0 ? generateBoard() : board}>
            </Board>
        </div>
    );
}

export default Game;
