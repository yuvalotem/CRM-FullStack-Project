import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Customers from './stores/Customer'
import { Provider } from 'mobx-react';

// const cutomers = new Customers()
// const stores = {cutomers}

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider {...stores}> */}
    <Router>
    <App />
    </Router>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
