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
import RelatedCard from '../components/RelatedCard';
import './Cart.css';

export default function Cart() {
        return (
            <Container>
                <AppContext.Consumer>
                    {({ CartItems }) => {
                        if (CartItems.length === 0) {
                            return (
                                <h3 className="text-center p-4">Bạn không có sản phẩm nào trong giỏ hàng!</h3>
                            );
                        }
                        return (
                                <div>
                                    <div className="Cart-box">
                                        <h5>Giỏ hàng của bạn:</h5>
                                        {CartItems.map((item, index) => {
                                            return <ProductCart key={index} Item={item}/>;
                                        })}
                                    </div>
                                    <div className="d-flex flex-column align-items-center p-4">
                                        <h5>Có thể bạn quan tâm:</h5>
                                        <div className="Related-products">
                                            <AppContext.Consumer>
                                                {({ Related }) => Related.map((item, index) => {
                                                    return <RelatedCard key={index} Item={item}/>;
                                                })}
                                            </AppContext.Consumer>
                                        </div>
                                    </div>
                                </div>
                            );
                    }}
                </AppContext.Consumer>
            </Container>
        );
}
