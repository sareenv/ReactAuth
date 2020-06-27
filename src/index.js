import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles/index.css';
import Registration from './Components/Signup/Registration';
import Security from './Components/Signup/Security'
import UpdateDetails from './Components/Signup/UpdateDetails';
import FrontPage from './Components/Main/FrontPage';
import * as serviceWorker from './Components/Signup/serviceWorker';

const Layout = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<FrontPage/>
					</Route>

					<Route exact path="/register">
						<Registration/>
					</Route>

					<Route  path="/security">
						<Security />
					</Route>

					<Route  path="/updateDetails">
						<UpdateDetails />
					</Route>
					
				</Switch>
			</Router>
		</div>
	)
}

ReactDOM.render(<Layout />, document.getElementById('root'));
serviceWorker.unregister();
