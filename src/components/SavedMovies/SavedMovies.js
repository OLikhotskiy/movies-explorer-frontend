import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({startSearch, checkedSwitch, setCheckedSwitch, movies, likeClick}) {
  
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
          likeClick={likeClick}/>
        </main>
      <Footer />
    </>
  )
}

export default SavedMovies