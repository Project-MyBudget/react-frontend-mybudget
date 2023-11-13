import './budget.style.css';

function Budget(props: any) {
    return (
        <>
            <div className='sub-title-control-financial'>
                <div className='sub-title-icon-budget'></div>
                <div className='sub-title-items'>
                    <span className='sub-title-budget'>Seu orçamento</span>
                    <span className='budget-control-financial'>R$ 10000,00</span>
                </div>
            </div>
        </>
    );
}

export default Budget;

