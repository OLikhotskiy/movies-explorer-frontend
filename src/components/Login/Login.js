import Sign from '../Sign/Sign'
import { useState } from 'react'
import { useValidation } from '../../hooks/useValidation'


function Login(props) {
  
  
  const { values, onChange, errors, isFormValid } = useValidation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }


  return (
    <Sign 
        title="Рады видеть!"
        onSubmit={onSubmit}
        
        isValid={isFormValid}
        buttonText="Войти"
        questionText="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация"
    >
        <fieldset className="sign__inputs">
            <div className="sign__input-container">E-mail
                <input className={`sign__input ${errors.email && 'ssign__input_error'}`} 
                    onChange={handleEmail}
                    value={email}
                    type="email" 
                    name="email"
                    required
                />
                <span className="sign__error">{errors.email || ''}</span>
            </div>
            <div className="sign__input-container">Пароль
                <input className={`sign__input ${errors.password && 'sign__input_error'}`} 
                    onChange={handlePassword}
                    value={password}
                    type="password" 
                    name="password" 
                    required
                />
                <span className="sign__error">{errors.password || ''}</span>
            </div>
        </fieldset>
    </Sign>
  )
}

export default Login