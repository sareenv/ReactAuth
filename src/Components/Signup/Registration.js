import React from 'react';
import {Form, Input, Button, DatePicker, Icon} from 'antd';
import { Select } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../../styles/forms.css';
import ReCAPTCHA from "react-google-recaptcha";
const Option = Select.Option;
const securityQuestions = ['Faviourate Dog', 'Name of high school', 'Birth Location', 'Faviourate Hobby']

class RegistrationForm extends React.Component{
    
    constructor(){
        super()
        this.state = {
            securityQuestion1: 'Faviourate Dog',
            securityAnswer1: '',
            securityQuestion2: 'Name of high school',
            securityAnswer2: '',
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
        this.handleSecurityQuestion1Change = this.handleSecurityQuestion1Change.bind(this)
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this)
        this.handleSecurityQuestion2Change = this.handleSecurityQuestion2Change.bind(this)
        this.resetStates = this.resetStates.bind(this)
    }


    handleBirthdayChange(date, dateString) {
        console.log(date)
    }

    handleCaptchaChange = (value) => {
        this.setState({captchaValue: value})
        console.log(`The captcha value is ${this.state.captchaValue}`)
    }

    handleInputChange = (event) =>{
        if(event.target === undefined){
            return
        }
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    resetStates() {
        this.setState({
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            dateofBirth: '',
            captchaValue: '',
            securityAnswer1: '', 
            securityAnswer2: ''
        })
    }

    handleSubmit =  (event) => {
        event.preventDefault();
        // this url can be changed once the api is published. 
        const url = 'https://kv304cem.herokuapp.com/register'
        const data = {
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                securityQuestion1: this.state.securityQuestion1, 
                securityAnswer1: this.state.securityAnswer1,
                securityQuestion2: this.state.securityQuestion2,
                securityAnswer2: this.state.securityAnswer2,
                email:this.state.email,
                captcharesp: this.state.captchaValue
        }

        axios.post(url, data).then((resp)=>{
            console.log(resp)
                this.setState({
                    isAlertHidden: false,
                    isResponseSucess: true,
                    alertType: 'sucess',
                    alertMessage: 'Sucessfully, created the user',
                })
                this.resetStates()
            }).catch((error)=>{
            console.log(error.response)   
            this.setState({
                isAlertHidden: false,
                alertType: 'failure',
                alertMessage: 'Some error, registering the user'
            })
            this.resetStates()
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

    handleSecurityQuestion1Change = (value) => {
        this.setState({
            securityQuestion1: value
        })
    }

    handleSecurityQuestion2Change = (value) => {
        this.setState({
            securityQuestion2: value
        })
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
                            <Input className="customInput" name="firstName" placeholder="Enter first name" value={this.state.firstName} onChange={this.handleInputChange}  />
                        </Form.Item>

                        <Form.Item label="Last Name">
                            <Input className="customInput" name ="lastName" placeholder="Enter last name" value={this.state.lastName} onChange={this.handleInputChange}/>
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
                            })(<Input className="customInput" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleInputChange}/>)}      
                        </Form.Item>

                        <Form.Item label="Username">
                            <Input className="customInput" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                        </Form.Item>

                        <Form.Item label="Password">
                            <Input className="customInput" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleInputChange}  type={this.checkPasswordInputType()} suffix={<Button type="link" onClick={this.changeHiddenState} size="small"> <Icon type={this.checkPasswordHiddenEye()} theme="twoTone"/> </Button>} />
                        </Form.Item>

                        <Form.Item label="Security Question 1">
                            <Select
                                defaultValue={securityQuestions[0]}
                                onChange={this.handleSecurityQuestion2Change}
                            > 
                            {securityQuestions.map(question => (
                                <Option key={question} > {question} </Option>
                            ))}
                            </Select> 
                        </Form.Item>

                        <Form.Item label="Security Answer1">
                            <Input className="customInput" placeholder="Enter Security Answer1" name="securityAnswer1" value={this.state.securityAnswer1} onChange={this.handleInputChange}/>
                        </Form.Item>

                        <Form.Item label="Security Question 2">
                            <Select
                                defaultValue={securityQuestions[1]}
                            > 
                            {securityQuestions.map(question => (
                                <Option key={question}>{question}</Option>
                            ))}
                            </Select> 
                        </Form.Item>

                        <Form.Item label="Security Answer2">
                            <Input className="customInput" placeholder="Enter Security Answer1" name="securityAnswer2" value={this.state.securityAnswer2} onChange={this.handleInputChange} />
                        </Form.Item>
                        
                        <Form.Item label = "Date of birth">
                            <DatePicker name= "dateofBirth"  selectedValue={this.state.dateofBirth} placeholder="Birthday" onChange={this.handleBirthdayChange}/>
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