import UserTotalValuesResponse from '../../models/UserTotalValuesResponse';
import BudgetService from '../../services/Budget.service';
import './budget.style.css';

import { useEffect, useState } from "react";

function Budget(props: any) {

    const [response, setResponse] = useState<any>({
        totalBudgetAmount: 0,
        totalValueSaved: 0
    }) ;

    useEffect (() => {
        const budgetService = new BudgetService();   
        const response = budgetService.getBudgetAndEconomies(4); 
        response.then(resp => setResponse(resp));
    }, [])

    return (
        <>
            <div className='sub-title-control-financial'>
                <div className='sub-title-icon-budget'></div>
                <div className='sub-title-items'>
                    <span className='sub-title-budget'>Seu orçamento</span>
                    <span className='budget-control-financial'>{response.totalBudgetAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
            </div>
            {
                response.totalValueSaved != 0 
                ?
                    <div className='sub-title-control-financial'>
                    <div className='sub-title-icon-economies'></div>
                        <div className='sub-title-items'>
                            <span className='sub-title-budget'>Suas economias</span>
                            <span className='budget-control-financial'>{response.totalValueSaved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                    </div>
                    : <></>
            }
            
        </>
    );
}

export default Budget;

