import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import HomePage from './pages/homepage';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBbBIqhM7AiUKBqbCJTbI1hXhzg7s9JcAs",
//   authDomain: "login-project-7effd.firebaseapp.com",
//   projectId: "login-project-7effd",
//   storageBucket: "login-project-7effd.appspot.com",
//   messagingSenderId: "1029877870058",
//   appId: "1:1029877870058:web:08baacb3281c5e21ced693",
//   measurementId: "G-KTZ1172MFN"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor=new persistStore(store)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    {/* <App /> */}
    <HomePage/>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
