import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthenticateScreen from './screens/user/authenticate/authenticate.screen.tsx';
import RegisterScreen from './screens/user/register/first-stage-register.screen.tsx';
import RegisterScreen2 from './screens/user/register/second-stage-register.screen.tsx';
import HomeDashboard from './screens/home/home-dashboard/home-dashboard.screen.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RegisterScreen/>
    <RegisterScreen2/>
  </React.StrictMode>,
);