import { useState, useEffect } from "react";
import Square from "./Square";
import "../styles/Board.css"

const Board = (props) => {
    const [squares, setSquares] = useState([]);
    const [pieceToMove, setPieceToMove] = useState(null);

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

    const handleClick = (piece, rank, file, name) => {
        if (piece) {
            console.log(name + ": " + piece.color + " " + piece.name);
            if (piece.color === props.playing) {
                setPieceToMove({
                    piece: piece,
                    rank: rank,
                    file: file,
                    name: name,
                })
                // highlight legal moves
                return;
            }
        }

        // didn't click our own piece
        if (pieceToMove) {
            console.log("moving " + pieceToMove.name + " to " + name);

            const prev_square = convertToFlatArray(pieceToMove.rank, pieceToMove.file);
            const new_square = convertToFlatArray(rank, file);

            let updated_board = squares.slice();

            updated_board[prev_square].piece = null;
            updated_board[new_square].piece = pieceToMove.piece;

            setSquares(updated_board);
            setPieceToMove(null);
        }
    };

    useEffect(setupBoard, []);

    return (
        <div className="board">
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
