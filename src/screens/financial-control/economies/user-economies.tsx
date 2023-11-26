import React from "react";
import Header from "../../../components/header/header.component";
import Budget from "../../../components/budget/budget.component";
import SaveButton from "../../../components/save-button/savebutton.component";
import Menu from "../../../components/menu/menu.component";

import "./user-economies.css";

function App() {
    return (
        <>
            <Header/>
            <div className="status-container">
                <h1 className="main-title-economies">Suas Economias</h1>
                <Budget userId={1} isEconomies={true}/>
            </div>

            <div className="control-economy-group">
                <form className="control-economy-container">
                    
                    <h2 className="sub-title-economy"> Informe suas economias e salário: </h2>
                   
                    <div className="label-input-budget-container">
                        <label htmlFor="" className="input-label"> Orçamento atualizado: </label>
                        <div className="input-budget-container">
                            <span className="brl-money">R$</span> <input min="0" type="number" className="input-budget-field"/>
                        </div>
                    </div>
                    <div className="label-input-budget-container">
                        <label htmlFor="" className="input-label"> Pretendo economizar: </label>
                        <div className="input-budget-container">
                            <span className="brl-money">R$</span> <input min="0" type="number" className="input-budget-field"/>
                        </div>     
                    </div>
                    <SaveButton/>
                </form>
            </div>

            <Menu/>
        </>
    )
}                   

export default App;