import { useState } from 'react';
import RegisterRequest from '../../../models/RegisterRequest.model'
import logo from '../../../assets/logo.png';
import userIcon from '../../../assets/user-icon.png';
import './register.style.css';
import 'toastify-js/src/toastify.css';
import ToastifyConfig from '../../../util/toastify-config.util';
import Toastify from 'toastify-js';

function App() {

    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const [formValues, setFormValues] = useState<RegisterRequest>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        password: '',
        childrenNumber: 0,
        status: 'A',
        gender: '',
        civilStatus: ''
    });


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (formValues.password === repeatPassword) {


        } else {
            Toastify(ToastifyConfig.getPopUp("A senha devem ser iguais", "success")).showToast();
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <>
            <div className="container">
                <section className="logo">
                    <img
                        src={logo}
                        alt="Logomarca da empresa My Budget, com as letras coma cor azul claro e um porco acima das letras." />
                </section>
                <div className="container-card-register">
                    <section className="card-section-register">
                        <section className="card-svg">
                            <img
                                src={userIcon}
                            />
                            <form className='register-form' onSubmit={handleSubmit}>
                                <input type="text" name="firstName" placeholder='Nome' onChange={handleInputChange} value={formValues.firstName || ''} required maxLength={250} />
                                <input type="text" name="lastName" placeholder='Sobrenome' onChange={handleInputChange} value={formValues.lastName || ''} required maxLength={250} />
                                <input className='date-of-register' type="date" name="dateOfBirth" placeholder='Data de Nascimento' onChange={handleInputChange} value={formValues.dateOfBirth || ''} required maxLength={9} />
                                <input type="tel" name="phoneNumber" placeholder='Telefone' onChange={handleInputChange} value={formValues.phoneNumber || ''} required maxLength={11} />
                                <input type="email" name="email" placeholder='E-mail' onChange={handleInputChange} value={formValues.email || ''} required maxLength={250} />
                                <input type="password" name="password" placeholder='Senha' onChange={handleInputChange} value={formValues.password || ''} required maxLength={16} />
                                <input type="password" name="repeatPassword" placeholder='Confirme sua senha' onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword || ''} required maxLength={16} />
                                <section className='group-check-box-first-stage'>
                                    <label>
                                        Status civil
                                        <select name="civilStatus" placeholder='Estado civil' onChange={handleInputChange} value={formValues.civilStatus || ''} required>
                                            <option value="SINGLE">Solteiro</option>
                                            <option value="MARRIED">Casado</option>
                                            <option value="DIVORCED">Divorciado</option>
                                            <option value="WIDOWER">Viúvo</option>
                                        </select>
                                    </label>

                                    <label>
                                        Tem filhos?
                                        <select name="childrenNumber" placeholder='Possui Filhos?' onChange={handleInputChange} value={formValues.civilStatus || 0} required>
                                            <option value={0}>Não</option>
                                            <option value={1}>Sim</option>
                                        </select>
                                    </label>

                                    <label>
                                        Gênero
                                        <select name="civilStatus" placeholder='Gênero' onChange={handleInputChange} value={formValues.civilStatus || undefined} required>
                                            <option value={"SINGLE"}>Solteiro</option>
                                            <option value={"MARRIED"}>Casado</option>
                                            <option value={"DIVORCED"}>Divorciado</option>
                                            <option value={"WIDOWER"}>Viúvo</option>
                                        </select>
                                    </label>
                                </section>
                                <a href="/" className='btn-next'>Proximo</a>
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
