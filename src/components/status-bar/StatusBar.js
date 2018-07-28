import React from 'react';

import './StatusBar.css';

const StatusBar = ({ predicted_sales, sales, onClickHandler }) => {
    return (
        <div className="status-bar">
            <p>
                New layout predicted sales:{' '}
                <strong>
                    {predicted_sales
                        ? Math.round(predicted_sales * 100) / 100
                        : 'Loading...'}
                </strong>
                {sales ? `, current layout: ${sales}` : null}
            </p>
            <div className="submit">
                <button onClick={onClickHandler}>Submit</button>
            </div>
        </div>
    );
};

export default StatusBar;
