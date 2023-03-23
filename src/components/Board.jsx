import Square from "./Square";
import "../styles/Board.css"

const Board = (props) => {
    return (
        <div className="board">
            {props.board.map((s) => {
                return (
                    <Square key={s.name} name={s.name} rank={s.rank} file={s.file} piece={s.piece}>
                    </Square>
                )
            })}
        </div>
    );
};

export default Board;
