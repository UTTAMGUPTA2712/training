import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor=persistStore(store)
// initialising persistor with store to persist data
root.render(
  <React.StrictMode>
    {/* setting up store */}
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
