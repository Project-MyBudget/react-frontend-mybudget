import Header from "../../../components/header/header.component";
import SaveButton from "../../../components/save-button/savebutton.component";
import Menu from "../../../components/menu/menu.component";
import BudgetComponent from '../../../components/budget/budget.component';
import "./user-finances.style.css";

import React from 'react';

const BtnNewExpense = (props: any) => {
    return (
        <>
            <div className="btn-nw-expense" onClick={() => props.onClick}>
                <span>nova despesa</span>
            </div>
        </>
    );
}

const CardExpenses = (props: any) => {
    return (
        <section>
            <h1>{props.title}</h1>
            <form className="frm-expense-types">
                <div>
                    <input type="date" name="date" placeholder="Data" />

                    <select name="" id="expense-field">
                        <option value="1">Despesa</option>
                        <option value="1">Financeiro</option>
                    </select>
                    <input type="number" name="valor" min="0" placeholder="Valor" />
                </div>
                <BtnNewExpense />
            </form>

        </section>
    )
}

const App = () => {
    return (
        <>
            <Header />
            <div className="user-finances-container">
                <h1>Suas finanças</h1>
                <BudgetComponent />

                <main>
                    <CardExpenses title="Despesas essencias" />

                    <CardExpenses title="Despesas não essenciais" />

                    <CardExpenses title="Lazer" />
                </main>
                <div id="save">
                    <SaveButton />
                </div>

            </div>
            <Menu />
        </>

    );
}

export default App;