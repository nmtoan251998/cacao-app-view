/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Card, CardImg, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import classNames from 'classnames';

// eslint-disable-next-line import/named
import { AppContext } from '../contexts/CartContext';

export default function Product(props) {
  const { Item, visible } = props;
  return (
        <Col sm="4" md="3" lg="2" xs="6" className="px-1 my-1">
            <Card className={classNames({ [`${visible} noselect`]: typeof visible !== 'undefined' })}>
                <div className="position-relative">
                    <CardImg top width="100%" src={Item.image || 'http://dummyimage.com/300x300.png/5fa2dd/ffffff'} alt="Card image cap" />
                    <div className="btn--group position-absolute fixed-bottom d-flex justify-content-center " >
                        <button className="btn btn-dark w-50 btn-sm rounded-0" onClick={props.onProductClicked}>Chi tiết</button>
                        <AppContext.Consumer>
                          { ({ addToCart }) => (
                            <button className="btn btn-dark w-50 btn-sm rounded-0" onClick = {
                              () => addToCart(Item)
                            }>Đặt hàng </button>
                          )}
                        </AppContext.Consumer>
                    </div>
                </div>
                <CardBody>
                    <CardTitle>{Item.name}</CardTitle>
                    <CardSubtitle>{Item.price}</CardSubtitle>
                </CardBody>
            </Card>
        </Col>
  );
}

Product.propTypes = {
  Item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    type: PropTypes.oneOf(['food', 'drinks']),
  }),
  onProductClicked: PropTypes.func,
  visible: PropTypes.oneOf(['u-opacity-0', '']),
};
