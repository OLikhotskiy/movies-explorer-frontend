import React from "react";
import { Routes, Link, NavLink, Route } from 'react-router-dom';
import './Navigation.css'

function Navigation() {
    let activeStyle = {
        textDecoration: "underline",
    };

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
                                <NavLink to="/movies" 
                                    style={({ isActive }) =>isActive ? activeStyle : undefined}>
                                    Фильмы
                                </NavLink>
                            </li>
                            <li className={`navigation__link buttons ${window.location.pathname === "/saved-movies" ? 'navigation__active' : ' '}`}>
                                <NavLink to="/saved-movies" 
                                    style={({ isActive }) =>isActive ? activeStyle : undefined}>
                                    Сохраненные фильмы
                                </NavLink>

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