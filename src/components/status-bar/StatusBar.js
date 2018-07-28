import React from 'react';

import './StatusBar.css';

const StatusBar = ({ predicted_sales, onClickHandler }) => {
    return (
        <div className="status-bar">
            <p>
                Predicted sales{' '}
                <strong>{Math.round(predicted_sales * 100) / 100}</strong>
            </p>
            <div className="submit">
                <button onClick={onClickHandler}>Submit</button>
            </div>
        </div>
    );
};

export default StatusBar;
