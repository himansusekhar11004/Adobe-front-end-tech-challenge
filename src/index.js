import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './containers/Root';
import './assets/global-stylesheet.css'
ReactDOM.render(<Root/>, document.getElementById('root'));
serviceWorker.unregister();
