import { useState, useEffect } from 'react';
import RegisterRequest from '../../../models/RegisterRequest.model'
import logo from '../../../assets/logo.png';
import userIcon from '../../../assets/user-icon.png';
import './register.style.css';
import 'toastify-js/src/toastify.css';
import { useNavigate, useLocation } from "react-router-dom";
import UserService from '../../../services/user.service';
import ToastifyConfig from '../../../util/toastify-config.util';
import Toastify from 'toastify-js';
import Employment from '../../../models/Employment.model';

function App() {
    const location = useLocation();
    const dataFormValues = location.state ? location.state.formValues : {};
    const [formValues, setFormValues] = useState<RegisterRequest>(dataFormValues);
    const [employment, setEmployment] = useState<Employment>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            navigate('/register/step/initial');
        }
    }, [location.state, navigate]);

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        const service = new UserService();
        const response = await service.createUser(formValues);

        if (response.status === 200) {
            Toastify(ToastifyConfig.getPopUp("Usuário criado com sucesso!", "success")).showToast();
            navigate('/authenticate');
            return;
        }

        response.json().then(res => {
            Toastify(ToastifyConfig.getPopUp(res.message, "error")).showToast();
        });

    };

    const handleReset = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        navigate('/register/step/initial', { state: { formValues: formValues } });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployment({ ...employment, [name]: value });
        setFormValues({ ...formValues, employment: employment });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        formValues[name] = value;
    };

    return (
        <>
            <div className="container-register">
                <section className="logo">
                    <img
                        src={logo}
                        alt="Logomarca da empresa My Budget, com as letras coma cor azul claro e um porco acima das letras." />
                </section>
                <div className="container-card-second-register">
                    <section className="card-second-section-register">
                        <section className="card-svg">
                            <img
                                src={userIcon}
                            />
                            <form className='register-form' onSubmit={handleSubmit} onReset={handleReset}>
                                <input type="decimal" name="jobName" placeholder='Informe sua profissão' onChange={handleInputChange} value={employment.jobName || ''} required maxLength={100} />
                                <input type="text" name="salary" placeholder='Informe seu salário' onChange={handleInputChange} value={employment.salary || ''} required />
                                <label className='date-of-register'>
                                    Data de início do seu trabalho atual:
                                    <input type="date" name="workStartDate" placeholder='Data de Nascimento' onChange={handleInputChange} value={employment.workStartDate || ''} required />
                                </label>
                                <div className='btn-register-area'>
                                    <button type='reset' className='btn-next'>Anterior</button>
                                    <button type='submit' className='btn-next'>Registrar-se</button>
                                </div>
                            </form>
                        </section>
                    </section>
                    <footer className='footer'>Copyright © - Todos direitos reservados 2023</footer>
                </div>
            </div>
        </>
    );
}

export default App;
