import React from 'react';
import Axios from 'axios'

import Product from './Product'

import {
    Container,
    ListGroup,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
    Button
} from "reactstrap";

import classnames from 'classnames';

const PRODUCTTYPE = new Map();
PRODUCTTYPE.set(1, "food");
PRODUCTTYPE.set(2, "drinks");



export default class ListItems extends React.Component {
    constructor() {
        super();

        this.toggle = this.toggle.bind(this);

        this.state = {
            Items: [],
            activeTab: '1',
        }

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        Axios.get('/api/products/text').then(result => {
            let Items = result.data;
            this.setState(prevState => {
                return {
                    Items
                }
            })
        }).catch(err => {
            console.log(err);

        })
    }

    render() {
        let { Items } = this.state;
        return (
            <Container>
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
                            {this.state.Items.length === 0 && "Loading...."}
                            {
                                this.state.Items.length !== 0 && Items.map((Item, index) =>
                                    <Product Item={Item} key={index} index={index} />
                                )
                            }
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            {this.state.Items.length === 0 && "Loading...."}
                            {
                                this.state.Items.length !== 0 && Items.map((Item, index) =>
                                    Item.product_featured && <Product Item={Item} key={index} index={index} />
                                )
                            }
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            {this.state.Items.length === 0 && "Loading...."}
                            {
                                this.state.Items.length !== 0 && Items.map((Item, index) =>
                                    Item.product_type === PRODUCTTYPE.get(2) && <Product Item={Item} key={index} index={index} />
                                )
                            }
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            {this.state.Items.length === 0 && "Loading...."}
                            {
                                this.state.Items.length !== 0 && Items.map((Item, index) =>
                                Item.product_type === PRODUCTTYPE.get(1) && <Product Item={Item} key={index} index={index} />
                                )
                            }
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        )
    }
}
