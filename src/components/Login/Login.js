import Sign from '../Sign/Sign'
import { useValidation } from '../../hooks/useValidation'
import { useState } from 'react'


function Login({onLogin}) {
  const { values, onChange, errors, isFormValid } = useValidation()
  const [disableInput, setDisableInput] = useState(false)

  function onSubmit(evt) {
    evt.preventDefault();
    setDisableInput(true);
    onLogin(values);
    setDisableInput(false)
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
                    disabled={disableInput}
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
                    disabled={disableInput}
                    required
                />
                <span className="sign__error">{errors.password || ''}</span>
            </div>
        </fieldset>
    </Sign>
  )
}

export default Login