import { useState, useEffect } from "react";
import Square from "./Square";
import "../styles/Board.css"

const Board = (props) => {
    const [squares, setSquares] = useState([]);
    const [selectedSquare, setSelectedSquare] = useState(null);

    const setupBoard = () => {
        let s = [];
        const pieces = {
            1: "rook",
            2: "knight",
            3: "bishup",
            4: "queen",
            5: "king",
            6: "bishup",
            7: "knight",
            8: "rook",
        }
        for (let f=8; f >= 1; f--) {
            for (let r=1; r <= 8; r++) {
                let piece = null;
                if (f === 1) {
                    piece = {
                        name: pieces[r],
                        color: "white",
                    };
                }
                if (f === 8) {
                    piece = {
                        name: pieces[r],
                        color: "black",
                    };
                }
                if (f === 2) {
                    piece = {
                        name: "pawn",
                        color: "white",
                    };
                }
                if (f === 7) {
                    piece = {
                        name: "pawn",
                        color: "black",
                    };
                }

                s.push({
                    rank: r,
                    file: f,
                    name: String.fromCharCode(96 + r) + f,
                    piece: piece,
                    highlighted: false,
                });
            }
        }

        setSquares(s);
    };

    const convertToFlatArray = (rank, file) => {
        return ((8 - file) * 8) + (rank - 1);
    };

    const handleClick = (square) => {
        if (square.piece) {
            console.log(square.name + ": " + square.piece.color + " " + square.piece.name);
            if (square.piece.color === props.playing) {
                setSelectedSquare({
                    piece: square.piece,
                    rank: square.rank,
                    file: square.file,
                    name: square.name,
                })
                // highlight legal moves
                return;
            }
        }

        // didn't click our own piece
        if (selectedSquare) {
            console.log("moving " + selectedSquare.name + " to " + square.name);

            const prev_square = convertToFlatArray(selectedSquare.rank, selectedSquare.file);
            const new_square = convertToFlatArray(square.rank, square.file);

            let updated_board = squares.slice();

            updated_board[prev_square].piece = null;
            updated_board[new_square].piece = selectedSquare.piece;

            setSquares(updated_board);
            setSelectedSquare(null);
        }
    };

    useEffect(setupBoard, []);

    return (
        <div className={"board " + props.playing}>
            {squares.map((s) => {
                return (
                    <Square key={s.name} name={s.name} rank={s.rank} file={s.file} piece={s.piece} highlighted={s.highlighted} hc={handleClick}>
                    </Square>
                )
            })}
        </div>
    );
};

export default Board;
