import React, { Component } from 'react';
import StockService from '../services/StockService';

class CreateStockComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            stockname: '',
            pricedate: '',
            price: '',
            quantity: '',
            volume: ''
        };

        this.changeStocknameHandler = this.changeStocknameHandler.bind(this);
        this.changePricedateHandler = this.changePricedateHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.changeVolumeHandler = this.changeVolumeHandler.bind(this);
        this.saveOrUpdateStock = this.saveOrUpdateStock.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return;
        } else {
            StockService.getStockById(this.state.id).then((res) => {
                let stock = res.data;
                this.setState({
                    stockname: stock.stockname,
                    pricedate: stock.pricedate,
                    price: stock.price,
                    quantity: stock.quantity,
                    volume: stock.volume
                });
            });
        }
    }

    saveOrUpdateStock(e) {
        e.preventDefault();
        let stock = {
            stockname: this.state.stockname,
            pricedate: this.state.pricedate,
            price: this.state.price,
            quantity: this.state.quantity,
            volume: this.state.volume
        };

        if (this.state.id === '_add') {
            StockService.createStock(stock).then(res => {
                this.props.history.push('/stocks');
            });
        } else {
            StockService.updateStock(stock, this.state.id).then(res => {
                this.props.history.push('/stocks');
            });
        }
    }

    changeStocknameHandler(event) {
        this.setState({ stockname: event.target.value });
    }

    changePricedateHandler(event) {
        this.setState({ pricedate: event.target.value });
    }

    changePriceHandler(event) {
        this.setState({ price: event.target.value });
    }

    changeQuantityHandler(event) {
        this.setState({ quantity: event.target.value });
    }

    changeVolumeHandler(event) {
        this.setState({ volume: event.target.value });
    }

    cancel() {
        this.props.history.push('/stocks');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Stock</h3>;
        } else {
            return <h3 className="text-center">Update Stock</h3>;
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Stock Name: </label>
                                        <input placeholder="Stock Name" name="stockname" className="form-control"
                                            value={this.state.stockname} onChange={this.changeStocknameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Price Date: </label>
                                        <input type="date" name="pricedate" className="form-control"
                                            value={this.state.pricedate} onChange={this.changePricedateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Price: </label>
                                        <input placeholder="Price" name="price" className="form-control"
                                            value={this.state.price} onChange={this.changePriceHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Quantity: </label>
                                        <input placeholder="Quantity" name="quantity" className="form-control"
                                            value={this.state.quantity} onChange={this.changeQuantityHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Volume: </label>
                                        <input placeholder="Volume" name="volume" className="form-control"
                                            value={this.state.volume} onChange={this.changeVolumeHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateStock}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateStockComponent;
