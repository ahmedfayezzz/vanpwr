/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import Feature from './feature-module/feature';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './core/data/redux/store';
import 'aos/dist/aos.css';
import { base_path } from './environment';
import './index.css';

const rootElement = document.getElementById('root');
const location = window.location.pathname.split('/');

location[1] == 'admin'
  ? require('./style/admin/css/admin.css')
  : require('./style/css/style.css');

// AOS.init({ once: true });

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={base_path}>
          <Feature />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found.");
}
