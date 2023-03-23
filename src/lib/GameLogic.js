const getMovesInALine = (piece, rank, file, board, xDir, yDir) => {
    let moves = [];

    let r = rank + xDir;
    let f = file + yDir;

    while (r > 0 && r <= 8 && f > 0 && f <= 8) {
        const square = board.filter(s => s.rank === r && s.file === f)[0];

        if (square.piece) {
            if (square.piece.color !== piece.color) {
                moves.push({
                    rank: r,
                    file: f
                });
            }
            break;
        }

        moves.push({
            rank: r,
            file: f
        });

        r += xDir;
        f += yDir;
    }

    return moves;
}

const getBaseMoves = (piece, rank, file, board) => {
    let moves = [];
    if (piece.name === "pawn") {
        if (piece.color === "white") {
            if (file === 2) {
                moves.push({
                    rank: rank,
                    file: file + 2
                });
            }
            moves.push({
                rank: rank,
                file: file + 1
            });
        }
        else {
            if (file === 7) {
                moves.push({
                    rank: rank,
                    file: file - 2
                });
            }
            moves.push({
                rank: rank,
                file: file - 1
            });

        }
    }
    else if (piece.name === "rook") {
        moves.push(...getMovesInALine(piece, rank, file, board, 1, 0));
        moves.push(...getMovesInALine(piece, rank, file, board, -1, 0));
        moves.push(...getMovesInALine(piece, rank, file, board, 0, 1));
        moves.push(...getMovesInALine(piece, rank, file, board, 0, -1));
    }
    else if (piece.name === "knight") {
        const Ls = [
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2],
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
        ]

        for (const L of Ls) {
            const r = rank + L[0];
            const f = file + L[1];

            const square = board.filter(s => s.rank === r && s.file === f)[0];
            console.log(square);

            if (!square?.piece || square.piece.color !== piece.color) {
                moves.push({
                    rank: r,
                    file: f,
                });
            }
        }
    }
    else if (piece.name === "bishup") {
        moves.push(...getMovesInALine(piece, rank, file, board, 1, 1));
        moves.push(...getMovesInALine(piece, rank, file, board, 1, -1));
        moves.push(...getMovesInALine(piece, rank, file, board, -1, 1));
        moves.push(...getMovesInALine(piece, rank, file, board, -1, -1));
    }
    else if (piece.name === "queen") {
        moves.push(...getMovesInALine(piece, rank, file, board, 1, 0));
        moves.push(...getMovesInALine(piece, rank, file, board, -1, 0));
        moves.push(...getMovesInALine(piece, rank, file, board, 0, 1));
        moves.push(...getMovesInALine(piece, rank, file, board, 0, -1));
        moves.push(...getMovesInALine(piece, rank, file, board, 1, 1));
        moves.push(...getMovesInALine(piece, rank, file, board, 1, -1));
        moves.push(...getMovesInALine(piece, rank, file, board, -1, 1));
        moves.push(...getMovesInALine(piece, rank, file, board, -1, -1));
    }
    else if (piece.name === "king") {
        const Ms = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ]

        for (const M of Ms) {
            const r = rank + M[0];
            const f = file + M[1];

            const square = board.filter(s => s.rank === r && s.file === f)[0];
            console.log(square);

            if (!square?.piece || square.piece.color !== piece.color) {
                moves.push({
                    rank: r,
                    file: f,
                });
            }
        }
    }

    return moves;
}

const getLegalMoves = (piece, file, rank, board) => {
    let legalMoves = [];
    legalMoves = getBaseMoves(piece, file, rank, board)
        .filter(m => m.rank > 0 && m.rank <= 8 && m.file > 0 && m.file <= 8); 
    return legalMoves
};

export default getLegalMoves;
