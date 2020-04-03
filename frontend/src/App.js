import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/Navbar';
import ProdutoList from './component/ProdutoList';
import Datails from './component/Datails';
import Cart from './component/Cart/Cart.js';
import Default from './component/Default';
import Modal from './component/Modal';

class App extends Component {
  render() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProdutoList} />
        <Route path="/datails" component={Datails} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal  />
    </React.Fragment>
  );
}
}

export default App;
