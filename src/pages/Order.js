/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import Axios from 'axios';
import classnames from 'classnames';

import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import SweetAlert from 'sweetalert-react';
import { renderToStaticMarkup } from 'react-dom/server';

import PropTypes from 'prop-types';

import Pagination from 'react-js-pagination';

import Product from '../components/Product';
import ProductDetail from '../components/ProductDetail';

import '../../node_modules/sweetalert/dist/sweetalert.css';

const PRODUCTTYPE = new Map();
PRODUCTTYPE.set(1, 'food');
PRODUCTTYPE.set(2, 'drinks');
PRODUCTTYPE.set(3, 'featured');

const SCREENTYPE = new Map();
SCREENTYPE.set('landscape_phones', 576);
SCREENTYPE.set('tablets', 768);
SCREENTYPE.set('desktops', 992);
SCREENTYPE.set('large_desktops', 1400);
export default class ListItems extends React.Component {
  constructor() {
    super();

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.onProductClicked = this.onProductClicked.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePaginatingData = this.handlePaginatingData.bind(this);
    this.onDropdownItemClick = this.onDropdownItemClick.bind(this);

    this.state = {
      Items: [],
      CurrentItems: [],
      activeTab: '1',
      DescProduct: {
        _id: '000fff',
        name: 'Loading...',
        price: 100,
        type: 'Loading...',
        featured: false,
        image: 'http://dummyimage.com/300x300.png/5fa2dd/ffffff',
        description: 'Loadinggg',
      },
      CurrentDevice: 'desktops',
      showAlert: false,
      activePage: 1,
      dropdownOpen: false,
    };
  }

