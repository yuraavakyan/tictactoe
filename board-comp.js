import React, { useState } from 'react';
import '../App.css';
import Row from '../Row/Row'

const arrX = [];
const arrO = [];
let count = 0;

const Board = (props) => {
    const columns = props.columns;
    const rows = props.rows;
    const [state, setState] = useState(Array(rows).fill(Array(columns).fill(null)));



    const horizontal = (array) => {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i + 1] - array[i] === 1 && array[i + 1] % 10 !== 0) {
                count++;
                console.log(count);

                if (count === 4)
                    return true
            }

            else count = 0;
        }
        return false;
    }

    const vertical = (array) => {

        let count = 0;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length && j !== i; j++) {
                if (array[j] - array[i] === columns)
                    count++;
                if (count === 4)
                    return true;
                else count = 0;
            }
        }
        return false;
    }

    const fromLeftToRight = (array) => {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i + 1] - array[i] === columns + 1) {
                count++;
                if (count === 4)
                    return true
            }
            else count = 0;
        }
        return false;
    }

    const fromRightToLeft = (array) => {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i + 1] - array[i] === columns - 1) {
                count++;
                if (count === 4)
                    return true
            }
            else count = 0;
        }
        return false;
    }


    const clickHandler = (event) => {
        const i = event.target.id;
        console.log(i);

        const squares = state.slice();
        console.log(arrX);
        console.log(arrO);


        if (squares[i][i] === null) {
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

        if (horizontal(array)) alert(`horizontal win`);
        else if (vertical(array)) alert(` vertical win`);
        else if (fromLeftToRight(array)) alert(` from left to right win`);
        else if (fromRightToLeft(array)) alert(` from right to left win`);

    }

    const renderBoard = (rows) => {

        const arr = [];
        for (let i = 0; i < rows; i++) {
            arr.push(<Row id={i} cols={columns} />)
        }


        return arr;
    }


    return (
        <div className="board">
            {renderBoard(rows)}
        </div>
    );
}

export default Board;