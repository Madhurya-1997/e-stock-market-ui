import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import Prefetch from './prefetch/Prefetch';
import { reducers } from './reducers';


const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Prefetch>
      <App />
    </Prefetch>
  </Provider>,
  document.getElementById('root')
);
