import Sign from '../Sign/Sign'
import { useState } from 'react'
import { useValidation } from '../../hooks/useValidation'


function Login({onLogin}) {
  
  
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
    onLogin(values);
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
                    onChange={onChange}
                    value={values.email || ''}
                    type="email" 
                    name="email"
                    required
                />
                <span className="sign__error">{errors.email || ''}</span>
            </div>
            <div className="sign__input-container">Пароль
                <input className={`sign__input ${errors.password && 'sign__input_error'}`} 
                    onChange={onChange}
                    value={values.password || ''}
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