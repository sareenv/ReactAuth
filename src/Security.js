import React from 'react';
import { List } from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.css';

// this thing doesn't need to be connected but it's 


class Security extends React.Component {

    constructor() {
        super()
        this.state = {
            isTwoFactorOn: false
        }
    }

    render() {

        const data1 = [{title: 'Logout from All devices', description: 'This option allows users to logout the account from all devices'}, 
            {title: 'Enable two factor Authentication', description: 'This option will send email verification password to registered email before each login'}, 
            {title: 'Change current password', description: 'This will allow users to change the current account password'}
        ]
        return(
            <div style={{backgroundColor: "white"}}>
                <h3 style={{ marginBottom: 16, marginLeft: 16, marginTop: 16, paddingTop: 10}}>Security Settings</h3>
                <List
                    itemLayout="horizontal"
                    size="large"
                    bordered
                    dataSource = {data1}
                    renderItem={item => (
                        <List.Item>
                            {item.title}
                            <List.Item.Meta
                                description={item.description} 
                            />
                        </List.Item>   
                    )}
                />
            </div>
        )
    }
}

export default Security
