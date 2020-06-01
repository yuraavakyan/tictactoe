
import React, { useState } from 'react';
import '../App.css';
import Square from '../Square/square-comp';

const arrX = [];
const arrO = [];
let count = 0;

const Board = (props) => {
    const columns = props.squares;
    const rows = props.rows;
    const boardSize = columns * rows;
    const [state, setState] = useState(Array(boardSize).fill(null));

    const clickHandler = (event) => {
        const squares = state.slice();
        const i = event.target.id;
        if (state[i] === null) {
            if (count % 2 === 0) {
                squares[i] = 'X';
                arrX.push(i);
                arrX.sort((a, b) => { return a - b });
                checkWin(arrX);
            } else {
                squares[i] = 'O';
                arrO.push(i);
                arrO.sort((a, b) => { return a - b });
                checkWin(arrO);
            }
            count += 1;
            setState(squares);
        }
        else
            alert('the field is not empty...');
    };

    const checkWin = (array) => {
        const horizontalWin = [];
        const verticalWin = [];
        const diagonalWinFromLeftToRight = [];
        const diagonalWinFromRightToLeft = [];

        for (let i = 0; i < array.length; i++) {



            if (array[i + 1] - array[i] === 1) {
                horizontalWin.push(array[i + 1])
                if (!horizontalWin.includes(array[i]))
                    horizontalWin.push(array[i]);
                console.log(horizontalWin);

                if (horizontalWin.length >= 5)


                    alert(` is the winner`);
            }
            else if (array[i + 1] - array[i] === props.squares) {
                verticalWin.push(array[i + 1])
                if (!verticalWin.includes(array[i]))
                    verticalWin.push(array[i]);
                if (verticalWin.length >= 5)
                    alert(` is the winner`);
            }
            else if (array[i + 1] - array[i] === props.squares + 1) {
                diagonalWinFromLeftToRight.push(array[i + 1])
                if (!diagonalWinFromLeftToRight.includes(array[i]))
                    diagonalWinFromLeftToRight.push(array[i]);
                if (diagonalWinFromLeftToRight.length >= 5)
                    alert(` is the winner`);
            }
            else if (array[i + 1] - array[i] === props.squares - 1) {
                diagonalWinFromRightToLeft.push(array[i + 1])
                if (!diagonalWinFromRightToLeft.includes(array[i]))
                    diagonalWinFromRightToLeft.push(array[i]);
                if (diagonalWinFromRightToLeft.length >= 5)
                    alert(` is the winner`);
            }
        }
    }

    const renderRows = (start, step) => {
        const arr = [];
        for (let i = start; i < (start + step); i++) {
            arr.push(<Square id={i} value={state[i]} clickHandler={clickHandler} />);
        }
        return (<div className='board-row'>{arr}</div>);
    }

    const renderBoard = (rows, squares) => {
        const arr = [];
        let count = 0;
        while (count < rows * squares) {
            arr.push(renderRows(count, squares));
            count += squares;
        }
        return arr;
    }

    return (
        <div className="board">
            {renderBoard(rows, columns)}
        </div>
    );
}

export default Board;