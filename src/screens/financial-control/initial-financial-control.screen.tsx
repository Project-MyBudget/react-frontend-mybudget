import { useState } from 'react';
import Header from '../../components/header/header.component';
import Menu from '../../components/menu/menu.component';
import './initial-financial-control.style.css';
import financialIcon from '../../assets/financial-icon.png';
import economyIcon from '../../assets/economy-icon.png';
import goalsIcon from '../../assets/goals-icon.png';
import { useNavigate } from 'react-router-dom';
import BudgetComponent from '../../components/budget/budget.component';

function App() {

    const navigate = useNavigate();

    const handleNavigatePage = (url: string) => {
        navigate(url);
    }

    return (
        <>
            <Header />
            <section className='container-financial-control'>
                <section className='header-control-financial'>
                    <div className='title-financial-control'>
                        <span>Controle financeiro</span>
                    </div>
                    <BudgetComponent />
                </section>
                <div className='option-title-control'>
                    <span>Selecione uma opção</span>
                </div>
                <main className='options-control-financial'>
                    <div className='option-control' onClick={() => handleNavigatePage("/user/goals-control")}>
                        <img src={goalsIcon} alt=""  width="160px" />
                        <span>Suas metas</span>
                    </div>
                    <div className='option-control' onClick={() => handleNavigatePage("/user/financial-control")}>
                        <img src={financialIcon} alt="" width="160px" />
                        <span>Suas finanças</span>
                    </div>
                    <div className='option-control' onClick={() => handleNavigatePage("/user/economy-control")}>
                        <img src={economyIcon} alt="" width="160px"/>
                        <span>Suas economias</span>
                    </div>
                </main>
            </section>
            <Menu />
        </>
    );
}

export default App;