import './menu.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCircleInfo, faChartLine, faListCheck, faUser } from "@fortawesome/free-solid-svg-icons";

function Menu(props: any) {

    const { selectedItem } = props;

    return (
        <div className='footer-menu'>

            <section className='menu-items'>
                <a href="/" className='menu-icon'>
                    <FontAwesomeIcon className={selectedItem === 'graphs' ? 'selected-item' : 'not-selected-item'} size="3x" icon={faChartLine} color='#000' />
                </a>

                <a href="/" className='menu-icon'>
                    <FontAwesomeIcon size={selectedItem === 'info' ? '2x' : '3x'} className={selectedItem === 'info' ? 'selected-item' : 'not-selected-item'} icon={faCircleInfo} color='#000' />
                </a>
                <a href="/" className='menu-icon'>
                    <FontAwesomeIcon size={selectedItem === 'home' ? '2x' : '3x'} className={selectedItem === 'home' ? 'selected-item' : 'not-selected-item'} icon={faHome} color='#000' />
                </a>
                <a href="/" className='menu-icon'>
                    <FontAwesomeIcon size={selectedItem === 'goals'? '2x' : '3x'} className={selectedItem === 'goals'? 'selected-item' : 'not-selected-item'} icon={faListCheck} color='#000' />
                </a>
                <a href="/" className='menu-icon'>
                    <FontAwesomeIcon size={selectedItem === 'user'? '2x' : '3x'} className={selectedItem === 'user'? 'selected-item' : 'not-selected-item'} icon={faUser} color='#000' />
                </a>
            </section>

        </div>
    );
}

export default Menu;