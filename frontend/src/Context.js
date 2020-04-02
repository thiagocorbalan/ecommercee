import React, { Component } from 'react';
import { storeProdutos, detailProduto} from './Data';

const ProdutoContext = React.createContext();
//Provider
//Consumer

class ProdutoProvider extends Component {
    state = {
        produtos: [],
        detailProduto:detailProduto,
        cart:[],
        modalOpen: true,
        modalProdact: detailProduto,

    };
    componentDidMount() {
        this.setProduto();
    }
    setProduto = () => {
        let tempProduto = [];
        storeProdutos.forEach(item => {
            const singleItem = {...item};
            tempProduto = [...tempProduto, singleItem];
        } );
        this.setState(() => {
            return { produtos: tempProduto};
        });
    };

    getItem = id  => {
        const produto = this.state.produtos.find(item => item.id === id);
        return produto;
    };

    handleDatail = id => {
        const produtos = this.getItem(id);
        this.setState(() => {
         return {detailProduto:produtos}
        })  
    };
    addToCart = id => {
        let tempProduto = [...this.state.produtos];
        const index = tempProduto.indexOf(this.getItem(id));
        const produto = tempProduto[index];
        produto.inCart = true;
        produto.count = 1;
        const price = produto.price;
        produto.total = price;
     this.setState(() => {
         return {produto: tempProduto, cart: [...this.state.cart,
        produto]};
     },()=> {console.log(this.state)});    
    };
  openModal = id => {
      const produto = this.getItem(id);
      this.setState(() => {
          return {modalProduto:produto, modalOpen:true}
      });
  };
  closeModal = () => {
      this.setState(() => {
          return {modalOpen: false}
      });
    };
   
    render() {
        return (
            <ProdutoContext.Provider value={{
               ...this.state,
               handleDatail:this.handleDatail,
               addToCart:this.addToCart,
               openModal:this.openModal,
               closeModal:this.closeModal

            }}>
                {this.props.children}
            </ProdutoContext.Provider>
        );
    }
}

const ProdutoConsumer = ProdutoContext.Consumer;
export { ProdutoProvider, ProdutoConsumer };