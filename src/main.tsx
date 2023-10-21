import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthenticateScreen from './screens/user/authenticate/authenticate.screen.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticateScreen />
  </React.StrictMode>,
);