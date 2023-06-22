import Sign from '../Sign/Sign'
import { useState } from 'react'
import { useValidation } from '../../hooks/useValidation'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [isSignError, setIsSignError] = useState(false)
  const { values, onChange, errors, isFormValid } = useValidation()

  const onSubmit = (e) => {
    e.preventDefault()
    if (values.email === 'admun@admin' && values.password === 'admun@admin') {
        localStorage.setItem('loggedIn', 'yes')
        navigate('/')
    } else {
        setIsSignError(true)
    }
  }

  return (
    <Sign 
        title="Рады видеть!"
        onSubmit={onSubmit}
        isSignError={isSignError}
        isValid={isFormValid}
        buttonText="Войти"
        questionText="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация"
    >
        <fieldset className="sign__inputs">
            <div className="sign__input-container">E-mail
                <input className={`sign__input ${errors.email && 'ssign__input_error'}`} onChange={onChange} value={values.email || ''}
                type="email" name="email" minLength="2" maxLength="30" required/>
                <span className="sign__error">{errors.email || ''}</span>
            </div>
            <div className="sign__input-container">Пароль
                <input className={`sign__input ${errors.password && 'sign__input_error'}`} onChange={onChange} value={values.password || ''}
                type="password" name="password" minLength="6" maxLength="30" required/>
                <span className="sign__error">{errors.password || ''}</span>
            </div>
        </fieldset>
    </Sign>
  )
}

export default Login