import { useState, useEffect } from "react";
import Header from "../../../components/header/header.component";
import SaveButton from "../../../components/save-button/savebutton.component";
import Menu from "../../../components/menu/menu.component";
import BudgetComponent from '../../../components/budget/budget.component';
import ExpensesService from '../../../services/expenses.service';
import "./user-finances.style.css";
import ExpensesResponse from "../../../models/ExpensesResponse.model";
import ExpenseUserRequest from "../../../models/ExpenseUserRequest.model";
import ExpenseType from "../../../models/ExpenseType.model";

const App = () => {

    const [expenseType, setExpenseType] = useState<string>('E');
    const [expenses, setExpenses] = useState<ExpensesResponse>({ expenses: [] });
    const [request, setRequest] = useState<ExpenseType[]>([]);
    const [formValues, setFormValues] = useState({0: []});


    useEffect(() => {
        const expenseService = new ExpensesService();
        const response = expenseService.findAllExpensesType();
        response.then(res => {
            setExpenses(res);
        });
    }, []);

    const handleSubmit = async () => {
        const expenseService = new ExpensesService();
        
        for (let i = 0; i < expenses.expenses.length; i++) {
            if (expenseType === expenses.expenses[i].type) {
                const newRequest: ExpenseType = {
                    id: expenses.expenses[i].id,
                    type: expenses.expenses[i].type,
                    description: expenses.expenses[i].description
                };
                setRequest([...request, newRequest]);
                console.log(expenses.expenses[i].id, request);
            }
        }

        const realRequest: ExpenseUserRequest = {
            idUser: 1,
            expenses: request
        };
        console.log(realRequest);

        const response = await expenseService.createExpenses(realRequest);
        console.log(response);
    };

    const getTitle = () => {
        switch (expenseType) {
            case "L":
                return "Lazer";
            case "E":
                return "Despesas essenciais";
            case "N":
                return "Despesas não essenciais";
        }
    };

    const handleInputChange = (groupId: number, name: string, value: any, expenseId: number) => {
        setFormValues((prevData: any) => ({
            ...prevData,
            [groupId]: {
                ...prevData[groupId],
                [name]: value,
                "id": expenseId,
                "dateReference": new Date()
            }
        }));
        console.log(formValues);
    };

    const InputCard = (props: any) => {
        return (
            <>
                {
                    expenses.expenses.map((data, index) => {
                        return (
                            <>
                                {
                                    data.type === props.type ?
                                        <div className="frm-expense-types" key={index}>
                                            <input id="expense-field" type="text" style={{ color: "black" }} name="description" placeholder="Data" value={data.description} disabled />
                                            <input
                                                id="expense-field"
                                                type="number"
                                                name="value"
                                                min="0"
                                                placeholder="Valor"
                                                onChange={e => handleInputChange(index, "value", e.target.value, data.id) }
                                                value={formValues[index]?.value || 0}
                                            />
                                        </div> : <> </>
                                }
                            </>

                        );
                    })
                }
            </>
        );
    };

    const CardExpenses = (props: any) => {
        return (
            <section className="card-control-finance">
                <h1>{getTitle()}</h1>
                <form>
                    <InputCard type={props.expenseType ? props.expenseType : null} />
                    {/* <div className="btn-nw-expense" onClick={() => props.onClick}>
                        <span>nova despesa</span>
                    </div> */}
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

                <div className="expenses-types-options">
                    <div className="btn-nw-expense" onClick={() => setExpenseType("N")}>
                        <span>Despesas não essenciais</span>
                    </div>
                    <div className="btn-nw-expense" onClick={() => setExpenseType("E")}>
                        <span>Despesas essenciais</span>
                    </div>
                    <div className="btn-nw-expense" onClick={() => setExpenseType("L")}>
                        <span>Despesa com lazer</span>
                    </div>
                </div>

                <main className="card-finances-control-area">
                    <CardExpenses title="Lazer" expenseType={expenseType} />
                </main>
                <div id="save">
                    <SaveButton onClick={() => handleSubmit()} />
                </div>
            </div>
            <Menu />
        </>

    );
}

export default App;