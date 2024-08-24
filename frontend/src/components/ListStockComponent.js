import React, { Component } from 'react';
import StockService from '../services/StockService';

class ListStockComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stocks: []
        };

        this.addStock = this.addStock.bind(this);
        this.editStock = this.editStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
    }

    componentDidMount() {
        StockService.getStocks().then((res) => {
            this.setState({ stocks: res.data });
        });
    }

    addStock() {
        this.props.history.push('/add-stock');
    }

    editStock(id) {
        this.props.history.push(`/update-stock/${id}`);
    }

    deleteStock(id) {
        StockService.deleteStock(id).then(res => {
            this.setState({ stocks: this.state.stocks.filter(stock => stock.id !== id) });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Stock List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addStock}>Add Stock</button>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Stock Name</th>
                                <th>Price Date</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Volume</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stocks.map(
                                    stock =>
                                        <tr key={stock.id}>
                                            <td>{stock.stockname}</td>
                                            <td>{stock.pricedate}</td>
                                            <td>{stock.price}</td>
                                            <td>{stock.quantity}</td>
                                            <td>{stock.volume}</td>
                                            <td>
                                                <button onClick={() => this.editStock(stock.id)} className="btn btn-info">Update</button>
                                                <button onClick={() => this.deleteStock(stock.id)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListStockComponent;
