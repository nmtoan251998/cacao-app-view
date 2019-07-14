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
            drinkEnd: 6,
            foodEnd: 6,
        };
    };

    componentDidMount() {
        Axios.get('http://localhost:5000/api/products/all')
        .then(res => {
            const products = res.data.products;
            const drink = products.filter(item => item.type === 'drink');
            const food = products.filter(item => item.type === 'food');
            
            this.setState({
                drink,
                food,
            })
        })
    };

    showMoreDrink() {
        this.setState({
            drinkEnd: this.state.drinkEnd + 6
        })
    }

    showLessDrink() {
        this.setState({
            drinkEnd: this.state.drinkEnd - 6
        })
    }

    showMoreFood() {
        this.setState({
            foodEnd: this.state.foodEnd + 6
        })
    }

    showLessFood() {
        this.setState({
            foodEnd: this.state.foodEnd - 6
        })
    }

    render() {
        const { drink, food } = this.state;
        const showDrink = drink.slice(0, this.state.drinkEnd);
        const showFood = food.slice(0, this.state.foodEnd);
            
        return(
            <Container>
                <div className="products-content">
                    <h3>Thức uống</h3>
                    <Row>
                        {showDrink.map((item, index) => <Product key={index} Item= {item} />)}
                    </Row>
                    {this.state.drinkEnd > 6 
                        && <a href="#" onClick={this.showLessDrink.bind(this)} >thu gọn lại</a>}
                    {this.state.drinkEnd < drink.length 
                        && <a href="#" onClick={this.showMoreDrink.bind(this)} >xem thêm</a>}
                </div>
                <div className="products-content">
                    <h2>Đồ ăn</h2>
                    <Row>
                        {showFood.map((item, index) => <Product key={index} Item= {item} />)}
                    </Row>
                    {this.state.foodEnd > 6 
                        && <a href="#" onClick={this.showLessFood.bind(this)} >thu gọn lại</a>}
                    {this.state.foodEnd < drink.length 
                        && <a href="#" onClick={this.showMoreFood.bind(this)} >xem thêm</a>}
                </div>
            </Container>
        )
    };
}

Order.propTypes = {
    drink: PropTypes.array,
    food: PropTypes.array,
};
  