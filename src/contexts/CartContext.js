/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';


export const AppContext = React.createContext();

export class CartContext extends React.Component {
  constructor() {
    super();

    this.state = {
      CartItems: [],
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(item) {
    // eslint-disable-next-line arrow-body-style
    this.setState((prevState) => {
      return {
        CartItems: prevState.CartItems.concat(item),
      };
    });
  }

  render() {
    return (
        <AppContext.Provider value = {
            {
              CartItems: this.state.CartItems,
              addToCart: this.addToCart,
            }
        }>
            { this.props.children }
        </AppContext.Provider>
    );
  }
}

CartContext.propTypes = {
  CartItems: PropTypes.array,
  addToCart: PropTypes.func,
  children: PropTypes.array,
};
