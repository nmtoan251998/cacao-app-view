import React from 'react';

import {
    Col, Card, CardImg, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

export default function Item(props) {
    let { Item } = props;
    console.log(props);

    return (
        <Col sm="4" md="2" xs="6" className="px-1 my-1">
            <Card>
                <div className="position-relative">
                    <CardImg top width="100%" src={Item.product_image} alt="Card image cap" />
                    <div className="btn--group position-absolute fixed-bottom d-flex justify-content-center

                    " >
                        <button className="btn btn-dark w-50 btn-sm rounded-0">Chi tiết</button>
                        <button className="btn btn-dark w-50 btn-sm rounded-0">Đặt hàng</button>
                    </div>
                </div>
                <CardBody>
                    <CardTitle>{Item.product_name}</CardTitle>
                    <CardSubtitle>{Item.price}</CardSubtitle>
                </CardBody>
            </Card>
        </Col>
    )
}