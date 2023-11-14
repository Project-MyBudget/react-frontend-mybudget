import Header from "../../../components/header/header.component";
import SaveButton from "../../../components/save-button/savebutton.component";
import Menu from "../../../components/menu/menu.component";
import BudgetComponent from '../../../components/budget/budget.component';
import "./user-finances.style.css";


const App = () => {

    const InputCard = (props: any) => {
        return (
            <div className="frm-expense-types">
                <input id="expense-field" type="date" name="date" placeholder="Data" />
                <select id="expense-field">
                    <option value="1">Despesa</option>
                    <option value="1">Financeiro</option>
                </select>
                <input id="expense-field" type="number" name="valor" min="0" placeholder="Valor" />
            </div>
        );
    };

    const CardExpenses = (props: any) => {
        return (
            <section className="card-control-finance">
                <h1>{props.title}</h1>
                <form>
                    <InputCard />
                    <div className="btn-nw-expense" onClick={() => props.onClick}>
                        <span>nova despesa</span>
                    </div>
                </form>
            </section>
        );
    };

    return (
        <>
            <Header />
            <div className="user-finances-container">
                <h1 className="user-finance-title">Suas finanças</h1>
                <BudgetComponent />

                <main className="card-finances-control-area">
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