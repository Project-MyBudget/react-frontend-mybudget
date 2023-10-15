import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import logo from './assets/logo.png';
import userIcon from './assets/user-icon.png';
import './App.css';

function App() {
  return (
    <>
      <div className="container">
        <section className="logo">
          <img
            src={logo}
            alt="Logomarca da empresa My Budget, com as letras coma cor azul claro e um porco acima das letras." />
        </section>
        <div className="container-cart-product">
          <section className="card-section">
            <section className="card-svg">
              <img
                src={userIcon}
              />
              <form className='login-form'>
                <input type="text" placeholder='E-mail' />
                <input type="password" placeholder='Senha' />
                <div className='button-area'>
                  <button className='btn-login'>Acessar</button>
                  <a href="/" className='btn-register'>Registrar-se</a>
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
