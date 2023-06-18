import Sign from '../Sign/Sign'
import { useValidation } from '../../hooks/useValidation'
import { useNavigate } from 'react-router-dom'

function Register() {

const navigate = useNavigate()

const { values, onChange, errors, isFormValid } = useValidation()

  const onSubmit = (e) => {
    e.preventDefault()
    navigate('/signin')
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
          <input className={`sign__input ${errors.name && 'sign__input_error'}`} onChange={onChange} value={values.name || ''}
            type="text" name="name" minLength="2" maxLength="30" required/>
          <span className="sign__error">{errors.name || ''}</span>
        </div>
        <div className="sign__input-container">E-mail
          <input className={`sign__input ${errors.email && 'sign__input_error'}`} onChange={onChange} value={values.email || ''}
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

export default Register