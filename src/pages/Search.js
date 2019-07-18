import React from 'react';
import { Container, Row } from 'reactstrap';

import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';

export default function Search(props) {
    return(
        <Container>
            <Row>
                <ProductContext.Consumer>
                    {({ SearchProducts }) => {
                        if(SearchProducts === []) {
                            return <h5>Không tìm thấy sản phẩm</h5>
                        } else {
                            return SearchProducts.map((item, index) => <Product key={index} Item={item} />)
                        };
                    }}
                </ProductContext.Consumer>
            </Row>
        </Container>
    )
} 