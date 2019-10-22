import React from 'react';
import {Form, Input, Button, DatePicker, Icon} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import './Registration.css';
import ReCAPTCHA from "react-google-recaptcha";

const dateFormat = 'YYYY/MM/DD';

class RegistrationForm extends React.Component{
    
    constructor(){
        super()
        this.state = {
            isHiddenPassword: true,
            value: '', 
            captchaValue: ''
        }
        this.checkPasswordInputType = this.checkPasswordInputType.bind(this)
        this.changeHiddenState = this.changeHiddenState.bind(this)
        this.checkPasswordHiddenEye = this.checkPasswordHiddenEye.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCaptchaChange = this.handleCaptchaChange.bind(this)
    }


    handleCaptchaChange = (value) => {
        this.setState({captchaValue: value})
        console.log(`The captcha value is ${this.state.captchaValue}`)
    }

    handleChange = (event) =>{
        this.setState({value: event.target.value})
    }

    handleSubmit =  (event) => {
        event.preventDefault();
        console.log('Trying to submit the form')
        if(this.state.captchaValue === ''){
            return alert('first solve the captcha')
        }

        /** 
         * Make http request to the server which sends the captcha response from google to my api which then verifies.
        */

       axios.post('http://localhost:8080/captcha', {captcharesp: this.state.captchaValue}).then((resp)=>{
           alert(resp)
       }).catch((error)=>{
            alert(error)
       })

    }

    checkPasswordInputType = () => {
        if(this.state.isHiddenPassword === true){
            return "password"
        }
        return "text"
    }

    checkPasswordHiddenEye = () => {
        if(this.state.isHiddenPassword === true){
            return "eye"
        }
        return "eye-invisible"
    }

    changeHiddenState = () => {
        this.setState({isHiddenPassword: !this.state.isHiddenPassword}) 
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            
            <div className="Container">
                <div className="Registration">
                    <h2> Register your account with us </h2>
                    <h4> Join us to save your personal information</h4>
                    <hr/>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="First Name">
                        
                            <Input placeholder="Enter first name" onChange={this.handleChange} />
                        </Form.Item>

                        <Form.Item label="Last Name">
                            <Input placeholder="Enter last name" />
                        </Form.Item>


                        <Form.Item label="Email">
                            {getFieldDecorator('email',{
                                rules:[
                                    {
                                        type: 'email',
                                        message: 'Not a valid email'
                                    }
                                ]
                            })(<Input placeholder="Enter email" />)}      
                        </Form.Item>

                        <Form.Item label="Username">
                            <Input placeholder="Enter username" />
                        </Form.Item>

                        <Form.Item label="Password">
                            <Input placeholder="Enter password" type={this.checkPasswordInputType()} suffix={<Button type="link" onClick={this.changeHiddenState} size="small"> <Icon type={this.checkPasswordHiddenEye()} theme="twoTone"/> </Button>} />
                            
                        </Form.Item>

                        <Form.Item label = "Date of birth">
                            <DatePicker format={dateFormat} placeholder="Birthday"/>
                        </Form.Item>
                        
                        <ReCAPTCHA sitekey = "6LdPjb4UAAAAAAhEXE3N_LhDu0j0Se-15wdvFovc"
                        onChange = {this.handleCaptchaChange}
                        />    

                        <br/>

                        <center> <input type="submit" value="Submit" className="submitButton"/> </center>

                    </Form>
                </div>
            </div>
        )
    }
}

const Registration = Form.create({name: 'register'})(RegistrationForm)

export default Registration