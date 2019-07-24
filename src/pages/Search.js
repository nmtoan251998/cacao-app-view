/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable eol-last */

import React from 'react';
import { Container, Row } from 'reactstrap';

import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';

export default function Search() {
  return (
      <Container>
                <ProductContext.Consumer>
                    {({ SearchProducts }) => {
                      return (
                            <div>
                                {SearchProducts.length > 0 && <p>Tìm thấy {SearchProducts.length} sản phẩm</p>}
                                {SearchProducts.length === 0 && <p>Không tìm thấy sản phẩm phù hợp</p>}
                                <Row>
                                    {SearchProducts.map((item, index) => <Product key={index} Item={ item }/>)}
                                </Row>
                            </div>
                      );    
                    }}
                </ProductContext.Consumer>
        </Container>
  );
} 