/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import Axios from 'axios';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import Product from '../components/Product';
import './order.css';

export default class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drink: [],
      food: [],
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/products/all')
      .then((res) => {
        const Items = res.data.products;
        const drink = Items.filter(item => item.type === 'drink');
        const food = Items.filter(item => item.type === 'food');

        this.setState({
          drink,
          food,
        });
      });
  }

  render() {    
    return (
            <Container>
                <div className="products-content">
                    <h3>Thức uống</h3>
                    <Row>
                        {this.state.drink.map((item, index) => (
                        <Product key={index} Item= {item} />
                        ))}
                    </Row>
                </div>
                <div className="products-content">
                    <h2>Đồ ăn</h2>
                    <Row>
                        {this.state.food.map((item, index) => <Product key={index} Item= {item} />)}
                    </Row>
                </div>
            </Container>
    );
  }
}

Order.propTypes = {
  drink: PropTypes.array,
  food: PropTypes.array,
};