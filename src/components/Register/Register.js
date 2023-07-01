import Sign from '../Sign/Sign'
import { useValidation } from '../../hooks/useValidation'
import { useState } from "react";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleName(event) {
    setName(event.target.value);
    
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }
  
  
  const { values, onChange, errors, isFormValid } = useValidation()//починить валидацию

  function onSubmit(evt) {
    evt.preventDefault()
    props.onRegister(name, email, password)
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
            onChange={handleName} 
            value={name}
            type="text" 
            name="name" 
            minLength="2" 
            maxLength="30" 
            required
          />
          <span className="sign__error">{errors.name || ''}</span>
        </div>
        <div className="sign__input-container">E-mail
          <input className={`sign__input ${errors.email && 'sign__input_error'}`} 
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

export default Register