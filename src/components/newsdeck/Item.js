import React from 'react';

export default ({ cell, papers }) => {
    return (
        <div
            key={cell.cell_number}
            draggable
            onDragStart={e => this.onDragStart(e, t.name)}
        >
            <img
                draggable="false"
                src={papers[cell.newspaper_id].img}
                alt={papers[cell.newspaper_id].name}
            />
            <h2>{papers[cell.newspaper_id].name}</h2>
            <p className="price">
                Price: <strong>$ {papers[cell.newspaper_id].price}</strong>
            </p>
        </div>
    );
};
