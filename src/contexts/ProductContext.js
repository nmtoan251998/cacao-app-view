/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable eol-last */

import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

export const ProductContext = React.createContext();

export class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
      SearchProducts: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/products/all')
      .then((res) => {
        this.setState({
          Products: res.data.products,
        });
      });
  }

  onChange(e) {
    const { Products } = this.state;
    const SearchProducts = Products.filter((item) => {
      return item.name.indexOf(e.target.value) !== -1;
    });

    this.setState({
      SearchProducts,
    });
  }

  render() {
    return (
            <ProductContext.Provider value = {{
              SearchProducts: this.state.SearchProducts,
              onChange: this.onChange,
            }}>
                { this.props.children }
            </ProductContext.Provider>
    );
  }
}
ProductProvider.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.array,
};