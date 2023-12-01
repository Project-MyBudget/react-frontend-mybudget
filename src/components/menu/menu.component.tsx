import './menu.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCircleInfo, faChartLine, faListCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


function Menu(props: any) {

    const { selectedItem } = props;

    return (
        <div className='footer-menu'>

            <section className='menu-items'>
                <a href="#" className='menu-icon'
                    data-tooltip-id="icons-desc-tooltip"
                    data-tooltip-content="Veja seus gráficos de orçamentos e recomendações."
                    data-tooltip-place="top">
                    <FontAwesomeIcon className={selectedItem === 'graphs' ? 'selected-item' : 'not-selected-item'} size="3x" icon={faChartLine} color='#000' />
                </a>

                <a href="#" className='menu-icon'
                    data-tooltip-id="icons-desc-tooltip"
                    data-tooltip-content="Veja mais informações sobre nosso site."
                    data-tooltip-place="top">
                    <FontAwesomeIcon size={selectedItem === 'info' ? '2x' : '3x'} className={selectedItem === 'info' ? 'selected-item' : 'not-selected-item'} icon={faCircleInfo} color='#000' />
                </a>
                <a href="/" className='menu-icon'
                    data-tooltip-id="icons-desc-tooltip"
                    data-tooltip-content="Veja a sua tela principal com seus principais gráficos e metas."
                    data-tooltip-place="top">
                    <FontAwesomeIcon size={selectedItem === 'home' ? '2x' : '3x'} className={selectedItem === 'home' ? 'selected-item' : 'not-selected-item'} icon={faHome} color='#000' />
                </a>
                <a href="/initial/financial-control" className='menu-icon'
                    data-tooltip-id="icons-desc-tooltip"
                    data-tooltip-content="Veja e revise suas metas, economias e gastos."
                    data-tooltip-place="top">
                    <FontAwesomeIcon size={selectedItem === 'goals' ? '2x' : '3x'} className={selectedItem === 'goals' ? 'selected-item' : 'not-selected-item'} icon={faListCheck} color='#000' />
                </a>
                <a href="#" className='menu-icon'
                    data-tooltip-id="icons-desc-tooltip"
                    data-tooltip-content="Veja seus dados pessoais e altere se necessário."
                    data-tooltip-place="top">
                    <FontAwesomeIcon size={selectedItem === 'user' ? '2x' : '3x'} className={selectedItem === 'user' ? 'selected-item' : 'not-selected-item'} icon={faUser} color='#000' />
                </a>

                <Tooltip id="icons-desc-tooltip" />
            </section>

        </div>
    );
}

export default Menu;