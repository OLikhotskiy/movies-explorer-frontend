import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <>
        <Header />
        <main>
            <SearchForm />
            <MoviesCardList />
        </main>
        <Footer />
    </>
  )
}

export default SavedMovies