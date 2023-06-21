import { useState } from 'react';
import Switch from 'react-switch';
import './SearchForm.css'


function SearchForm() {
    const [isChecked, setIsChecked] = useState(false);
    function handleChange(check) {
        setIsChecked(check);
    }

    return (
        <section className="search">
            <form className="search__form">
                <div className="search__container">
                    <input className="search__input" name="search" type="text" placeholder="Фильм" required />
                    <button className="search__button buttons"></button>
                </div>
                <label className="search__toggle">
                    <Switch
                        checked={isChecked}
                        onChange={handleChange}
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