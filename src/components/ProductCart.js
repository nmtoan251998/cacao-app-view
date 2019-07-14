import React, { Component } from 'react';
import {
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Button,
    CardSubtitle
} from "reactstrap";

export default class ProductCart extends Component {
    render() {
        const { Item } = this.props
        return(
            <Col md="6" className="m-2">
                <Card className="d-flex flex-row">
                    <div className="d-flex flex-row justify-content-center align-items-center p-4">
                        <CardImg top width="100%" src={ Item.image } alt="Card image cap"/>
                    </div>
                    <CardBody className="d-flex flex-column align-items-start">
                        <CardTitle>
                            <h6>Tên sản phẩm:</h6> { Item.name }
                        </CardTitle>
                        <CardSubtitle className="text-danger" >
                            <h6>Số lượng: {Item.units}</h6>
                        </CardSubtitle>
                        <CardText className="text-left">
                            <h6>Nội dung sản phẩm:</h6> {Item.description}
                        </CardText>
                        <Button className="mt-auto ml-auto">Xóa khỏi giỏ hàng</Button>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}