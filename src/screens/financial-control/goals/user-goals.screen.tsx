import './user-goals.style.css';
import Budget from "../../../components/budget/budget.component";
import SaveButton from "../../../components/save-button/savebutton.component";
import Menu from "../../../components/menu/menu.component";
import Header from "../../../components/header/header.component";
import { useEffect, useState } from 'react';
import GoalsResponseModel from '../../../models/GoalsResponse.model';
import GoalsService from '../../../services/goals.service';
import ToastifyConfig from '../../../util/toastify-config.util';
import VLibras from '@moreiraste/react-vlibras'
import Toastify from 'toastify-js';
import GoalsModel from '../../../models/Goals.model';


function App() {
    const userInfo: any = localStorage.getItem('info');
    const userId: number = JSON.parse(userInfo)?.id;
    const GoalsInput = () => {
        const goalService = new GoalsService();
        const [goalMap, setGoalMap] = useState<GoalsResponseModel>({ goals: [] });


        useEffect(() => {
            const response = goalService.findGoalsByUser(userId);

            response.then((data) => {
                setGoalMap(data);
            });
        }, []);


        const handleRemoveGoal = async (goalId: number) => {
            const response = await goalService.deleteGoal(goalId);
            if (response.status === 200) {
                Toastify(ToastifyConfig.getPopUp("Meta deletada com sucesso!", "success")).showToast();
                window.location.reload();
                return;
            }

            response.json().then(res => {
                Toastify(ToastifyConfig.getPopUp(res.message, "error")).showToast();
            });
        };

        const handleStatusChange = async (request: GoalsModel, e: React.ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            const { value } = e.target;
            request.progress = value;
            const response = await goalService.saveGoals(request);
            if (response.status === 200) {
                Toastify(ToastifyConfig.getPopUp("Status alterado com sucesso", "success")).showToast();
                const reloadPage = setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return () => clearTimeout(reloadPage);
            }
        };

        return (
            <>
                <VLibras forceOnload={true} />
                {
                    goalMap?.goals?.map((data, index) => {
                        return (
                            <section className='goals-inputs'>

                                <input
                                    id="expense-field"
                                    type="date"
                                    style={{ color: 'black' }}
                                    name="estimatedDate"
                                    value={new Date(data.estimatedDate).toISOString().split('T')[0]}
                                />
                                <input
                                    id="expense-field"
                                    type="text"
                                    style={{ color: 'black' }}
                                    name="description"
                                    placeholder="Descrição"
                                    value={data.description || ''}
                                />
                                <select name="progress" id="goals-select-field" value={data.progress} onChange={(e) => handleStatusChange(data, e)}>
                                    <option value="FEITO">Feito</option>
                                    <option value="ANDAMENTO">Em andamento</option>
                                </select>

                                <button className='btn-goal-remove' onClick={() => handleRemoveGoal(data.goalId)}>Excluir Meta</button>
                            </section>
                        );
                    })
                }
            </>
        );
    };

    return (
        <>
            <Header />
            <div className='goals-container'>
                <h1 className="user-goals-title">Suas metas</h1>
                <main className="card-goals-control-area">
                    <span className='user-goals-sub-title'>Crie suas metas</span>
                    <section className='card-control-goals'>
                        <GoalsInput />
                        <button className='btn-new-goal'>Adicionar meta</button>
                    </section>
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