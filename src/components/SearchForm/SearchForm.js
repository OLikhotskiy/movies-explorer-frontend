
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Switch from 'react-switch';
import './SearchForm.css'


function SearchForm({checkedSwitch, setCheckedSwitch, startSearch}) {
  const location = useLocation();
  const [request, setRequest] = useState('');
  const [requestError, setRequestError] = useState("");    

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('userRequest')) {
      setRequest(localStorage.getItem('userRequest'))
    } else if (location.pathname === '/saved-movies' && localStorage.getItem('userRequest')) {
      setRequest(localStorage.getItem('userRequest'))
    } else {
      setRequest('')
    }
   
  }, [location])
  
  useEffect(() => {
    setRequestError("");
  }, [request]);

  function onSubmit(evt) {
    evt.preventDefault()
    if (location.pathname === "/movies") {
      request
        ? startSearch(request)
        : setRequestError("Нужно ввести ключевое слово");
    } else {
      startSearch(request)
    }
  }

  function handleChange(evt) {
    setRequest(evt.target.value)
  }

  function handleSwithChange(checked) {
    setCheckedSwitch(!checkedSwitch, checked)
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={onSubmit} noValidate>
        <div className="search__container">
          <input className="search__input" name="search" type="text" 
            placeholder="Фильм" onChange={handleChange}
            value={request || ''}
            required 
          />
          <button className="search__button buttons"></button>
        </div>
        <label className="search__toggle">
          <Switch
            checked={checkedSwitch}
            onChange={handleSwithChange}
            onColor="#3DDC84"
            offColor="#EBEBEB"
            onHandleColor="#EBEBEB"
            offHandleColor="#3DDC84"
            handleDiameter={16}
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
            width={36}
          />
           <p className="search__description">Короткометражки</p>
        </label>
      </form>
      <span className="search-form__error">{requestError}</span>
    </section>
  );
}

export default SearchForm;