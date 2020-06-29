import React from 'react';
import ReactDOM from 'react-dom';

import './theme/layout.css';

import App from './containers/app';

const rootElement = document.getElementById('app');
ReactDOM.render(<App />, rootElement);
