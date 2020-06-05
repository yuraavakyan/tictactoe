import React from 'react';
import '../App.css';
import Row from '../Row/Row'


const Board = (props) => {
    const columns = props.columns;
    const rows = props.rows;

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
