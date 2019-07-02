/* eslint-disable linebreak-style */
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

import Product from './Product';
import ProductDetail from './ProductDetail';

import '../../node_modules/sweetalert/dist/sweetalert.css';

const PRODUCTTYPE = new Map();
PRODUCTTYPE.set(1, 'food');
PRODUCTTYPE.set(2, 'drinks');

export default class ListItems extends React.Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);

    this.onProductClicked = this.onProductClicked.bind(this);

    this.state = {
      Items: [],
      activeTab: '1',
      DescProduct: {},
      showAlert: false,
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


  render() {
    const { Items } = this.state;
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
              text={ renderToStaticMarkup(<ProductDetail Item={this.state.DescProduct}/>) }
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
                                    <Product Item={Item} key={index} index={index}
                                    onProductClicked={this.onProductClicked} />)
                            }
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            {this.state.Items.length === 0 && 'Loading....'}
                            {
                                this.state.Items.length !== 0 && Items.map((Item, index) =>
                                  Item.featured
                                    && <Product Item={Item} key={index} index={index}
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
                                    && <Product Item={Item} key={index} index={index}
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
                                  && <Product Item={Item} key={index} index={index}
                                  onProductClicked={this.onProductClicked} />)
                            }
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
    );
  }
}

ListItems.propTypes = {
  Items: PropTypes.array,
  DescProduct: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    description: PropTypes.string.isRequired,
  }),
};
