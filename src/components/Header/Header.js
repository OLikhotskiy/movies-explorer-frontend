import './Header.css'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <header className="header">
      <Logo />
      <div className="header__notauthorized">
          <button className="header__signup"><Link to="/signup">Регистрация</Link></button>
          <button className="header__signin"><Link to="/signin">Войти</Link></button>
        </div>
    </header>
  )
}


export default Header