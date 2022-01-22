import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './app/App';
import 'antd/dist/antd.css';
import store from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');
  $root.style.minHeight = '100vh';
  $root.style.display = 'flex';
  $root.style.flexDirection = 'column';
  const Main = () => (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  ReactDOM.render(<Main />, $root);
});
