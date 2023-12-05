import logo from '../../assets/logo.png';
import './about.style.css';
import 'toastify-js/src/toastify.css';
import VLibras from '@moreiraste/react-vlibras';
import financialIcon from '../../assets/financial-icon.png';
import economyIcon from '../../assets/economy-icon.png';
import goalsIcon from '../../assets/goals-icon.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <>
            <VLibras forceOnload={true} />
            <div className="container-home">
                <div className='container-navbar'>
                    <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top shadow-sm" style={{ height: '100px' }}>
                        <div className="container">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Posts</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Sobre</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contato</a>
                                </li>
                            </ul>
                        </div>
                        <img className='logo'
                            src={logo}
                            alt="Logomarca da empresa My Budget, com as letras coma cor azul claro e um porco acima das letras." />
                    </nav>
                </div>
                <div className="banner" style={{ width: '100%', backgroundColor: '#f0f0f0', padding: '300px 0', textAlign: 'center' }}>
                    <h1>Seu banner aqui</h1>
                    <p>Texto do seu banner</p>
                </div>
                <main className='container-inf'>
                    <div className='option-control'>
                        <img src={goalsIcon} alt="" width="160px" />
                        <span>Suas metas</span>
                    </div>
                    <div className='option-control' >
                        <img src={financialIcon} alt="" width="160px" />
                        <span>Suas finanças</span>
                    </div>
                    <div className='option-control'>
                        <img src={economyIcon} alt="" width="160px" />
                        <span>Suas economias</span>
                    </div>
                </main>
            </div>
            <footer className='footer'>Copyright © - Todos direitos reservados 2023</footer>
        </>
    );
}

export default App;
