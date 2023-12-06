import { useState, useEffect, useRef } from "react";
import Header from "../../../components/header/header.component";
import SaveButton from "../../../components/save-button/savebutton.component";
import Menu from "../../../components/menu/menu.component";
import BudgetComponent from '../../../components/budget/budget.component';
import ExpensesService from '../../../services/expenses.service';
import HoursUtils from '../../../util/hours.util';
import "./user-finances.style.css";
import ExpensesResponse from "../../../models/ExpensesResponse.model";
import ExpenseUserRequest from "../../../models/ExpenseUserRequest.model";
import ExpenseType from "../../../models/ExpenseType.model";
import 'toastify-js/src/toastify.css';
import ToastifyConfig from '../../../util/toastify-config.util';
import Toastify from 'toastify-js';
import { useNavigate } from 'react-router-dom';


const App = () => {
    const userInfo: any = localStorage.getItem('info');
    const userId: number = JSON.parse(userInfo)?.id;
    const [expenseType, setExpenseType] = useState<string>('E');
    const [expenses, setExpenses] = useState<ExpensesResponse>({ expenses: [] });
    const [request, setRequest] = useState([{}]);
    const [formValues, setFormValues] = useState({ 0: [] });
    const [focusedInput, setFocusedInput] = useState<number | null>(null);


    useEffect(() => {
        const expenseService = new ExpensesService();
        const response = expenseService.findAllExpensesType();
        response.then(res => {
            setExpenses(res);
        });
    }, []);

    const handleSubmit = async () => {
        const expenseService = new ExpensesService();
        const updatedRequest: Array<ExpenseType> = [];
        console.log(formValues);
        expenses.expenses.forEach((item, index) => {
            if (formValues[index]?.value > 0) {
                const newRequest: ExpenseType = {
                    id: item.id,
                    type: item.type,
                    description: item.description,
                    dateReference: formValues[index].dateReference,
                    value: formValues[index].value
                };

                updatedRequest.push(newRequest);
            }
        });
        setRequest(updatedRequest);
        console.log(updatedRequest, request);
        const realRequest: ExpenseUserRequest = {
            idUser: userId,
            expenses: updatedRequest
        };
        const response = await expenseService.createExpenses(realRequest);

        if (response.status !== 200) {
            response.json().then(res => Toastify(ToastifyConfig.getPopUp(res.message, "error")).showToast());
            return;
        }


        Toastify(ToastifyConfig.getPopUp(`Despesas atualizadas com sucesso para o mês: ${new Date().getMonth() + 1}`, "success")).showToast();
        // navigate("/initial/financial-control");
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

    const InputCard = (props: any) => {
        const inputsRefs = Array.from({ length: expenses.expenses.length }, () => useRef<HTMLInputElement>(null));

        useEffect(() => {
            if (focusedInput !== null && inputsRefs[focusedInput] && inputsRefs[focusedInput].current) {
                inputsRefs[focusedInput].current.focus();
            }
        }, [focusedInput]);

        const handleInputChange = (groupId: number, name: string, value: any, expenseId: number) => {
            const updatedFormValues = {
                ...formValues,
                [groupId]: {
                    ...formValues[groupId],
                    [name]: value,
                    id: expenseId,
                    dateReference: HoursUtils.getCurrentDateTimeForMySQL(),
                }
            };
            setFormValues(updatedFormValues);
            setFocusedInput(groupId); // Mantém o foco no input atualizado
            console.log(formValues);
        };

        return (
            <>
                {/* <VLibras forceOnload={true} /> */}
                {expenses.expenses.map((data, index) => {
                    if (data.type === props.type) {
                        return (
                            <div className="frm-expense-types" key={index}>
                                <input
                                    id="expense-field"
                                    type="text"
                                    style={{ color: 'black' }}
                                    name="description"
                                    placeholder="Data"
                                    value={data.description}
                                    disabled
                                />
                                <input
                                    ref={inputsRefs[index]}
                                    id="expense-field"
                                    type="number"
                                    name="value"
                                    min="0"
                                    placeholder="Valor"
                                    onChange={(e) => handleInputChange(index, 'value', e.target.value, data.id)}
                                    value={formValues[index]?.value || ''}
                                />
                            </div>
                        );
                    }
                    return null;
                })}
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
                <BudgetComponent userId={userId} />

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
};

export default App;