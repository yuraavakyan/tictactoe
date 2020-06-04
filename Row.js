import React, { useState } from 'react';
import '../App.css';
import Square from '../Square/square-comp';

const arrX = [{ value: 'X' }];
const arrO = [{ value: 'O' }];
let count = 0;

const Row = (props) => {
    const [state, setState] = useState(Array(props.cols).fill(null));


    const clickHandler = (event) => {

        const i = event.target.id;
        const parent = event.target.parentNode.id;
        const cells = state.slice();


        if (cells[i] === null) {
            if (count % 2 === 0) {
                cells[i] = 'X';
                arrX.push({ parent: parent, index: i });
                checkWin(arrX);
                console.log(arrX);




            } else {
                cells[i] = 'O';
                arrO.push({ parent: parent, index: i });
                checkWin(arrO);
                console.log(arrO);
            }
            count += 1;
            setState(cells);



        }
        else
            alert('the field is not empty...');


    }

    const checkWin = (array) => {



        const horizontalCheck = () => {
            const arr = [];
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (array[i].parent === array[j].parent && Math.abs(array[i].index - array[j].index) === 1) {
                        if (!arr.includes(array[i])) arr.push(array[i]);
                        if (!arr.includes(array[j])) arr.push(array[j]);
                        if (arr.length === 5) return true;
                    }

                }
            }
            console.log('horizontal: ' + arr);

            return false;
        }

        const verticalCheck = () => {
            const arr = [];
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (array[i].index === array[j].index && Math.abs(array[i].parent - array[j].parent) === 1) {
                        if (!arr.includes(array[i])) arr.push(array[i]);
                        if (!arr.includes(array[j])) arr.push(array[j]);
                        if (arr.length === 5) return true;
                    }

                }
            }
            console.log('vertical: ' + arr);
            return false;
        }

        const diagonalCheck = () => {
            const arr = [];
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (Math.abs(array[i].parent - array[j].parent) === 1 && Math.abs(array[i].index - array[j].index) === 1) {
                        if (!arr.includes(array[i])) arr.push(array[i]);
                        if (!arr.includes(array[j])) arr.push(array[j]);
                        if (arr.length === 5) return true;
                    }

                }
            }
            console.log('diagonal: ' + arr);
            return false;
        }


        if (horizontalCheck()) alert(`${array[0]} wins`);
        if (verticalCheck()) alert('vertical wins');
        if (diagonalCheck()) alert('diagonal wins');



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