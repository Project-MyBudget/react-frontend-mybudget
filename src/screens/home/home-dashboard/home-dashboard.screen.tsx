import { useState } from 'react';
import HoursUtils from '../../../util/hours.util';
import Header from '../../../components/header/header.component';
import Menu from '../../../components/menu/menu.component';
import './home-dashboard.style.css';

function App() {

    const [userInformation, setUserInformation] = useState({});

    return (
        <>
            <Header />
            <div className='home-container'>
                <h2>{HoursUtils.getGreetingMessage("Danilo")}</h2>
            </div>
            <Menu />
        </>

    );

}

export default App;