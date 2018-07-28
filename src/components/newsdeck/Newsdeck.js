import React, { Component } from 'react';

import axios from '../../axios';

// import Item from './Item';
import StatusBar from '../status-bar/StatusBar';
import Spinner from '../ui/spinner/Spinner';

class Newsdeck extends Component {
    state = {
        arrangement: [],
        loadArrangement: [],
        newspapers: {},
        predicted_sales: null,
        sales: null, // Save first predicted_sales
        loading: true,
        errors: null
    };

    componentDidMount() {
        // this.fetchData('current_arrangement', '');
        axios
            .get('/current_arrangement')
            .then(res => {
                this.setState({
                    arrangement: res.data.arrangement,
                    newspapers: res.data.newspapers,
                    predicted_sales: res.data.predicted_sales,
                    loading: false
                });
            })
            .then(res => {
                this.setState({ sales: this.state.predicted_sales });
            })
            .catch(err => {
                this.setState({ errors: err, loading: true });
            });
    }

    fetchData(url, sequence) {
        axios
            .get(`/${url}${sequence}`)
            .then(res => {
                // You can update just predicted_sales
                this.setState({
                    arrangement: res.data.arrangement,
                    newspapers: res.data.newspapers,
                    predicted_sales: res.data.predicted_sales,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({ errors: err });
            });
    }

    onDragStart = (e, cell_id) => {
        e.dataTransfer.setData('text/plain', cell_id);
    };

    onDragOver = e => {
        e.preventDefault();
    };

    onDrop = e => {
        let id = parseInt(e.dataTransfer.getData('text'), 10);
        let cur = parseInt(e.target.parentNode.parentNode.id, 10);
        let inc, out;

        // Newspaper ID's
        this.state.arrangement.forEach(cell => {
            if (cell.cell_number === id) {
                inc = cell.newspaper_id;
            }
            if (cell.cell_number === cur) {
                out = cell.newspaper_id;
            }
        });

        // Replace Newspaper ID's in arrangement cell
        this.state.arrangement.filter(cell => {
            if (cell.cell_number === id) {
                cell.newspaper_id = out;
            } else if (cell.cell_number === cur) {
                cell.newspaper_id = inc;
            }
            return cell;
        });

        // This can be used to spead up render, so we don't wait for update() call
        // this.setState({
        //     ...this.state,
        //     arrangement
        // });

        this.update();
    };

    update() {
        let sequence = [];

        // Create new sequence (arrangement)
        this.state.arrangement.forEach(cell => {
            sequence.push(cell.newspaper_id);
        });

        // Enable <Spinner /> when updating
        // this.setState({ loading: true });

        this.fetchData('get_predicted_sales?arrangement=', sequence);
    }

    onClickHandler = () => {
        console.log(this.state.arrangement);
    };

    render() {
        console.log(this.state);

        let papers = this.state.newspapers;
        let content;

        if (this.state.loading || this.state.arrangement === undefined) {
            content = <Spinner />;
        } else {
            content = this.state.arrangement.map(cell => (
                // <Item
                //     key={cell.cell_number}
                //     cell={cell}
                //     papers={papers}
                // />
                <div
                    id={cell.cell_number}
                    key={cell.cell_number}
                    onDragOver={e => this.onDragOver(e)}
                    onDrop={e => {
                        this.onDrop(e);
                    }}
                >
                    <div
                        className="paper"
                        draggable
                        onDragStart={e => this.onDragStart(e, cell.cell_number)}
                    >
                        <img
                            draggable="false"
                            src={
                                typeof papers[cell.newspaper_id] !== 'undefined'
                                    ? papers[cell.newspaper_id].img
                                    : null
                            }
                            alt={
                                typeof papers[cell.newspaper_id] !== 'undefined'
                                    ? papers[cell.newspaper_id].name
                                    : ''
                            }
                        />
                        <h2>
                            {typeof papers[cell.newspaper_id] !== 'undefined'
                                ? papers[cell.newspaper_id].name
                                : 'Error!'}
                        </h2>
                        <p className="price">
                            Price:{' '}
                            <strong>
                                ${' '}
                                {typeof papers[cell.newspaper_id] !==
                                'undefined'
                                    ? papers[cell.newspaper_id].price
                                    : ''}
                            </strong>
                        </p>
                    </div>
                </div>
            ));
        }

        return (
            <div className="container">
                {this.state.errors ? <div className="error" /> : null}
                {this.state.loading || this.state.arrangement === undefined ? (
                    content
                ) : (
                    <div className="newsdeck-list">{content}</div>
                )}
                <StatusBar
                    predicted_sales={this.state.predicted_sales}
                    sales={this.state.sales}
                    onClickHandler={this.onClickHandler}
                />
            </div>
        );
    }
}

export default Newsdeck;
