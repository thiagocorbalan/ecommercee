import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import { ProdutoConsumer } from '../../Context';
import CartList from './CartList';
import CartTotal from './CartTotal.js';

export default class Cart extends Component {
    render() {
        return (
          <section>
            <ProdutoConsumer>
                {value => {
                    const {cart} = value;
                    if(cart.length>0) {
                     return(
                         <React.Fragment>
                            <Title name="Seu Carrinho" title="Carrinho"/>
                            <CartColumns />
                            <CartList value={value} />
                            <CartTotal value={value} />
                         </React.Fragment>
                        );
                    }else{
                       return  <EmptyCart />;
                    }
                    }}
                </ProdutoConsumer>
            </section>
        );
    }
}