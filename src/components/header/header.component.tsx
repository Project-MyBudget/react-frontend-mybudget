import Logo from '../../assets/logo.png';
import './header.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Header() {

    return (
        <header>
            <nav>
                <div className='header-left-box'></div>
                <img src={Logo} height={125} alt='' />
                <div className='header-right-box'>
                    <div className='submit-line'>
                        <input type="search" placeholder='Pesquisa...' className='search-input' />
                        <button className="submit-icon-search" type="submit">
                            <FontAwesomeIcon size="1x" icon={faSearch} color='#CFCFCF' />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );

}

export default Header;