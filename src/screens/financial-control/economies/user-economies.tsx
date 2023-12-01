import "./user-economies.css";
import React, { useEffect, useState } from "react";
import Header from "../../../components/header/header.component";
import Budget from "../../../components/budget/budget.component";
import SaveButton from "../../../components/save-button/savebutton.component";
import Menu from "../../../components/menu/menu.component";
import EconomiesModel from "../../../models/Economies.model";
import UserService from "../../../services/User.service";
import ToastifyConfig from '../../../util/toastify-config.util';
import VLibras from '@moreiraste/react-vlibras'
import Toastify from 'toastify-js';

function App() {

    const [formValues, setFormValues] = useState<EconomiesModel>({
        idUser: 0,
        idBudget: 0,
        budget: 0,
        spendingLimitEconomy: 0,
        valueSaved: 0,
        salary: 0
    });

    useEffect(() => {
        getBudget(1);
    }, []);

    const getBudget = async (userId: number) => {
        const userService = new UserService();
        const response = await userService.getBudgetByUser(userId);
        setFormValues(response);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        const userService = new UserService();
        const request = formValues;
        request.idUser = 1;

        const response = await userService.updateBudgetAndEconomies(request);
        const jsonResponse = await response.json();

        if (response.status === 200) {
            Toastify(ToastifyConfig.getPopUp(jsonResponse.message, "success")).showToast();
            const reloadPage = setTimeout(() => {
                window.location.reload();
            }, 1000); // Recarrega a página após 5 segundos (5000 milissegundos)

            return () => clearTimeout(reloadPage);
        }

        Toastify(ToastifyConfig.getPopUp(jsonResponse.message, "error")).showToast();


    };

    return (
        <>
            <VLibras forceOnload={true} />
            <Header />
            <div className="status-container">
                <h1 className="main-title-economies">Suas Economias</h1>
                <Budget userId={1} isEconomies={true} />
            </div>

            <div className="control-economy-group">
                <form className="control-economy-container" >
                    <h2 className="sub-title-economy"> Informe suas economias e salário: </h2>

                    <div className="label-input-budget-container">
                        <label htmlFor="" className="input-label"> Orçamento atualizado: </label>
                        <div className="input-budget-container">
                            <span className="brl-money">R$</span>
                            <input min="0" type="number" className="input-budget-field" name="budget" value={formValues.budget || ''} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="label-input-budget-container">
                        <label htmlFor="" className="input-label"> Pretendo economizar: </label>
                        <div className="input-budget-container">
                            <span className="brl-money">R$</span>
                            <input min="0" type="number" className="input-budget-field" name="spendingLimitEconomy" value={formValues.spendingLimitEconomy || ''} onChange={handleInputChange} />
                        </div>
                    </div>
                    <SaveButton onClick={() => handleSubmit()} />
                </form>
            </div>

            <Menu />
        </>
    )
}

export default App;