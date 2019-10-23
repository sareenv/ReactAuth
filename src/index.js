import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Registration from '../src/Registration';
import * as serviceWorker from './serviceWorker';

const RegistrationLayout = () => {
	return (
		<div>
			<Registration />
		</div>
	)
}


ReactDOM.render(<RegistrationLayout />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
