import React, { useState } from 'react';
import '../App.css';
import Square from '../Square/square-comp';

const arrX = [{ value: 'X' }]; //X moves
const arrO = [{ value: 'O' }]; //O moves
let count = 0;

const Row = (props) => {
    const [state, setState] = useState(Array(props.cols).fill(null));

    const clickHandler = (event) => {

        const i = event.target.id;
        const parent = event.target.parentNode.id;
        const cells = state.slice();


        if (cells[i] === null) { //checking if cell is empty or not
            if (count % 2 === 0) { //checking who's turn is it
                cells[i] = 'X';
                arrX.push({ parent: parent, index: i }); //stroing moves as rows and index pairs
                checkWin(arrX);
            } else {
                cells[i] = 'O';
                arrO.push({ parent: parent, index: i });
                checkWin(arrO);
                // console.log(arrO);
            }
            count += 1;
            setState(cells);
        }
        else
            alert('the field is not empty...');
    }

    const checkWin = (array) => {
        let count = 0;

        const horizontalCheck = () => { //checks whetere there is a winning compination in horizontal state
            const arrObjects = [];
            const arrParents = [];

            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (array[i].parent === array[j].parent && Math.abs(array[i].index - array[j].index) === 1) {
                        if (!arrObjects.includes(array[i])) {
                            arrObjects.push(array[i]);
                            arrParents.push(array[i].parent);
                        }
                        if (!arrObjects.includes(array[j])) {
                            arrObjects.push(array[j]);
                            arrParents.push(array[j].parent);
                        }
                        arrParents.sort((a, b) => { return a - b });
                        for (let i = 0; i < arrParents.length; i++) {
                            if (arrParents[i] === arrParents[i + 1]) {
                                count++;
                                if (count === 4) return true;
                            }
                            else count = 0;
                        }
                    }
                }
            }
            return false;

        }

        const verticalCheck = () => {
            const arrObjects = [];
            const arrIndexes = [];

            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (array[i].index === array[j].index && Math.abs(array[i].parent - array[j].parent) === 1) {
                        if (!arrObjects.includes(array[i])) {
                            arrObjects.push(array[i]);
                            arrIndexes.push(array[i].index);
                        }
                        if (!arrObjects.includes(array[j])) {
                            arrObjects.push(array[j]);
                            arrIndexes.push(array[j].index);
                        }
                        arrIndexes.sort((a, b) => { return a - b });
                        for (let i = 0; i < arrIndexes.length; i++) {
                            if (arrIndexes[i] === arrIndexes[i + 1]) {
                                count++;


                                if (count === 4) return true;
                            }
                            else count = 0;
                        }

                    }
                }
            }
            return false;

        }

        const diagonalCheck = () => {
            const arrObjects = [];
            const arrParents = [];
            const arrIndexes = [];

            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (Math.abs(array[i].parent - array[j].parent) === 1 && Math.abs(array[i].index - array[j].index) === 1) {
                        if (!arrObjects.includes(array[i])) {
                            arrObjects.push(array[i]);
                            arrParents.push(array[i].parent);
                            arrIndexes.push(array[i].index);
                        }
                        if (!arrObjects.includes(array[j])) {
                            arrObjects.push(array[j]);
                            arrParents.push(array[j].parent);
                            arrIndexes.push(array[j].index);
                        }
                        arrParents.sort((a, b) => { return a - b });
                        arrIndexes.sort((a, b) => { return a - b });
                        // console.log('parents: ' + arrParents);
                        // console.log('indexes: ' + arrIndexes);
                        for (let i = 0; i < arrIndexes.length; i++) {
                            if (Math.abs(arrParents[i] - arrParents[i + 1]) === 1 && Math.abs(arrIndexes[i] - arrIndexes[i + 1]) === 1) {
                                count++;
                                //  console.log(count);
                                if (count === 20) return true; //There was a little bug that I couldn't manage, that's why is 20
                            }
                            //removing elements that are not coming in a row
                            else if (Math.abs(arrParents[i] - arrParents[i + 1]) === 1 || Math.abs(arrIndexes[i] - arrIndexes[i + 1]) === 1) {
                                arrParents.splice(i, 1);
                                arrIndexes.splice(i, 1);
                                count = 0;
                            }
                        }
                    }
                }
            }
            return false;
        }
        if (horizontalCheck()) alert(`${array[0].value} horizontal wins`);
        if (verticalCheck()) alert(`${array[0].value} vertical wins`);
        if (diagonalCheck()) alert(`${array[0].value} diagonal wins`);
    }

    const cols = props.cols;

    const renderRow = (cols) => {
        const arr = [];
        for (let i = 0; i < cols; i++) {
            arr.push(<Square id={i} value={state[i]} onClick={clickHandler} />)
        }
        return arr;
    }
    return (
        <div className='board-row' id={props.id}>
            {renderRow(cols)}
        </div>
    );
}
export default Row;
