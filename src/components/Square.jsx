import "../styles/Square.css";

const Square = (props) => {
    const pieces = {
        "pawn": "p",
        "rook": "r",
        "knight": "n",
        "bishup": "b",
        "queen": "q",
        "king": "k",
        "": " "
    }

    const getColor = () => {
        if (props.rank % 2 === 0) {
            if (props.file % 2 === 0) {
                return "dark";
            }
            return "light";
        }
        else {
            if (props.file % 2 === 0) {
                return "light";
            }
            return "dark";
        }
    };

    return (
        <button className={getColor()} onClick={() => console.log(props.name)}>
            {props.name}
        </button>
    )
};

export default Square;
