/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  Container, Button, Form, FormGroup, Label, Input, FormText,
} from 'reactstrap';

import Axios from 'axios';
import PropTypes from 'prop-types';

export default class AddProduct extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      price: 0,
      type: '',
      description: '',
      featured: false,
      image: '',
    };

    this.submitAddProduct = this.submitAddProduct.bind(this);
    this.onKeySubmit = this.onKeySubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFeaturedChange = this.onFeaturedChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  submitAddProduct(e) {
    e.preventDefault();
    const Product = {
      name: this.state.name,
      price: this.state.price,
      type: this.state.type,
      description: this.state.description,
      featured: this.state.featured,
      image: this.state.image,
    };
    Axios.post('/api/products', Product)
      .then(({ message }) => console.log(`done ${message}`))
      .catch(err => console.log(`error: ${err}`));
  }

  onKeySubmit(e) {
    if (e.keyCode === 13) {
      this.submitAddProduct(e);
    }
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onPriceChange(e) {
    this.setState({ price: e.target.value });
  }

  onTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onFeaturedChange(e) {
    this.setState({ featured: e.target.value });
  }

  onImageChange(e) {
    this.setState({ image: e.target.value });
  }


  render() {
    return (
      <Container>
        <Form className="m-4" >
          <FormGroup>
            <Label for="name">Tên sản phẩm</Label>
            <Input type="text" name="name" id="name" placeholder=""
              onChange={(this.onNameChange)}
              onKeyUp={this.onKeySubmit} />
          </FormGroup>
          <FormGroup>
            <Label for="price">Giá sản phẩm</Label>
            <Input type="number" name="price" id="price" placeholder=""
              onChange={(this.onPriceChange)}
              onKeyUp={this.onKeySubmit} />
          </FormGroup>
          <FormGroup>
            <Label for="type">Loại sản phẩm</Label>
            <Input type="select" name="type" id="type"
              onChange={(this.onTypeChange)}
              onKeyUp={this.onKeySubmit}>
              <option></option>
              <option>Đồ ăn</option>
              <option>Thức uống</option>
              <option>Khác</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="description">Miêu tả sản phẩm</Label>
            <Input type="textarea" name="description" id="description"
              onChange={(this.onDescriptionChange)}
              onKeyUp={this.onKeySubmit} />
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Sản phẩm nổi bậc</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="featured" value="true"
                  onChange={(this.onFeaturedChange)}
                />{' '}
                Có
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="featured" value="false"
                  onChange={(this.onFeaturedChange)}
                />{' '}
                Không
            </Label>
            </FormGroup>
          </FormGroup>

          <FormGroup>
            <Label for="image">Ảnh sản phẩm</Label>
            <Input type="file" name="image" id="image"
              onChange={(this.onImageChange)}
              onKeyUp={this.onKeySubmit} />
            <FormText color="muted">
              Vui lòng thêm ảnh hd hoặc full hd để có thể hiển thị tốt nhất cho người dùng
            </FormText>
          </FormGroup>
          <Button onClick={this.submitAddProduct} >Submit</Button>
        </Form>
      </Container>
    );
  }
}

AddProduct.propTypes = {
  Product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['food', 'drinks']),
    featured: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
};
