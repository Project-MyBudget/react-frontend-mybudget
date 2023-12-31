import UserTotalValuesResponse from '../../models/UserTotalValuesResponse';
import BudgetService from '../../services/Budget.service';
import './budget.style.css';
import { useEffect, useState } from "react";

function Budget(props: any) {
    const { userId, isEconomies } = props;

    const [response, setResponse] = useState<UserTotalValuesResponse>({
        totalBudgetAmount: 0,
        totalValueSaved: 0
    });

    useEffect(() => {
        const budgetService = new BudgetService();
        const response = budgetService.getBudgetAndEconomies(userId);
        response.then(resp => setResponse(resp));
    }, []);

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
                isEconomies ?
                    <div className='sub-title-control-financial'>
                        <div className='sub-title-icon-economies'></div>
                        <div className='sub-title-items'>
                            <span className='sub-title-budget'>Suas economias</span>

                            {
                                response.totalValueSaved < 0 ?
                                    <span className='budget-control-financial' style={{color: 'red'}}>
                                        {response.totalValueSaved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                    : <span className='budget-control-financial' style={{color: 'green'}}>
                                        {response.totalValueSaved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>

                            }
                        </div>
                    </div>
                    : <></>
            }

        </>
    );
}

export default Budget;

