import { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from 'react-router-dom';

function MoviesCard() {
    
    const [isLiked, setIsLiked] = useState(false)
   
    function handleLikeClick() {
      isLiked ? setIsLiked(false) : setIsLiked(true)
    }

    function handleDeleteClick() {
       alert ('❗🚧Идет разработка🚧❗') 
    }

    return (
      <div className="movies-card">
        <div className="movies-card__info">
          <div className="movies-card__info-box">
            <h6 className="movies-card__title">33 слова о дизайне</h6>
            <span className="movies-card__time">1ч 47м</span>
          </div>
          <div className="movie-cards__like-container">
            {useLocation().pathname === "/movies" &&
                <button className={`movies-card__like buttons ${isLiked && 'movies-card__like_active'}`}
                    type="button"    
                    aria-label="Сохраненные фильмы"
                    onClick={handleLikeClick}>
                </button>
            }
            {useLocation().pathname === "/saved-movies" &&
                <button className="movies-card__delete buttons"
                    type="button" 
                    aria-label="Удалить фильм"
                    onClick={handleDeleteClick}>
                </button>
            }


          </div>
        </div>
        <div className="movies-card__picture"></div>
      </div>
    )
  }
  
  export default MoviesCard