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
serviceWorker.unregister();
