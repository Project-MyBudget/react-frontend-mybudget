import { useState } from 'react';
import RegisterRequest from '../../../models/RegisterRequest.model'
import logo from '../../../assets/logo.png';
import userIcon from '../../../assets/user-icon.png';
import './register.style.css';
import 'toastify-js/src/toastify.css';
import { useNavigate, useLocation } from "react-router-dom";
import ToastifyConfig from '../../../util/toastify-config.util';
import Toastify from 'toastify-js';

function App() {
    const location = useLocation();
    const initialData = location.state ? location.state.formValues : {};
    const [hasChild, setHasChild] = useState<number>(0);
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [formValues, setFormValues] = useState<RegisterRequest>(initialData);
    const navigate = useNavigate();


    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (formValues.password === repeatPassword) {
            navigate('/register/step/confirm', { state: { formValues: formValues } });
        } else {
            Toastify(ToastifyConfig.getPopUp("As senhas não estão estão condizentes!", "error")).showToast();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        formValues[name] = value;

        if (name == 'hasChild') {
            setHasChild(formValues.hasChild);
        }
    };

    const ChildNumber = (props: any) => {
        if (props.hasChild == 1) {
            return (
                <input type="number" name="childrenNumber" placeholder='Quantidade de filhos' onChange={handleInputChange} value={formValues.childrenNumber} required maxLength={10} />
            );
        }

        return (<></>);
    };


    return (
        <>
            <div className="container-register">
                <section className="logo">
                    <img
                        src={logo}
                        alt="Logomarca da empresa My Budget, com as letras coma cor azul claro e um porco acima das letras." />
                </section>
                <div className="container-first-card-register">
                    <section className="card-section-register">
                        <section className="card-svg">
                            <img
                                src={userIcon}
                            />
                            <form className='register-form' onSubmit={handleSubmit}>
                                <input type="text" name="firstName" placeholder='Nome' onChange={handleInputChange} value={formValues.firstName || ''} required maxLength={100} />
                                <input type="text" name="lastName" placeholder='Sobrenome' onChange={handleInputChange} value={formValues.lastName || ''} required maxLength={100} />
                                <input className='date-of-register' type="date" name="dateOfBirth" placeholder='Data de Nascimento' onChange={handleInputChange} value={formValues.dateOfBirth || ''} required />
                                <input type="tel" name="phoneNumber" placeholder='Telefone' onChange={handleInputChange} value={formValues.phoneNumber || ''} required maxLength={11} />
                                <input type="email" name="email" placeholder='E-mail' onChange={handleInputChange} value={formValues.email || ''} required maxLength={160} />
                                <input type="password" name="password" placeholder='Senha' onChange={handleInputChange} value={formValues.password || ''} required minLength={8} maxLength={16} />
                                <input type="password" name="repeatPassword" placeholder='Confirme sua senha' onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword || ''} required minLength={8} maxLength={16} />
                                <section className='group-check-box-first-stage'>
                                    <label>
                                        Status civil
                                        <select name="civilStatus" placeholder='Estado civil' onChange={handleSelectChange} value={formValues.civilStatus} required>
                                            <option value={"SINGLE"}>Solteiro</option>
                                            <option value={"MARRIED"}>Casado</option>
                                            <option value={"DIVORCED"}>Divorciado</option>
                                            <option value={"WIDOWER"}>Viúvo</option>
                                        </select>
                                    </label>

                                    <label>
                                        Tem filhos?
                                        <select name="hasChild" placeholder='Possui Filhos?' onChange={handleSelectChange} value={formValues.hasChild} required>
                                            <option value={0}>Não</option>
                                            <option value={1}>Sim</option>
                                        </select>
                                    </label>

                                    <label>
                                        Gênero
                                        <select name="gender" placeholder='Gênero' onChange={handleSelectChange} value={formValues.gender} required>
                                            <option value={"Femminino"}>Feminino</option>
                                            <option value={"Transgênero"}>Transgênero</option>
                                            <option value={"Masculino"}>Masculino</option>
                                        </select>
                                    </label>
                                </section>

                                <ChildNumber hasChild={hasChild} />
                                <button type='submit' className='btn-next'>Proximo</button>
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