  toggleNav(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
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
      console.error(err);
    });
  }

  handlePageChange(pageNumber) {
    this.setState(() => ({
      activePage: pageNumber,
    }));
  }

  onDropdownItemClick(sender) {
    const sortType = sender.currentTarget.getAttribute('dropdownvalue');
    const { Items } = this.state;
    switch (sortType) {
      case 'low-to-high':
        Items.sort((a, b) => ((a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)));
        this.setState(() => Items);
        break;
      case 'high-to-low':
        Items.sort((a, b) => ((a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0)));
        this.setState(() => Items);
        break;
      case 'discount':
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    Axios.get('/api/products/all').then((result) => {
      const { products: Items } = result.data;
      this.setState(() => ({
        Items,
      }));
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handlePaginatingData(Items = [], DisplayType) {
    // console.log(Items);
    const currentScreenWidth = window.innerWidth;
    const { activePage: pageNumber } = this.state;
    let CurrentItems = Array.from(Items);
    let ItemsAfterFilter = [];
    let NumberOfProductDisplayOnScreen;
    let PaginationData = [];
    switch (DisplayType) {
      case '2':
        CurrentItems = CurrentItems.filter(Item => Item.featured);
        break;
      case '3':
        CurrentItems = CurrentItems.filter(Item => Item.type === PRODUCTTYPE.get(2));
        break;
      case '4':
        CurrentItems = CurrentItems.filter(Item => Item.type === PRODUCTTYPE.get(1));
        break;
      default:
        break;
    }

    ItemsAfterFilter = Array.from(CurrentItems);

    if (currentScreenWidth < SCREENTYPE.get('landscape_phones')) {
      PaginationData = CurrentItems.slice(4 * (pageNumber - 1), pageNumber * 4);
      NumberOfProductDisplayOnScreen = 4;
    } else if (currentScreenWidth < SCREENTYPE.get('tablets')) {
      PaginationData = CurrentItems.slice(6 * (pageNumber - 1), pageNumber * 6);
      NumberOfProductDisplayOnScreen = 6;
    } else if (currentScreenWidth < SCREENTYPE.get('large_desktops')) {
      PaginationData = CurrentItems.slice(12 * (pageNumber - 1), pageNumber * 12);
      NumberOfProductDisplayOnScreen = 12;
    } else {
      PaginationData = CurrentItems.slice(14 * (pageNumber - 1), pageNumber * 14);
      NumberOfProductDisplayOnScreen = 14;
    }
    const NumberOfCurrentProduct = PaginationData.length;
    while ((PaginationData.length !== 0)
      && (PaginationData.length < NumberOfProductDisplayOnScreen)) {
      PaginationData.push(CurrentItems.shift());
    }
    return { CurrentItems: PaginationData, ItemsAfterFilter, NumberOfCurrentProduct };
  }

  resize() {
    const currentScreenWidth = window.innerWidth;
    if (currentScreenWidth < SCREENTYPE.get('landscape_phones')) {
      this.setState(() => ({
        CurrentDevice: 'landscape_phones',
      }));
    } else if (currentScreenWidth < SCREENTYPE.get('tablets')) {
      this.setState(() => ({
        CurrentDevice: 'tablets',
      }));
    } else if (currentScreenWidth < SCREENTYPE.get('large_desktops')) {
      this.setState(() => ({
        CurrentDevice: 'large_desktops',
      }));
    }
  }

  render() {
    const { Items, activeTab } = this.state;
    // Items on state not immutable
    const {
      CurrentItems,
      ItemsAfterFilter,
      NumberOfCurrentProduct,
    } = this.handlePaginatingData(Items, activeTab);
    // eslint-disable-next-line prefer-const
    const TotalDisplayItems = ItemsAfterFilter.length;
    const TotalCurrentItems = CurrentItems.length;
    let PageRange = Math.ceil(TotalDisplayItems / TotalCurrentItems);
    // eslint-disable-next-line no-unused-expressions
    PageRange < 3 ? PageRange : PageRange = 3;
    // window.onresize = this.resize.bind(this);
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
              onClick={() => { this.toggleNav('1'); }}
            >
              Logo
                        </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggleNav('2'); }}
            >
              Sản phẩm nổi bật
                        </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggleNav('3'); }}
            >
              Thức uống
                        </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggleNav('4'); }}
            >
              Đồ ăn
                        </NavLink>
          </NavItem>
          <NavItem>
            <Dropdown className="z-index-9999 " isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                  <DropdownToggle className="btn u-color-transparent nav-links" caret>
                    Sắp xếp
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Giá</DropdownItem>
                    <DropdownItem onClick={ this.onDropdownItemClick } dropdownvalue="low-to-high">Thấp -&gt; Cao</DropdownItem>
                    <DropdownItem onClick={ this.onDropdownItemClick } dropdownvalue="high-to-low">Cao -&gt; Thấp</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Ưu đãi</DropdownItem>
                    <DropdownItem onClick={ this.onDropdownItemClick } dropdownvalue="discount" disabled>Giảm giá</DropdownItem>
                    <DropdownItem onClick={ this.onDropdownItemClick } dropdownvalue="voucher" disabled>Voucher</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {TotalCurrentItems === 0 && 'Loading....'}
          <TabPane tabId="1">
            <Row >
              {
                TotalCurrentItems !== 0
                && CurrentItems.map((Item, index) =>
                    <Product Item={Item} key={Item._id} index={index} visible={classnames({ 'u-opacity-0': index > NumberOfCurrentProduct - 1 })}
                    onProductClicked={this.onProductClicked} />)
              }
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {
                TotalCurrentItems !== 0
                && CurrentItems.map((Item, index) =>
                  <Product Item={Item} key={Item._id} index={index} visible={classnames({ 'u-opacity-0': index > NumberOfCurrentProduct - 1 })}
                    onProductClicked={this.onProductClicked} />)
              }
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              {
                TotalCurrentItems !== 0
                && CurrentItems.map((Item, index) =>
                  <Product Item={Item} key={Item._id} index={index} visible={classnames({ 'u-opacity-0': index > NumberOfCurrentProduct - 1 })}
                    onProductClicked={this.onProductClicked} />)
              }
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              {
                TotalCurrentItems !== 0
                && CurrentItems.map((Item, index) =>
                  <Product Item={Item} key={Item._id} index={index} visible={classnames({ 'u-opacity-0': index > NumberOfCurrentProduct - 1 })}
                    onProductClicked={this.onProductClicked} />)
              }
            </Row>
          </TabPane>
          <TabPane tabId="5">
              <Row>

              </Row>
            </TabPane>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={TotalCurrentItems}
            totalItemsCount={TotalDisplayItems}
            pageRangeDisplayed={PageRange}
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
