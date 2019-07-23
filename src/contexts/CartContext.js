/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

export const AppContext = React.createContext();

export class CartContext extends React.Component {
  constructor() {
    super();

    let Cart = localStorage.getItem('cart');
    let Count = localStorage.getItem('count');

    if(!Cart) {
      localStorage.setItem('cart', '[]')
    } 

    if(!Count) {
      localStorage.setItem('count', '0') 
    } 

    this.state = {
      CartItems: JSON.parse(Cart) || [],
      Count: JSON.parse(Count) || 0,
      Related: [],
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  related(item) {
    //find type of item to related
    let type = item.type;
    Axios.get('/api/products/all')
      .then((res) => {
        const data = res.data.products.filter((x) => {
          return x.type === type
        });

        const randomIndex = Math.round(Math.random() * (data.length - 4));
        this.setState({
          Related: data.slice(randomIndex, randomIndex + 4),
        })
      });
  }

  addToCart(item) {
    // eslint-disable-next-line arrow-body-style
    const existItem = this.state.CartItems.filter(x => x._id === item._id);
    if(existItem.length > 0) {
      const withoutItem = this.state.CartItems.filter(x => x._id !== item._id);
      const updateItem = {
        ...existItem[0], units: existItem[0].units + 1
      }

      this.setState({
        CartItems: [...withoutItem, updateItem],
        Count: this.state.Count + 1
      })
    } 
    else {
      this.setState((prevState) => {
        return {
          CartItems: prevState.CartItems.concat({...item, units: 1}),
          Count: this.state.Count + 1
        };
      });
    }

    this.related(item)
  }

  removeFromCart(item) {
    const { CartItems } = this.state;
    const index = CartItems.indexOf(item);
    const withoutItemBefore = CartItems.slice(0, index);
    const withoutItemAfter = CartItems.slice(index + 1, CartItems.length);
    this.setState({
      CartItems: [...withoutItemBefore, ...withoutItemAfter],
      Count: this.state.Count - CartItems[index].units 
    })
  }

  render() {
    localStorage.cart = JSON.stringify(this.state.CartItems);
    localStorage.count = this.state.Count;
    return (
        <AppContext.Provider value = {
            {
              CartItems: this.state.CartItems,
              Related: this.state.Related,
              Count: this.state.Count,
              addToCart: this.addToCart,
              removeFromCart: this.removeFromCart
            }
        }>
            { this.props.children }
        </AppContext.Provider>
    );
  }
}

CartContext.propTypes = {
  CartItems: PropTypes.array,
  Count: PropTypes.number,
  addToCart: PropTypes.func,
  children: PropTypes.array,
};