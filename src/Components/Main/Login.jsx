import React from 'react';
import {Form, Input, Button} from 'antd';
import '../../styles/basic.css';
import 'antd/dist/antd.css';

class Login extends React.Component {
    render() {
        return(
            <div className="loginForm">
                <Form>
                    <label> Enter your email </label> <br />
                    <Input className="customInput" type="text" placeholder="Email"/> <br />
                    <label> Enter your password </label> <br />
                    <Input className="customInput" type="password" placeholder="Password"/><br />
                </Form>
                <Button className="customButton"> Login </Button>
                <a className="customLink" href="/register"> Register Account with Us</a>
            </div>
        )
    }
}

export default Login