import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = (
  //If redux and/or router is used wrap the app
  <App />
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
reportWebVitals();
