import Header from "../../components/header/header.component";
import SaveButton from "../../components/save-button/savebutton.component";
import Menu from "../../components/menu/menu.component";
import "./user-finances.style.css";

import React from 'react';

const BtnNewExpense = (props: any) => {
    return (
        <>
            <div className="btn-nw-expense" onClick={() => props.onClick}>
                <span>nova despesa</span>
            </div>
        </>
    )
}

const CardExpenses = (props: any) => {
    return (
        <section>
            <h1>{props.title}</h1>
            <form className="inputs">
                <div>
                    <input type="date" name="date" placeholder="Data"/>
                    
                    <select name="" id="expense-field">
                        <option value="1">Despesa</option>
                        <option value="1">Financeiro</option>
                    </select>
                    <input type="number" name="valor" min="0" placeholder="Valor"/>
                </div>
                <BtnNewExpense/>
            </form>
            
        </section>
    )
}

const App = () => {
    return (
        <div id="user-finances-screen">
            <Header/>
            
            <h1>Suas finanças</h1>
            <div className="your-budget">
                <div className="money-icon"></div>
                <div>
                    <p>Seu orçamento</p>
                    <p>R$ 203.20</p>
                </div>
            </div>  

            <main>
                <CardExpenses title="Despesas essencias"/>

                <CardExpenses title="Despesas não essenciais"/>

                <CardExpenses title="Lazer"/>
            </main>
            <div id="save">
                <SaveButton/>
            </div>
            <Menu/>
        </div>
    );
}

export default App;