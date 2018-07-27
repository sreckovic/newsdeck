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

    onDragStart = (e, paper_id) => {
        console.log('dragstart:', paper_id);
        e.dataTransfer.setData('paper_id', paper_id);
    };

    onDrop = (e, cell_id) => {
        let id = e.dataTransfer.getData('paper_id');
        console.log(id);
    };

    onDragOver = e => {
        e.preventDefault();
    };

    render() {
        let papers = this.state.newspapers;

        return (
            <div>
                <p className="predicted">
                    Predicted sales are {this.state.predicted_sales}
                </p>
                <div className="newsdeck-list">
                    {this.state.arrangement.map(cell => (
                        // <Item
                        //     key={cell.cell_number}
                        //     cell={cell}
                        //     papers={papers}
                        // />
                        <div
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
                                    this.onDragStart(e, cell.newspaper_id)
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
