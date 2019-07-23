/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable eol-last */
/* eslint-disable import/named */
import React, { Component } from 'react';
import { Container } from 'reactstrap';

import { AppContext } from '../contexts/CartContext';
import ProductCart from '../components/ProductCart';
import './Cart.css'

class Cart extends Component {
    render() {
        return(
            <Container>
                <div className="Cart-box">
                    <AppContext.Consumer>
                        {({CartItems}) => CartItems.map(item => <ProductCart
                        Item={item}/>)}
                    </AppContext.Consumer>
                </div>
            </Container>
        )
    }
}

export default Cart;
