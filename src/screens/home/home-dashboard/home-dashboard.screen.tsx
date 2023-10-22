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
                <div className='graph-box'>
                    <section className='suggestion-debts'>
                    </section>
                    <section className='graph-debts'>
                        
                    </section>
                    <section className='debts-per-months'>

                    </section>
                </div>

                <div className='goals-and-legends-box'>
                    <section className='legends-box'>

                    </section>
                    <section className='goals-box'>

                    </section>
                </div>
            </div>
            <Menu selectedItem="home" />
        </>

    );

}

export default App;