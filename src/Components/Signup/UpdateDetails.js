import React from 'react';
import {Form, Input} from 'antd';
import fetch from 'isomorphic-fetch'
import 'antd/dist/antd.css';
import '../../styles/forms.css'

const {TextArea} = Input 

class UpdateDetails extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '', 
            firstName: '',
            lastName: '',
            about: '', 
            token: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resetStates = this.resetStates.bind(this)
    }

    resetStates() {
        this.setState({
            email: '', 
            firstName: '',
            lastName: '',
            about: '', 
            token: ''
        })
    }

    handleInputChange(event) {
        if(event.target === undefined){
            return
        }
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit(event) {
        event.preventDefault();
        const url = 'https://kv304cem.herokuapp.com/updateDetails'
        const queryString = `?email=${this.state.email}&firstName=${this.state.firstName}&lastName=${this.state.lastName}&about=${this.state.about}`
        const token = this.state.token
        const finalUrl = url + queryString
        
        fetch(finalUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            console.log('resolved')
            this.resetStates()
        }).catch(error => {
            console.log(`Error ${error.message}`)
            this.resetStates()
        })
    }

    render() {
        return(
            <div className="Container">
                <div className="Upadte">
                    <h3> Update User details </h3>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="First Name">
                                <Input name="firstName" placeholder="Enter first name" value={this.state.firstName} onChange={this.handleInputChange}  />
                        </Form.Item>

                        <Form.Item label="Last Name">
                                <Input name="lastName" placeholder="Enter first name" value={this.state.lastName} onChange={this.handleInputChange}  />
                        </Form.Item>

                        <Form.Item label="Email">
                                <Input name="email" placeholder="Enter first name" value={this.state.email} onChange={this.handleInputChange}  />
                        </Form.Item>

                        <Form.Item label="About">
                                <TextArea rows={4}  name="about" placeholder="Enter first name" value={this.state.about} onChange={this.handleInputChange}  />
                        </Form.Item>

                        <Form.Item label="JWT">
                                <TextArea rows={4}  name="token" placeholder="Enter first name" value={this.state.token} onChange={this.handleInputChange}  />
                        </Form.Item>

                        <center> <input type="submit" value="Update Details" className="submitButton"/> </center>

                    </Form>
                </div>
            </div>
        )
    }

}



export default UpdateDetails