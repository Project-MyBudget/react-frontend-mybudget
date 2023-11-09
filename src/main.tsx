import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthenticateScreen from './screens/user/authenticate/authenticate.screen.tsx';
import HomeDashboard from './screens/home/home-dashboard/home-dashboard.screen.tsx';
import InitialFinancialControl from './screens/financial-control/initial-financial-control.screen.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InitialFinancialControl />
  </React.StrictMode>,
);