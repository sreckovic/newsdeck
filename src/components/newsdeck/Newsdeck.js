import React, { Component } from 'react';
import axios from '../../axios';

// import Item from './Item';

class Newsdeck extends Component {
    state = {
        arrangement: [],
        newspapers: {},
        predicted_sales: null
    };

    // https://secure-cliffs-25767.herokuapp.com/hivery/get_predicted_sales?arrangement=1,1,1,1,2,2,2,3,3,4,4,4,5,8,8,10,11,11,12,12

    componentDidMount() {
        axios
            .get('/current_arrangement')
            .then(res => {
                this.setState({
                    arrangement: res.data.arrangement,
                    newspapers: res.data.newspapers,
                    predicted_sales: res.data.predicted_sales
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    onDragStart = (e, cell_id) => {
        e.dataTransfer.setData('text/plain', cell_id);
    };

    onDragOver = e => {
        e.preventDefault();
    };

    onDrop = e => {
        let id = e.dataTransfer.getData('text');
        let current_id = e.target.parentNode.parentNode.id.replace('cell_', '');
        let new_newspaper_id, old_newspaper_id;

        // newspaper id's
        this.state.arrangement.map(cell => {
            // new newspaper id
            if (cell.cell_number == id) {
                new_newspaper_id = cell.newspaper_id;
            }
            // old newspaper id
            if (cell.cell_number == current_id) {
                old_newspaper_id = cell.newspaper_id;
            }
        });

        // this.state.arrangement.map(cell => {
        //     if (cell.cell_number == current_id) {
        //         old_newspaper_id = cell.newspaper_id;
        //     }
        // });

        let arrangement = this.state.arrangement.filter(cell => {
            if (cell.cell_number == id) {
                cell.newspaper_id = old_newspaper_id;
            } else if (cell.cell_number == current_id) {
                cell.newspaper_id = new_newspaper_id;
            }
            return cell;
        });

        this.setState({
            ...this.state,
            arrangement
        });

        // axios
        //     .get(`/get_predicted_sales?arrangement=${}`)
        //     .then(res => {
        //         this.setState({
        //             ...this.state,
        //             predicted_sales: res
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    };

    render() {
        let papers = this.state.newspapers;

        let predicted = (
            <p className="predicted">
                Predicted sales are {this.state.predicted_sales}
            </p>
        );

        return (
            <div>
                {predicted}
                <div className="newsdeck-list">
                    {this.state.arrangement.map(cell => (
                        // <Item
                        //     key={cell.cell_number}
                        //     cell={cell}
                        //     papers={papers}
                        // />
                        <div
                            id={`cell_${cell.cell_number}`}
                            key={cell.cell_number}
                            onDragOver={e => this.onDragOver(e)}
                            onDrop={e => {
                                this.onDrop(e, cell.cell_number);
                            }}
                        >
                            <div
                                className="paper"
                                draggable
                                onDragStart={e =>
                                    this.onDragStart(
                                        e,
                                        cell.cell_number,
                                        cell.newspaper_id
                                    )
                                }
                            >
                                <img
                                    draggable="false"
                                    src={papers[cell.newspaper_id].img}
                                    alt={papers[cell.newspaper_id].name}
                                />
                                <h2>{papers[cell.newspaper_id].name}</h2>
                                <p className="price">
                                    Price:{' '}
                                    <strong>
                                        $ {papers[cell.newspaper_id].price}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Newsdeck;
