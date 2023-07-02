import './Header.css'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation';
import Menu from '../Menu/Menu';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header() {
  const { isLogged } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Logo />
      {isLogged ? (
        <>
        <Navigation />
        <Menu />
        </>
      ) : (
         <div className="header__notauthorized">
          <button className="header__signup buttons"><Link to="/signup">Регистрация</Link></button>
          <button className="header__signin buttons"><Link to="/signin">Войти</Link></button>
        </div> 
      )}
    </header>
  )
}


export default Header