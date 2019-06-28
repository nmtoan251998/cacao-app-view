import React , { Component } from 'react';

class RegisterBox extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    submitRegister(event) {
        
    }

    render() {
        return (
            <div>
                <div>
                    Register
                </div>
                <div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Username" />
                    </div>

                    <div>
                        <label htmlFor="accountname">Accountname</label>
                        <input type="text" name="accountname" placeholder="Accountname" />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>

                    <div>
                        <label htmlFor="password2">Rewrite password</label>
                        <input type="password2" name="password2" placeholder="Password" />
                    </div>
                    
                    <button onClick={this.submitRegister.bind(this)}>Join</button>
                </div>
            </div>
        )
    }
}

export default RegisterBox;