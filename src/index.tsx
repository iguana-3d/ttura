import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './styles/sass/main.scss';
import { store } from './redux/store/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="container">
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
