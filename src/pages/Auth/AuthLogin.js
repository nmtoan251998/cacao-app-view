import React, { Component } from 'react';
import {
  Container, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Box.css';
import AuthContext from '../../contexts/AuthContext';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountname: '',
      password: '',
    };
  }

  goToRegister() {
    this.props.history.push('/auth/register');
  }

  onAccountChange(e) {
    this.setState({ accountname: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
            <Container className="mt-3">
                <AuthContext.Consumer>
                    {({ isLogedIn }) => (
                            <div>{isLogedIn ? <Redirect to="/"/> : ''}</div>
                    )}
                </AuthContext.Consumer>
                <Col sm="10" md="6" lg="4" className="m-auto shadow-lg">
                    <div className="pr-4 pl-4 pb-3">
                        <div className="Box-title p-3 text-muted">Login</div>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="accountname">Accountname</Label>
                                <AuthContext.Consumer>
                                    {({ onKeySubmit }) => <Input
                                    type="text"
                                    name="accountname"
                                    placeholder="Accountname"
                                    onChange={this.onAccountChange.bind(this)}
                                    onKeyUp={event => onKeySubmit(event, {
                                      accountname: this.state.accountname,
                                      password: this.state.password,
                                    })}
                                    />}
                                </AuthContext.Consumer>
                                <AuthContext.Consumer>
                                    {({ accountnameErr }) => (
                                            <small className="text-danger">{accountnameErr || ''}</small>
                                    )}
                                </AuthContext.Consumer>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <AuthContext.Consumer>
                                    {({ onKeySubmit }) => <Input type="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        onChange={this.onPasswordChange.bind(this)}
                                        onKeyUp={event => onKeySubmit(event, {
                                          accountname: this.state.accountname,
                                          password: this.state.password,
                                        })}/>}
                                </AuthContext.Consumer>
                                <AuthContext.Consumer>
                                    {({ passwordErr }) => (
                                            <small className="text-danger">{passwordErr || ''}</small>
                                    )}
                                </AuthContext.Consumer>
                            </FormGroup>
                            <AuthContext.Consumer>
                                {({ submitLogin }) => <Button
                                className="w-100 pink-button"
                                onClick={() => submitLogin({
                                  accountname: this.state.accountname,
                                  password: this.state.password,
                                })}>Login</Button>}
                            </AuthContext.Consumer>
                        </Form>
                    </div>
                </Col>
            </Container>
    );
  }
}

export default LoginBox;

LoginBox.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
