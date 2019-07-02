import React, { Component } from "react"
import Axios from "axios";

export const AuthContext = React.createContext();

export class AuthProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            isLogedIn: false,
            accountnameErr: undefined,
            passwordErr: undefined
        }

        this.submitLogin = this.submitLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.showValidationErr = this.showValidationErr.bind(this)
    };

    logout() {
        this.setState({
            user: undefined,
            isLogedIn: false
        })
    }

    showValidationErr(accountnameErr, passwordErr) {
        this.setState({
            accountnameErr: accountnameErr,
            passwordErr: passwordErr
        });
    }

    submitLogin(item) {
        if(!item.accountname) {
            this.showValidationErr("this field much be required!", undefined)
        } else if(!item.password) {
            this.showValidationErr(undefined, "this field much be required!")
        } else { 
        Axios.post("http://localhost:5000/auth/login", item)
        .then(res => {
            Axios.get("http://localhost:5000/api/users", {
                headers: {
                    authorization: res.data.token
                }
            })
            .then(res => this.setState({
                user: res.data,
                isLogedIn: true}))
                .catch(err => console.log(err))
            }
        ).catch(err => this.showValidationErr(err.response.data.error.wrongAccount, undefined));
        }
    }

    render() {
        return (<AuthContext.Provider value={{
            user: this.state.user,
            isLogedIn: this.state.isLogedIn,
            submitLogin: this.submitLogin,
            logout: this.logout,
            accountnameErr: this.state.accountnameErr,
            passwordErr: this.state.passwordErr
        }}>
            {this.props.children}
        </AuthContext.Provider>)
    }
}