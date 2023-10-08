import React from 'react';
import ReactDOM from 'react-dom/client';

import UserProvider from "./Context/UserContext";
import App from './components/App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
);
