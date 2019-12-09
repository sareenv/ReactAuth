import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import Registration from './Registration';
import Security from './Security'
import UpdateDetails from './UpdateDetails';
import * as serviceWorker from './serviceWorker';

const Layout = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Registration />
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
