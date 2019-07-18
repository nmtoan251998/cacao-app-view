/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';


export const AppContext = React.createContext();

export class CartContext extends React.Component {
  constructor() {
    super();

    let CartItems;

    let Cart = localStorage.getItem('cart');
    let Count = localStorage.getItem('count');

    if(Cart) {
      CartItems = JSON.parse(Cart)
    } else {
      localStorage.setItem('cart', '')
    }

    if(!Count) {
      localStorage.setItem('count', 0) 
    }

    this.state = {
      CartItems,
      Count,
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  addToCart(item) {
    // eslint-disable-next-line arrow-body-style
    const existItem = this.state.CartItems.filter(x => x._id === item._id);
    if(existItem.length > 0) {
      const withoutItem = this.state.CartItems.filter(x => x._id !== item._id);
      const updateItem = {...existItem[0], units: existItem[0].units + 1}

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
