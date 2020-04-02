import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {ButtonContainer} from './Button';
import { ProdutoConsumer } from '../Context';
import PropTypes from 'prop-types';

export default class Datails extends Component {
  render() {
  return (
      <ProdutoConsumer>
          {value => { 
          const {
              id, 
              company,
               img, 
               info,
                price,
                title,
                inCart 
            } = value.detailProduto;
            return(
                <div className="container py-5">
                     {/* title */}
                <div className="row">
                <div className="col-10 mx-auto text-center text-slanted
                text-blue my-5">
                    <h1>{title}</h1>
                </div>
                </div>
                {/* end title */}
                {/* produto info */}
                <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 
                text-capitalize">
                <img src={img} className="img-fluid" alt="produto" />
                </div>
                {/* produto text */}
                <div className="col-10 max-auto col-md-6 my-3 
                text-capitalize">
                    <h2>model: {title}</h2>
                    <h4 className="text-title text-uppercase
                    text-muted mt-3 mb-2">
                        made by: <span className="text-uppercase">
                        {company}</span>
                    </h4>
                    <h4 className="text-blue">
                        <strong>
                        price: <span>$</span>
                        {price}
                        </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold
                    mt-3 mb-0">
                        some info about produto:
                    </p>
                    <p className="text-muted lead">{info}</p>
                    {/* buttons */}
                    <div>
                        <Link to="/">
                            <ButtonContainer>
                                back to produtos
                            </ButtonContainer>
                        </Link>
                        <ButtonContainer
                        cart
                        disabled={inCart ? true:false}
                        onClick={() => {
                            value.addToCart(id);
                            value.openModal(id);
                        }}
                        >
                            {inCart ? "inCart" : "add to cart"}
                        </ButtonContainer>
                    </div>
                </div>
                </div>
                </div>
            );
          }}

          </ProdutoConsumer>
  );
        }
}