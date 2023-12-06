import React, { useEffect, useState } from "react";
import Header from "../../../components/header/header.component";
import Menu from "../../../components/menu/menu.component";
import './alter-user.style.css';
import { useNavigate } from "react-router-dom";
import RegisterRequest from "../../../models/RegisterRequest.model";
import EmploymentModel from "../../../models/Employment.model";
import ToastifyConfig from "../../../util/toastify-config.util";
import Toastify from 'toastify-js';
import UserService from "../../../services/User.service";
import DateUtils from "../../../util/date.util";
import MarriedUtils from "../../../util/married.utils";

function App() {
    const [hasChild, setHasChild] = useState<number>(0);
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [formValues, setFormValues] = useState<RegisterRequest>({});
    const [employment, setEmployment] = useState<EmploymentModel>({});
    const [originalPassword, setOriginalPassword] = useState<string>('');
    const userInfo: any = localStorage.getItem('info');
    const userId: number = JSON.parse(userInfo)?.id;
    const userService = new UserService();


    useEffect(() => {
        const userResponse = userService.getUserById(userId);
        userResponse.then(data => {
            if (data.childrenNumber > 0) {
                setHasChild(1);
                data.hasChild = 1;
            }
            data.civilStatus = MarriedUtils.getMarriedStatus(data.civilStatus);
            setOriginalPassword(data.password);
            setFormValues(data);
        });

        const employmentResponse = userService.getEmploymentByUser(userId);
        employmentResponse.then(data => {
            setEmployment(data);
            console.log(data);
        });
    }, []);

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!formValues.civilStatus) {
            const newRequest = formValues;
            newRequest.civilStatus = "SINGLE";
            setFormValues(newRequest);
        }

        if (!formValues.gender) {
            const newRequest = formValues;
            newRequest.gender = "Femminino";
            setFormValues(newRequest);
        }

        if (formValues.hasChild === 1 && formValues.childrenNumber <= 0) {
            Toastify(ToastifyConfig.getPopUp("Caso você tenha filho por favor inclua número correto, sendo obrigatório ser maior que 0.", "error")).showToast();
            return;
        }

        if (DateUtils.isDateGreaterThanToday(formValues.dateOfBirth)) {
            Toastify(ToastifyConfig.getPopUp("A data de aniversário não pode ser maior que a data atual.", "error")).showToast();
            return;
        }


        if (originalPassword !== formValues.password) {
            if (formValues.password !== repeatPassword) {
                Toastify(ToastifyConfig.getPopUp("As senhas não estão condizentes!", "error")).showToast();
                return;
            }
            const newRequest = formValues;
            newRequest.isUpdatePassword = true;
            setFormValues(newRequest);
        }

        const newRequest = formValues;
        newRequest.employment = employment;
        setFormValues(newRequest);
        console.log(formValues);
        const response = await userService.updateUser(formValues);

        if (response.status === 200) {
            Toastify(ToastifyConfig.getPopUp("Usuário atualizado com sucesso!", "success")).showToast();
            return;
        }

        response.json().then(res => {
            Toastify(ToastifyConfig.getPopUp(res.message, "error")).showToast();
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleEmploymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployment({ ...employment, [name]: value });
        setFormValues({ ...formValues, employment: employment });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
        formValues[name] = value;

        if (name == 'hasChild') {
            console.log(formValues.hasChild);
            setHasChild(formValues.hasChild);
            const newForm = formValues;
            newForm.childrenNumber = 0;
            setFormValues(newForm);
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
            <Header />
            <main className="main-container-alter-user">
                <h2>Alteração de usuário</h2>
                <section className="card-section-alter">
                    <form className='register-form' onSubmit={handleSubmit}>
                        <span className="personal-data-title">Dados Pessoais</span>
                        <input type="text" disabled name="firstName" placeholder='Nome' value={formValues.firstName || ''} required maxLength={100} />
                        <input type="text" disabled name="lastName" placeholder='Sobrenome' value={formValues.lastName || ''} required maxLength={100} />
                        <input type="tel" name="phoneNumber" placeholder='Telefone' onChange={handleInputChange} value={formValues.phoneNumber || ''} required maxLength={11} />
                        <input disabled type="email" name="email" placeholder='E-mail' onChange={handleInputChange} value={formValues.email || ''} required maxLength={160} />
                        <input type="password" name="password" placeholder='Senha' onChange={handleInputChange} value={formValues.password || ''} required minLength={8} maxLength={16} />
                        <input type="password" name="repeatPassword" placeholder='Confirme sua senha' onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword || ''} minLength={8} maxLength={16} />
                        <section className='group-check-box-first-stage'>
                            <label>
                                Status civil
                                <select name="civilStatus" placeholder='Estado civil' onChange={handleSelectChange} value={formValues.civilStatus} required>
                                    <option value={"SINGLE"} selected={formValues.civilStatus === "SINGLE"}>Solteiro</option>
                                    <option value={"MARRIED"} selected={formValues.civilStatus === "MARRIED"}>Casado</option>
                                    <option value={"DIVORCED"} selected={formValues.civilStatus === "DIVORCED"}>Divorciado</option>
                                    <option value={"WIDOWER"} selected={formValues.civilStatus === "WIDOWER"}>Viúvo</option>
                                </select>
                            </label>

                            <label>
                                Tem filhos?
                                <select name="hasChild" placeholder='Possui Filhos?' onChange={handleSelectChange} value={formValues.hasChild} required>
                                    <option value={0} selected={formValues.hasChild === 0}>Não</option>
                                    <option value={1} selected={formValues.hasChild === 1}>Sim</option>
                                </select>
                            </label>

                            <label>
                                Gênero
                                <select name="gender" placeholder='Gênero' onChange={handleSelectChange} value={formValues.gender} required>
                                    <option value={"Femminino"} selected={formValues.gender === "Femminino"}>Feminino</option>
                                    <option value={"Transgênero"} selected={formValues.gender === "Transgênero"}>Transgênero</option>
                                    <option value={"Masculino"} selected={formValues.gender === "Masculino"}>Masculino</option>
                                </select>
                            </label>
                        </section>
                        <ChildNumber hasChild={hasChild} />
                        <span className="personal-data-title">Renda</span>
                        <input type="decimal" name="jobName" placeholder='Informe sua profissão' onChange={handleEmploymentInputChange} value={employment.jobName || ''} required maxLength={100} />
                        <input type="text" name="salary" placeholder='Informe seu salário' onChange={handleEmploymentInputChange} value={employment.salary || ''} required />
                        <label className='date-of-register'>
                            Data de início do seu trabalho atual:
                            <input type="date" name="workStartDate" placeholder='Data de Nascimento' onChange={handleEmploymentInputChange} value={employment.workStartDate} required />
                        </label>
                        <div className='btn-update-area'>
                            <button type='submit' className='btn-update'>Atualizar</button>
                        </div>
                    </form>

                </section>
            </main>
            <Menu />
        </>
    );
}

export default App;