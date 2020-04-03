import React, { Component } from "react";
import { storeProdutos, detailProduto } from "./Data";
const ProdutoContext = React.createContext();

class ProdutoProvider extends Component {
  state = {
    produtos: [],
    detailProduto: detailProduto,
    cart: [],
    modalOpen: false,
    modalProdact: detailProduto,
    cartSubTotal: 10,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProduto();
  }
  setProduto = () => {
    let tempProduto = [];
    storeProdutos.forEach(item => {
      const singleItem = { ...item };
      tempProduto = [...tempProduto, singleItem];
    });
    this.setState(() => {
      return { produtos: tempProduto };
    });
  };

  getItem = id => {
    const produto = this.state.produtos.find(item => item.id === id);
    return produto;
  };

  handleDatail = id => {
    const produtos = this.getItem(id);
    this.setState(() => {
      return { detailProduto: produtos };
    });
  };
  addToCart = id => {
    let tempProduto = [...this.state.produtos];
    const index = tempProduto.indexOf(this.getItem(id));
    const produto = tempProduto[index];
    produto.inCart = true;
    produto.count = 1;
    const price = produto.price;
    produto.total = price;
    this.setState(
      () => {
        return { produto: tempProduto, cart: [...this.state.cart, produto] };
      },
      () => {
        this.addTotal();
      }
    );
  };
  openModal = id => {
    const produto = this.getItem(id);
    this.setState(() => {
      return { modalProduto: produto, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = id => {
    let tempCart = { ...this.state.cart };
    const selectedProduto = tempCart.find(item => item.id == id);
    const index = tempCart.indexOf(selectedProduto);
    const produto = tempCart[index];
    produto.count = produto.count + 1;
    produto.total = produto.count * produto.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotal();
      }
    );
  };
  decrement = id => {
    let tempCart = { ...this.state.cart };
    const selectedProduto = tempCart.find(item => item.id == id);
    const index = tempCart.indexOf(selectedProduto);
    const produto = tempCart[index];

    produto.count = produto.count - 1;
    if (produto.count === 0) {
      this.removeItem(id);
    } else {
      produto.total = produto.count * produto.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotal();
        }
      );
    }
    removeItem = id => {
      let tempProduto = [...this.state.produtos];
      let tempCart = [...this.state.cart];
      tempCart = tempCart.filter(item => item.id !== id);

      const index = tempProduto.indexOf(this.getItem(id));
      let removedProduto = tempProduto[index];
      removedProduto.inCart = false;
      removedProduto.count = 0;
      removedProduto.total = 0;

      this.setState(
        () => {
          return {
            cart: [...tempCart],
            produtos: [...tempProduto]
          };
        },
        () => {
          this.addTotal();
        }
      );
    };

    clearCart = () => {
      this.setState(
        () => {
          return { cart: [] };
        },
        () => {
          this.setProduto();
          this.addTotal();
        }
      );
    };
    addTotal = () => {
      let subTotal = 0;
      this.state.cart.map(item => (subTotal += item.total));
      const tempTax = subTotal * 0.1;
      const tax = parseFloat(tempTax.toFixed(2));
      const total = subTotal + tax;
      this.setState(() => {
        return {
          cartSubTotal: subTotal,
          cartTax: tax,
          cartTotal: total
        };
      });
    };
  };

  render() {
    return (
      <ProdutoContext.Provider
        value={{
          ...this.state,
          handleDatail: this.handleDatail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,

clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProdutoContext.Provider>
    );
  }
}

const ProdutoConsumer = ProdutoContext.Consumer;
export { ProdutoProvider, ProdutoConsumer };