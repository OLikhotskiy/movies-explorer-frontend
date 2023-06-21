import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader'
import { useEffect, useState } from 'react'


function MoviesCardList() {
  const [isPreloader, setIsPreloader] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsPreloader(true), 1000)
  }, [])

  return (
    <>
      {!isPreloader ? (
        <Preloader />
      ) : (
        <section className="cards">
          <ul className="cards__container">
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
          </ul>
          <button type="button" aria-label="Ещё" className="cards__more buttons"></button>
        </section>
      )
      }
    </>
  )
}

export default MoviesCardList;