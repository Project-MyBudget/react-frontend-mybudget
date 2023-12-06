import Logo from '../../assets/logo.png';
import './header.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate('/authenticate');  
    };

    return (
        <header>
            <nav>
                <div className='header-left-box'></div>
                <img src={Logo} height={125} alt='' />
                <div className='header-right-box'>
                    <div className='submit-line'>
                        <input type="search" placeholder='Pesquisa...' className='search-input' />
                        <button className="submit-icon-search" type="submit">
                            <FontAwesomeIcon size="1x" icon={faSearch} color='black' />
                        </button>
                    </div>
                    <button className='exit-system-button' onClick={handleClick}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px' }} />
                        Sair
                    </button>
                </div>
            </nav>
        </header>
    );

}

export default Header;