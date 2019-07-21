/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable eol-last */
/* eslint-disable import/named */
/* eslint-disable indent */
/* eslint-disable  arrow-body-style */

import React from 'react';
import { Container } from 'reactstrap';

import { AppContext } from '../contexts/CartContext';
import ProductCart from '../components/ProductCart';
import './Cart.css';

export default function Cart() {
        return (
            <Container>
                <div className="Cart-box">
                    <AppContext.Consumer>
                        {({ CartItems }) => CartItems.map((item, index) => {
                            return <ProductCart key={index} Item={item}/>;
                        })}
                    </AppContext.Consumer>
                </div>
            </Container>
        );
}