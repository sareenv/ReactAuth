import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Registration from './Registration';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Security from './Security'
import * as serviceWorker from './serviceWorker';

const Layout = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Registration />
					</Route>

					<Route  path="/contact">
						<Security />
					</Route>

				</Switch>
			</Router>
		</div>
	)
}

ReactDOM.render(<Layout />, document.getElementById('root'));
serviceWorker.unregister();
