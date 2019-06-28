import React, { Component } from "react";
import LoginBox from '../../components/Auth/LoginBox';
import RegisterBox from '../../components/Auth/Register';


class Auth extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false,
        }
    }

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false})
    }

    showRegisterBox() {
        this.setState({isLoginOpen: false, isRegisterOpen: true})
    }

    render() {
        return (
            <div>
                <div>
                    <div onClick={this.showLoginBox.bind(this)}>
                        Login
                    </div>
                    <div onClick={this.showRegisterBox.bind(this)}>
                        Register
                    </div>
                </div>
                <div>
                    {this.state.isLoginOpen && <LoginBox />}
                    {this.state.isRegisterOpen && <RegisterBox />}
                </div>
            </div>
        )
    }
}

export default Auth