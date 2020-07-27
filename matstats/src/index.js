import React from 'react';
import ReactDOM from 'react-dom';
import MatStats from './components/MatStats'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import './components/Main.css'

ReactDOM.render(
  <React.StrictMode>
    <MatStats />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
