import React, { useState } from 'react';
import Sign from '../Sign/Sign'
import { useValidation } from '../../hooks/useValidation'

function Register({onRegister}) {
  
  const { values, errors, isFormValid, onChange, resetValidation } = useValidation()
  const [disableInput, setDisableInput] = useState(false)

  React.useEffect(() => {
    resetValidation(true);
  }, [resetValidation]);

  function onSubmit(evt) {
    evt.preventDefault();
    setDisableInput(true);
    onRegister(values);
    setDisableInput(false);
  }

  return (
    <Sign 
        title="Добро пожаловать!"
        onSubmit={onSubmit}
        isValid={isFormValid}
        buttonText="Зарегистрироваться"
        questionText="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти"
    >
      <fieldset className="sign__inputs">
        <div className="sign__input-container">Имя
          <input className={`sign__input ${errors.name && 'sign__input_error'}`} 
            onChange={onChange} 
            value={values.name || ''}
            type="text" 
            name="name" 
            minLength="2" 
            maxLength="30"
            disabled={disableInput} 
            required
          />
          <span className="sign__error">{errors.name}</span>
        </div>
        <div className="sign__input-container">E-mail
          <input className={`sign__input ${errors.email && 'sign__input_error'}`} 
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

export default Register