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
                    <li className={`menu__link buttons ${window.location.pathname === "/" ? 'menu__link_active' : ' '}`}>
                        <Link to="/">Главная</Link>
                    </li>
                    <li className={`menu__link buttons ${window.location.pathname === "/movies" ? 'menu__link_active' : ' '}`}>
                        <Link to="/movies">Фильмы</Link>
                    </li>
                    <li className={`menu__link buttons ${window.location.pathname === "/saved-movies" ? 'menu__link_active' : ' '}`}>
                        <Link to="/saved-movies">Сохраненные фильмы</Link>
                    </li>
                </ul>
                <Link to="/profile" className="menu__profile buttons">Аккаунт</Link>
            </nav>
        </section>
    )

}

export default Menu;