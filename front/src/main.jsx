import React from 'react';

import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import store from "./redux/store.js";
import Layout from "./components/layout";

import "./style/global.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/index.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Provider>
  </React.StrictMode>,
)
