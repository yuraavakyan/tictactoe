import React, { useState } from 'react';
import './App.css';
import Board from './Board/board-comp';

const Form = () => {

    const [size, setSize] = useState({ columns: 0, rows: 0 });
    let cols = 0;
    let rows = 0;
    const inputCol = React.createRef();
    const inputRow = React.createRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        cols = Number(inputCol.current.value);
        rows = Number(inputRow.current.value);
        setSize({ columns: cols, rows: rows })
    }
    return (
        <div className='main-page'>
            <form onSubmit={handleSubmit} className='form'>
                <input
                    type='number'
                    placeholder='columns'
                    ref={inputCol}
                    required
                />
                <input
                    type='number'
                    placeholder='rows'
                    ref={inputRow}
                    required
                />
                <button>OK</button>
                <Board columns={size.columns} rows={size.rows} />
            </form>
        </div>
    );
}

export default Form;