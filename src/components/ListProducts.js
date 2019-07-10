/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import Axios from 'axios';

import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';

import SweetAlert from 'sweetalert-react';
import { renderToStaticMarkup } from 'react-dom/server';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import Pagination from 'react-js-pagination';

import Product from './Product';
import ProductDetail from './ProductDetail';


import '../../node_modules/sweetalert/dist/sweetalert.css';

const PRODUCTTYPE = new Map();
PRODUCTTYPE.set(1, 'food');
PRODUCTTYPE.set(2, 'drinks');

const SCREENTYPE = new Map();
SCREENTYPE.set('landscape_phones', 576);
SCREENTYPE.set('tablets', 768);
SCREENTYPE.set('desktops', 992);
SCREENTYPE.set('large_desktops', 1400);
export default class ListItems extends React.Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);

    this.onProductClicked = this.onProductClicked.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePaginatingData = this.handlePaginatingData.bind(this);

    this.state = {
      Items: [],
      activeTab: '1',
      DescProduct: {
        _id: '000fff',
        name: 'Loading...',
        price: 1,
        type: 'Loading...',
        featured: false,
        image: 'http://dummyimage.com/300x300.png/5fa2dd/ffffff',
        description: 'Loadinggg',
      },
      showAlert: false,
      activePage: 1,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onProductClicked() {
    Axios.get('/api/products/:id').then((result) => {
      const DescProduct = result.data;
      this.setState(() => ({
        DescProduct,
        showAlert: true,
      }));
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }

  handlePageChange(pageNumber) {
    this.setState(() => ({
      activePage: pageNumber,
    }));
  }

  componentDidMount() {
    Axios.get('/api/products/all').then((result) => {
      const Items = result.data;
      this.setState(() => ({
        Items,
      }));
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handlePaginatingData(Items = []) {
    const currentScreenWidth = window.innerWidth;
    const { activePage: pageNumber } = this.state;
    let NumberOfProductDisplayOnScreen;
    let PaginationData = [];
    if (currentScreenWidth < SCREENTYPE.get('landscape_phones')) {
      PaginationData = Items.slice(4 * (pageNumber - 1), pageNumber * 4);
      NumberOfProductDisplayOnScreen = 4;
    } else if (currentScreenWidth < SCREENTYPE.get('tablets')) {
      PaginationData = Items.slice(6 * (pageNumber - 1), pageNumber * 6);
      NumberOfProductDisplayOnScreen = 6;
    } else if (currentScreenWidth < SCREENTYPE.get('large_desktops')) {
      PaginationData = Items.slice(12 * (pageNumber - 1), pageNumber * 12);
      NumberOfProductDisplayOnScreen = 12;
    } else {
      PaginationData = Items.slice(14 * (pageNumber - 1), pageNumber * 14);
      NumberOfProductDisplayOnScreen = 14;
    }

    while ((PaginationData.length !== 0)
    && (PaginationData.length < NumberOfProductDisplayOnScreen)) {
      PaginationData.push(Items.shift());
    }

    return PaginationData;
  }


  render() {
    let { Items } = this.state;
    const TotalItems = Items.length;
    // Items on state not immutable
    Items = this.handlePaginatingData(Items);
    return (
      <Container>
        <SweetAlert
          show={this.state.showAlert}
          title={this.state.DescProduct.name}
          html
          showCancelButton
          animation="pop"
          confirmButtonText="Đặt hàng"
          cancelButtonText="&nbsp;&nbsp;&nbsp;Đóng&nbsp;&nbsp;&nbsp;"
          text={renderToStaticMarkup(<ProductDetail Item={this.state.DescProduct} />)}
          onConfirm={() => this.setState({ showAlert: false })}
          onCancel={() => this.setState({ showAlert: false })}
          onEscapeKey={() => this.setState({ showAlert: false })}
        />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Logo
                        </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Sản phẩm nổi bật
                        </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Thức uống
                        </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Đồ ăn
                        </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row >
              {this.state.Items.length === 0 && 'Loading....'}
              {
                this.state.Items.length !== 0 && Items.map((Item, index) =>
                  <Product Item={Item} key={Item._id} index={index}
                    onProductClicked={this.onProductClicked}></Product>)
              }
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {this.state.Items.length === 0 && 'Loading....'}
              {
                this.state.Items.length !== 0 && Items.map((Item, index) =>
                  Item.featured
                  && <Product Item={Item} key={Item._id} index={index}
                    onProductClicked={this.onProductClicked} />)
              }
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              {this.state.Items.length === 0 && 'Loading....'}
              {
                this.state.Items.length !== 0 && Items.map((Item, index) =>
                  Item.type === PRODUCTTYPE.get(2)
                  && <Product Item={Item} key={Item._id} index={index}
                    onProductClicked={this.onProductClicked} />)
              }
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              {this.state.Items.length === 0 && 'Loading....'}
              {
                this.state.Items.length !== 0 && Items.map((Item, index) =>
                  Item.type === PRODUCTTYPE.get(1)
                  && <Product Item={Item} key={Item._id} index={index}
                    onProductClicked={this.onProductClicked} />)
              }
            </Row>
          </TabPane>
          <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={Items.length}
                totalItemsCount={TotalItems}
                pageRangeDisplayed={3}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
        </TabContent>
      </Container>
    );
  }
}

ListItems.propTypes = {
  Items: PropTypes.array,
  DescProduct: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    description: PropTypes.string.isRequired,
  }),
};
