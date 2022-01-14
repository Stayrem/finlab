import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import App from './app/App';
import 'antd/dist/antd.css';
import AppContext from './context/Context';
import pathDict from './app/pathDict';
import store from './store/store';

const initialState = { activeMenuItem: pathDict.statistics };

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');
  const Main = () => {
    const [appState, changeAppState] = useState(initialState);
    const setActiveMenuItem = (key) => changeAppState((prev) => ({ ...prev, activeMenuItem: key }));
    return (
      <React.StrictMode>
        <AppContext.Provider value={{ ...appState, setActiveMenuItem }}>
          <Provider store={store}>
            <App />
          </Provider>
        </AppContext.Provider>
      </React.StrictMode>
    );
  };

  ReactDOM.render(<Main />, $root);
});
