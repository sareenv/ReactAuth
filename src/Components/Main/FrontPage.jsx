
import React from 'react';
import '../../styles/basic.css';
import Login from './Login'

class FrontPage extends React.Component {
    render() {
        return(
            <div>
                <div className="dummybackground">
                    <div className="dummyText">
                        STROXIA
                    </div>
                </div>
                <Login />
            </div>
        )
    }
}

export default FrontPage
