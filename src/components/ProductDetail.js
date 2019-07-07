/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, CardText,
} from 'reactstrap';

export default function ProductDetail(props) {
  const { Item } = props;

  return (
            <div className="w-50 mx-auto">
              <Card >
                <div className="position-relative ">
                    <CardImg top width="50%" src={Item.image || 'http://dummyimage.com/300x300.png/5fa2dd/ffffff'} alt="Card image cap" />
                    <div className="btn--group position-absolute fixed-bottom d-flex justify-content-center

                    " >
                    </div>
                </div>
                <CardBody>
                    <CardTitle>{Item.name}</CardTitle>
                    <CardSubtitle>{Item.price}</CardSubtitle>
                    <CardText>{Item.description}</CardText>
                </CardBody>
            </Card>
            </div>
  );
}


ProductDetail.propTypes = {
  Item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    description: PropTypes.string.isRequired,
  }),
  onProductClicked: PropTypes.func,
};
