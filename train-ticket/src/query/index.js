import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import * as serviceWorker from '../serviceWorker';
import FastClick from 'fastclick'
import store from './store';
import './index.css';
import App from './App.jsx';

FastClick.attach(document.body)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

if ('production' === process.env.NODE_ENV) {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
