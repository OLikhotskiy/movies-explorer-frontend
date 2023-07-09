
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Switch from 'react-switch';
import './SearchForm.css'


function SearchForm({checkedSwitch, setCheckedSwitch, startSearch}) {
  const location = useLocation();
  const [request, setRequest] = useState('')    

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('userReqest')) {
      setRequest(localStorage.getItem('userReqest'))
    } else if (location.pathname === '/saved-movies') {
      setRequest('')
    }
   }, [location])

  function onSubmit(evt) {
    evt.preventDefault()
    startSearch(request)
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
            value={request}
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
    </section>
  );
}

export default SearchForm;