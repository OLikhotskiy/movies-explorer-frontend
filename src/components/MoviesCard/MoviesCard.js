import "./MoviesCard.css";
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, likeClick }) {
  const { isLiked } = movie
  const location = useLocation();
    
  function changeTime(time) {
    const min = time%60;
    const hour = (time-min) / 60;
        
    if (hour < 1) { 
      return `${min}м`
    } else {return `${hour}ч ${min}м`}
  }
  
  function handleLikeClick() {
    likeClick(movie, !isLiked)
  }

  const handleLikeButton = () => {
    if (location.pathname === '/movies') {
      return (
        <button 
          className={`movies-card__like buttons ${isLiked && 'movies-card__like_active'}`} 
          type="button" aria-label="Сохраненные фильмы" onClick={handleLikeClick}>
        </button>
      )
    } else if (location.pathname === '/saved-movies') {
      return (
        <button 
          className="movies-card__delete buttons" 
          type="button" aria-label="Сохраненные фильмы" onClick={handleLikeClick}>
        </button>
    )}
  }  

  const handleImageUrl = () => {
    if (location.pathname === '/movies') {
      return (
        <div className="movies-card__picture" 
          style={{
            backgroundImage:  `url(${`https://api.nomoreparties.co`}${movie.image.url})`
          }}>
        </div>
      )
    } else if (location.pathname === '/saved-movies') {
      return (
        <div className="movies-card__picture" 
          style={{
            backgroundImage: `url(${movie.image})`,
          }}>
        </div>
    )}
  } 

    return (
      <li className="movies-card">
        <div className="movies-card__info">
          <div className="movies-card__info-box">
            <h6 className="movies-card__title">{movie.nameRU}</h6>
            <span className="movies-card__time">{changeTime (movie.duration)}</span>
          </div>
          <div className="movies-card__like-container">
            {handleLikeButton()}
          </div>
        </div>
        <a href={movie.trailerLink} target='_blank' rel='noreferrer'>
            {handleImageUrl()}
        </a>
      </li>
    )
  }
  
export default MoviesCard