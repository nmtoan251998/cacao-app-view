/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';


export const AppContext = React.createContext();

export class CartContext extends React.Component {
  constructor() {
    super();

    this.state = {
      CartItems: [],
      Count: 0
    };

    this.addToCart = this.addToCart.bind(this);
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
  }

  render() {
    return (
        <AppContext.Provider value = {
            {
              CartItems: this.state.CartItems,
              Count: this.state.Count,
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
  Count: PropTypes.number,
  addToCart: PropTypes.func,
  children: PropTypes.array,
};
