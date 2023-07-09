import React from 'react';
import './Profile.css'
import Header from '../Header/Header';
import { useValidation } from '../../hooks/useValidation'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'


function Profile({onSignOut, onProfileUpdate}) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, errors, isFormValid, onChange, resetValidation } = useValidation()

    React.useEffect(() => {resetValidation(true, currentUser.currentUser);
    }, [currentUser.currentUser, resetValidation]);


    const onExitClick = (e) => {
        e.preventDefault()
        onSignOut()
    }

    function handleEditClick(evt) {
        evt.preventDefault();
        onProfileUpdate(values);
    }

    return (
    <>
        <Header />
        <main className='profile'>
            <div className='profile__container'>
                <h2 className='profile__title'>{`Привет, ${currentUser.currentUser.name}!`}</h2>
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
                                value={values.name || ''}
                                minLength="2"
                                maxLength="30"
                                required
                            />
                            
                        </label>
                        <span className="profile__input-error">{errors.name || ''}</span>
                        <label className='profile__fields'>
                            <span className='profile__input-email'>E-mail</span>
                            <input 
                                className='profile__input'
                                type='email'
                                name='email'
                                placeholder='E-mail'
                                onChange={onChange}
                                value={values.email || ''}
                                required 
                            />
                        </label>
                        <span className="profile__input-error">{errors.email || ''}</span>
                    </fieldset>
                    <div className='profile__buttons'>
                        <button className="profile__button-edit buttons"  
                            type='submit' onClick={handleEditClick}>Редактировать
                        </button>
                        <button className="profile__button-logout buttons" onClick={onExitClick}>Выйти из аккаунта</button>
                        
                    </div>
                </form>
                </div>
        </main>
    </>
    );
}

export default Profile;