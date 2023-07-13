import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Movies({checkedSwitch, setCheckedSwitch, startSearch, movies, likeClick, isLoading}) {

  return (
    <>
      <Header />
      <main>
        <SearchForm 
          checkedSwitch={checkedSwitch}
          setCheckedSwitch={setCheckedSwitch}
          startSearch={startSearch}
        />
        <MoviesCardList 
          movies={movies}
          likeClick={likeClick}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </>
  )
}

export default Movies; 