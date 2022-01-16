import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './app/App';
import 'antd/dist/antd.css';
import store from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');
  const Main = () => (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  ReactDOM.render(<Main />, $root);
});
