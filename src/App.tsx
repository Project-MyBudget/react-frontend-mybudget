import { Routes, Route } from "react-router-dom";

import AuthenticateScreen from './screens/user/authenticate/authenticate.screen.tsx';
import RegisterFirstStepScreen from './screens/user/register/first-stage-register.screen.tsx';
import RegisterSecondStepScreen from './screens/user/register/second-stage-register.screen.tsx';
import HomeDashboardScreen from './screens/home/home-dashboard/home-dashboard.screen.tsx';
import InitialFinancialControl from './screens/financial-control/initial-financial-control.screen.tsx';
import UserFinancial from './screens/financial-control/finances/user-finances.screen.tsx';
import Economies from './screens/financial-control/economies/user-economies.tsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeDashboardScreen/>}/>
                <Route path="/authenticate" element={<AuthenticateScreen />} />
                <Route path="/register/step/initial" element={<RegisterFirstStepScreen />} />
                <Route path="/register/step/confirm" element={<RegisterSecondStepScreen />} />
                <Route path="/initial/financial-control" element={<InitialFinancialControl />} />
                <Route path="/user/financial-control" element={<UserFinancial />} />
                <Route path="/user/economy-control" element={<Economies/>} />
            </Routes>
        </>
    );
}

export default App;