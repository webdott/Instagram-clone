import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import FirebaseContext from './contexts/firebaseContext';
import { firebase, FieldValue } from '../src/lib/firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebase, FieldValue}}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

