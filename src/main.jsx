import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/reduxStore.js'
import React from 'react';


const root = document.getElementById("root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>

      <RouterProvider router = {App} />
    </Provider>

  </React.StrictMode>
);