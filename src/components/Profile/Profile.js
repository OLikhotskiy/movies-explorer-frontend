import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'
import Header from '../Header/Header';
import { useValidation } from '../../hooks/useValidation'


function Profile() {
const navigate = useNavigate()
const userName = 'Виталий'
const userEmail = 'pochta@yandex.ru'
const { values, onChange, errors, isValid } = useValidation()

const [isDisabled, setIsDisabled] = useState(true)

const handleEditClick = () => setIsDisabled(false)

const onExitClick = (e) => {
    e.preventDefault()
    localStorage.clear()
    navigate('/signin')
  }
    return (
    <>
        <Header />
        <main className='profile'>
            <div className='profile__container'>
                <h2 className='profile__title'>{`Привет, ${userName}!`}</h2>
                <form className='profile__form'>
                    <fieldset className='profile__fieldset'>
                        <label className='profile__fields'>
                            <span className='profile__input-name'>Имя</span>
                            <input 
                                className='profile__input'
                                type='text'
                                name='name'
                                placeholder='Имя'
                                onChange={onChange}
                                value={values.name || userName}
                                minLength="6"
                                maxLength="40"
                                required
                            />
                            
                        </label>
                        <span className="profile-input__error">{errors.name || ''}</span>
                        <label className='profile__fields'>
                            <span className='profile__input-email'>E-mail</span>
                            <input 
                                className='profile__input'
                                type='email'
                                name='email'
                                placeholder='E-mail'
                                onChange={onChange}
                                value={values.email || userEmail}
                                minLength="2"
                                maxLength="30"
                                required 
                            />
                        </label>
                        <span className="profile-input__error">{errors.email || ''}</span>
                    </fieldset>
                    <div className='profile__buttons'>
                        <button className={`profile__button_edit buttons ${!isValid && 'profile__save-button_disabled'}`} type='submit' onClick={handleEditClick}>Редактировать</button>
                        <button className={`profile__button_logout buttons`} onClick={onExitClick}>Выйти из аккаунта</button>
                        
                    </div>
                </form>
                </div>
        </main>
    </>
    );
}

export default Profile;