import React, { Component } from 'react';
import Produto from './Produto';
import Title from './Title';
import { ProdutoConsumer } from '../Context';

export default class ProdutoList extends Component {
  render() {
  return (
    <React.Fragment>
     <div className="py-5">
       <div className="container">
         <Title name="our produtos" title="produtos" />

       <div className="row">
         <ProdutoConsumer>
           {value => {
             return value.produtos.map( produtos =>{
               return <Produto key={produtos.id} produto={produtos}
               />;
             })
           }}
         </ProdutoConsumer>

       </div>
       </div>
     </div>
    </React.Fragment>
    
  
    
  );
}
}

