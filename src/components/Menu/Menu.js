import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import menu from '../../images/menu.svg';
import close from '../../images/close.svg';


function Menu() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    useEffect(() => {
        function handleEscClose(e) {
          if (e.code === 'Escape') {
            setIsMenuOpen(false)
            }
        }
    
        if (isMenuOpen) {
          document.addEventListener('keydown', handleEscClose)
        }
        return () => document.removeEventListener('keydown', handleEscClose)
    })
    

    return (
        <section className="menu">
            {isMenuOpen ? <div className="menu__overlay" onClick={close}></div> : "" }
            {isMenuOpen ? <img className="menu__image buttons" src={close} alt="Закрыть" onClick={closeMenu}/> 
                            : 
                            <img className="menu__image buttons" src={menu} alt="Меню" onClick={ openMenu }/>
            }
            <nav className={isMenuOpen ? ["menu__list", "menu__list_active"].join(' ') : ["menu__list"]}>
                <ul className="menu__container">
                    <li className={`navigation__link buttons ${window.location.pathname === "/" ? 'navigation__active_menu' : ' '}`}>
                        <Link to="/">Главная</Link>
                    </li>
                    <li className={`navigation__link buttons ${window.location.pathname === "/movies" ? 'navigation__active_menu' : ' '}`}>
                        <Link to="/movies">Фильмы</Link>
                    </li>
                    <li className={`navigation__link buttons ${window.location.pathname === "/saved-movies" ? 'navigation__active_menu' : ' '}`}>
                        <Link to="/saved-movies">Сохраненные фильмы</Link>
                    </li>
                </ul>
                <Link to="/profile" className="navigation__profile buttons">Аккаунт</Link>
            </nav>
        </section>
    )

}

export default Menu;