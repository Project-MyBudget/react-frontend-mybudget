import { useState } from 'react';
import UserService from '../../../services/User.service';
import logo from '../../../assets/logo.png';
import userIcon from '../../../assets/user-icon.png';
import './authenticate.style.css';
import 'toastify-js/src/toastify.css';
import ToastifyConfig from '../../../util/toastify-config.util';
import Toastify from 'toastify-js';
import VLibras from '@moreiraste/react-vlibras'

function App() {

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const service = new UserService();
    const formData = new FormData(e.target);

    const response = await service.authenticateUser(formData);

    if (response.status === 200) {
      Toastify(ToastifyConfig.getPopUp("Usuário autenticado com sucesso!", "success")).showToast();
      return;
    }

    response.json().then(res => {
      Toastify(ToastifyConfig.getPopUp(res.message, "denied")).showToast();
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <VLibras forceOnload={true} />
      <div className="container-authenticate">
        <section className="logo">
          <img
            src={logo}
            alt="Logomarca da empresa My Budget, com as letras coma cor azul claro e um porco acima das letras." />
        </section>
        <div className="container-card">
          <section className="card-section">
            <section className="card-svg">
              <img
                src={userIcon}
              />
              <form className='login-form' onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder='E-mail' onChange={handleInputChange} value={formValues.email || ''} required maxLength={250} />
                <input type="password" name="password" placeholder='Senha' onChange={handleInputChange} value={formValues.password || ''} required maxLength={16} />
                <div className='button-area'>
                  <button type='submit' className='btn-login'>Acessar</button>
                  <a href="/register/step/initial" className='btn-register'>Registrar-se</a>
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
