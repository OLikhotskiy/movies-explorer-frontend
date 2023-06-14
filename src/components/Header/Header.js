import './Header.css'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <header className="header">
      <Logo />
      <div className="header__notauthorized">
          <button className="header__signup buttons"><Link to="/signup">Регистрация</Link></button>
          <button className="header__signin buttons"><Link to="/signin">Войти</Link></button>
        </div>
    </header>
  )
}


export default Header