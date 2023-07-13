import './Sign.css'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'

function Sign
({title, onSubmit, children, isSignError, isValid, buttonText, questionText, link, linkText}){

    return (
        <main className="sign">
            <div className="sign__container">
                <Logo />
                <h3 className="sign__title">{title}</h3>
            
            <form className="sign__form" onSubmit={onSubmit} noValidate>
                {children}
                {isSignError &&
                <span className="sign__inputError">Неверный логин или пароль</span>}
                <button className={`sign__button buttons ${!isValid && 'sign__button_disabled'} `} type="submit" disabled={!isValid}>
                    {buttonText}
                </button>
                <span className="sign__question">{questionText}
                    <Link to={link} className="sign__link links"> {linkText} </Link>
                </span>
            </form>
            </div>
        </main>
    )
}

export default Sign