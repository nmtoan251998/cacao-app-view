/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable keyword-spacing */

import React from 'react';
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
} from 'reactstrap';

import { AppContext } from '../contexts/CartContext';

export default function ProductCart(props) {
  const { Item } = props;
  return(
        <Col lg="6" md="8" sm="10" className="m-2">
        <Card className="d-flex flex-row">
            <div className="d-flex flex-row justify-content-center align-items-center p-4">
                <CardImg top width="100%" src={ Item.image } alt="Card image cap"/>
            </div>
            <CardBody className="d-flex flex-column align-items-start">
                <CardTitle>
                    Tên sản phẩm: { Item.name }
                </CardTitle>
                <CardSubtitle className="text-danger" >
                    Số lượng: {Item.units}
                </CardSubtitle>
                <CardText className="text-left">
                    Nội dung sản phẩm: { Item.description }
                </CardText>
                <AppContext.Consumer>
                    {({ removeFromCart }) => <Button onClick = {() => removeFromCart(Item)} className="mt-auto ml-auto">
                            Xóa khỏi giỏ hàng
                        </Button>}
                </AppContext.Consumer>
            </CardBody>
        </Card>
    </Col>
  );
}
