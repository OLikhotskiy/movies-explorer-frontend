import React from "react";
import { Routes, Link, Route } from 'react-router-dom';
import './Navigation.css'

function Navigation() {
    
    return (
        <section className="navigation">
            <Routes>
                <Route path="/signin" element={
                    <Link to="/signup" className="navigation__registration buttons">Регистрация</Link>} />
                <Route path="/signup" element={
                    <Link to="/signin" className="navigation__login buttons">Войти</Link>} />
                <Route path="/" element={
                    <nav className="navigation__container">
                        <ul className="navigation__links">
                            <li className={`navigation__link buttons ${window.location.pathname === "/movies" ? 'navigation__active' : ' '}`}>
                                <Link to="/movies">Фильмы</Link>
                            </li>
                            <li className={`navigation__link buttons ${window.location.pathname === "/saved-movies" ? 'navigation__active' : ' '}`}>
                                <Link to="/saved-movies" >Сохраненные фильмы</Link>
                            </li> 
                        </ul>
                        <Link to="/profile" className="navigation__profile buttons">Аккаунт</Link> 
                    </nav>
                } />
            </Routes>
        </section>
    )


}

export default Navigation;