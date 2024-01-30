import React from 'react';

import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';

import store from "./redux/store.js";

import "./style/global.css";
import Router from './Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
)
