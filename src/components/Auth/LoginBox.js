import React , { Component } from 'react';

class LoginBox extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    submitLogin(event) {

    }

    render() {
        return (
            <div>
                <div>Login</div>
                <div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Username" />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    
                    <button onClick={this.submitLogin.bind(this)}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginBox;