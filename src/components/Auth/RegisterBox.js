import React , { Component } from 'react';
import { Button, Form, FormGroup, Label, Input  } from 'reactstrap';
import "./Box.css"

class RegisterBox extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    submitRegister(event) {
        
    }

    render() {
        return (
            <div className="pr-4 pl-4 pb-3">
                <div className="Box-title p-3 text-muted">
                    Register
                </div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" placeholder="Username" />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="accountname">Accountname</Label>
                        <Input type="text" name="accountname" placeholder="Accountname" />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password2">Rewrite password</Label>
                        <Input type="password2" name="password2" placeholder="Password" />
                    </FormGroup>
                    
                    <Button color="danger" onClick={this.submitRegister.bind(this)}>Register</Button>
                </Form>
            </div>
        )
    }
}

export default RegisterBox;