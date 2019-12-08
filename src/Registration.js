import React from 'react';
import {Form, Input, Button, DatePicker, Icon, Alert} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import './Registration.css';
import ReCAPTCHA from "react-google-recaptcha";

const dateFormat = 'YYYY/MM/DD';

class RegistrationForm extends React.Component{
    
    constructor(){
        super()
        this.state = {
            isAlertHidden: true,
            isResponseSucess: false,
            alertMessage: '',
            isHiddenPassword: true,
            value: '', 
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            dateofBirth: '',
            captchaValue: ''
        }
        this.checkPasswordInputType = this.checkPasswordInputType.bind(this)
        this.changeHiddenState = this.changeHiddenState.bind(this)
        this.checkPasswordHiddenEye = this.checkPasswordHiddenEye.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCaptchaChange = this.handleCaptchaChange.bind(this)
    }

    handleCaptchaChange = (value) => {
        this.setState({captchaValue: value})
        console.log(`The captcha value is ${this.state.captchaValue}`)
    }

    handleInputChange = (event) =>{
        /**
         * Here need to update the state of the multiple inputs.
        */
       console.log(event.target)
       if(event.target === undefined){
           return
       }
       this.setState({
        [event.target.name]: event.target.value
       })
    }

    handleSubmit =  (event) => {
        event.preventDefault();
        /*
        Send the data to the backend api which also ensures that captcha is solve
        and the perform backend validation on data. 
        The method below sends the essential information to register new user in the database.
        */
       
        axios.post('http://localhost:5050/register', {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName, 
            email:this.state.email,
            captcharesp: this.state.captchaValue
        }).then((resp)=>{
            console.log(resp)
            this.setState({
                isAlertHidden: false,
                isResponseSucess: true,
                alertType: 'sucess',
                alertMessage: 'Sucessfully Created the user in the system',

                username: '',
                password: '',
                email: '',
                firstName: '',
                lastName: '',
                dateofBirth: '',
                captchaValue: ''

            })
       }).catch((error)=>{
            console.log(error.message)   
            this.setState({
                isAlertHidden: false,
                alertType: 'failure',
                alertMessage: 'Some error, registering the user',

                username: '',
                password: '',
                email: '',
                firstName: '',
                lastName: '',
                dateofBirth: '',
                captchaValue: ''
            })
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
                            <Input name="firstName" placeholder="Enter first name" value={this.state.firstName} onChange={this.handleInputChange}  />
                        </Form.Item>

                        <Form.Item label="Last Name">
                            <Input name ="lastName" placeholder="Enter last name" value={this.state.lastName} onChange={this.handleInputChange}/>
                        </Form.Item>


                        <Form.Item label="Email">
                            
                            {getFieldDecorator('email',{
                                initialValue: '',
                                rules:[
                                    {
                                        type: 'email',
                                        message: 'Not a valid email'
                                    } 
                                ]
                            })(<Input placeholder="Enter email" name="email" onChange={this.handleInputChange}/>)}      
                        </Form.Item>

                        <Form.Item label="Username">
                            <Input placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                        </Form.Item>

                        <Form.Item label="Password">
                            <Input placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleInputChange}  type={this.checkPasswordInputType()} suffix={<Button type="link" onClick={this.changeHiddenState} size="small"> <Icon type={this.checkPasswordHiddenEye()} theme="twoTone"/> </Button>} />
                        </Form.Item>
                        
                        <Form.Item label = "Date of birth">
                            <DatePicker name= "dateofBirth" format={dateFormat} placeholder="Birthday" onChange={this.handleInputChange}/>
                        </Form.Item>
                    
                        
                        <ReCAPTCHA sitekey = "6LdPjb4UAAAAAAhEXE3N_LhDu0j0Se-15wdvFovc" value ={this.state.captchaValue}
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