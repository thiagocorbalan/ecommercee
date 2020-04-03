import React, { Component } from 'react'

export default class CartColumns extends Component {
    render() {
        return (
            <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
            <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">produto</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">nome do produto</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">preço</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">quantidade</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">remove</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">total</p>
            </div>
            </div>
            </div>
        );
    }
}
