import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = (
  //If redux and/or router is used wrap the app
  <App />
);

ReactDOM.render(app, document.getElementById('root'));
reportWebVitals();
