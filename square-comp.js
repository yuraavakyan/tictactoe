import React, { useState } from 'react';
import '../App.css';

const Square = (props) => {
    return (
        <div className="square" id={props.id} onClick={props.clickHandler}>
            {props.value}
        </div>
    );
}

export default Square;