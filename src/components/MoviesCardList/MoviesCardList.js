import React, { useEffect, useState } from "react";
import { TABLET_RESOLUTION, MOBILE_RESOLUTION, MAX_QUANTITY, MIDDLE_QUANTITY, MIN_QUANTITY } from "../../utils/constants";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader'

function MoviesCardList({ movies, isLoading, likeClick }) {

  
  const [moviesQuantity, setMoviesQuantity] = useState(MAX_QUANTITY)

  useEffect(() => {
    const timer = () => {setTimeout(quantityMovies, 1000)}
    window.addEventListener('resize', timer);
    return () => window.removeEventListener("resize", timer);
  })

  function quantityMovies() {
    if (window.innerWidth <= TABLET_RESOLUTION && window.innerWidth > MOBILE_RESOLUTION) {
      return setMoviesQuantity(MIDDLE_QUANTITY)
    } else if (window.innerWidth <= MOBILE_RESOLUTION) {
      return setMoviesQuantity(MIN_QUANTITY)
    } else {
    setMoviesQuantity(MAX_QUANTITY)
    }
  }

  function handleMoreButtonClick() {
    if (window.innerWidth > TABLET_RESOLUTION) {
      return setMoviesQuantity(moviesQuantity + 3)
    } else {
      return setMoviesQuantity(moviesQuantity + 2)
    }
  }

  const handleMoreButton = () => {
     if (movies.length > 12 && moviesQuantity < movies.length) {
      return (
        <button 
          type="button" aria-label="Ещё" className="cards__more buttons" 
          onClick={handleMoreButtonClick}>
          Ещё
        </button>
      ) 
    }
  }

  const handleMoviesCard = () => {
    return (
      <>
       {movies.slice(0, moviesQuantity).map((movie) => (
        <MoviesCard
          movie={movie}
          key={movie.id || movie._id}
          likeClick={likeClick}
        />
        ))} 
      </> 
    )
  }

  const handlerNotFound = () => {
    if (movies.length !== 0 && movies.length !== undefined && movies.length !== null) {
      return (
        <ul className="cards__container">
          {handleMoviesCard()}
        </ul> 
      )
    } else {
      return (
        <div className="card__notFound">
          <p>{localStorage.getItem('userRequest') 
            ? 'К сожалению по Вашему запросу ничего не найдено. Измените запрос и повторите поиск.' 
            : 'Введите запрос и нажмите кнопку поиска.'}
          </p>
        </div>
      )
    }
  }

  return (
    <>
    {isLoading 
      ? (<Preloader />) 
      : ( <section className="cards">
            {handlerNotFound()}  
            {handleMoreButton()}
          </section>
      )
    }
    </>
  )
}

export default MoviesCardList;