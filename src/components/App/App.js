import { useEffect, useState, useRef } from "react";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import SavedMovies from '../SavedMovies/SavedMovies'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from '../../utils/mainApi'
import { getBeatfilmMovies } from '../../utils/moviesApi'


function App() {
  const navigate = useNavigate();
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({});
  const [isLogged, setIsLogged] = useState(localStorage.getItem('logged'));
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('beatfilmMovies')) || [])
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || [])
  const [filteredShortMovies, setFilteredShortMovies] = useState(JSON.parse(localStorage.getItem('filteredShortMovies')) || [])
  const [shortMoviesSwitchOn, setShortMoviesSwitchOn] = useState(localStorage.getItem('switchOn') ?? false)
  const [savedMovies, setSavedMovies] = useState([])
  const [savedMoviesList, setSavedMoviesList] = useState([])
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([{}])
  const [shortSavedMoviesSwitchOn, setShortSavedMoviesSwitchOn] = useState(false)
  
  useEffect(() => {
    tokenCheck()
    if (isLogged) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies(), getBeatfilmMovies()])
        .then(([userData, saveMovies, beatfilmMovies]) => {
          setCurrentUser(userData);
          setIsLogged(true);
          setAllMovies(beatfilmMovies)
          updateSavedMoviesList(saveMovies)
          if (beatfilmMovies !== undefined) {
          localStorage.setItem('beatfilmMovies', JSON.stringify(beatfilmMovies))}
        })
        .catch((error) => console.log(error));
        }
  }, [isLogged]);  

  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token && isLogged) {
      mainApi.getToken(token).then((res) => {
          if (res) {
            setIsLogged(true);
            navigate("/movies", { replace: true });
          }
        })
        .catch((err) => console.error(err))
    }
  };

  function onRegister(name, email, password) {
    mainApi
      .registration(name, email, password)
      .then(() => {
        onLogin(email, password);
      })
      .catch((err) => {
        console.log(err);        
      })
  }

  function onLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('logged', 'true');
        setIsLogged(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function onSignOut() {
    mainApi
      .logout()
      .then((res) => {
        localStorage.clear();
        setCurrentUser({});
        setIsLogged(false);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleProfileUpdate (newData) {
    mainApi
      .setUserInfo(newData)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((error) => console.log(error));
  };
    
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setSavedMovies(savedMoviesList)
    }
    if (isLogged) {
      shortMoviesSwitchOn
        ? updateFilteredMoviesList(filteredShortMovies)
        : updateFilteredMoviesList(filteredMovies)
    }
  }, [location, savedMoviesList])

  useEffect(() => {
    if (shortMoviesSwitchOn) {
      filterShortMoviesInSearch()
      localStorage.setItem('switchOn', true)
    } else {
      handleSearch(localStorage.getItem('userReqest'))
      .then(() => localStorage.removeItem('switchOn'))
    }
  }, [shortMoviesSwitchOn])

  useEffect(() => {
    if (shortSavedMoviesSwitchOn) {
      const shortMovies = savedMovies.filter((movie) => movie.duration < 40)
      setSavedMovies(shortMovies)
    } else {
      setSavedMovies(savedMoviesList)
    }
  }, [shortSavedMoviesSwitchOn])

  function onLikeClick(movie, isLiked) {
    if (isLiked){
      addLike(movie)
    } else{
      deleteLike(movie)
    }
  }

  function addLike(movie) {
    mainApi.addMovie(movie)
    .then((movie) => {
      const newSavedMovies = [movie, ...savedMoviesList]
      updateSavedMoviesList(newSavedMovies)
    })
    .catch((err) => console.log(err))
  }

  function deleteLike (movie) {
    mainApi.deleteMovie(movie)
    .then(() => {
      const filtredSavedMoviesList = savedMoviesList.filter(likedMovies => likedMovies._id !== movie._id)
      const newFilteredSavedMoviesList = filteredSavedMovies.filter(likedMovies => likedMovies._id !== movie._id)
      updateSavedMoviesList(filtredSavedMoviesList)
      updateFilteredSavedMoviesList(newFilteredSavedMoviesList)
    })
    .catch((err) => console.log(err))
  }

  function checkIsLikedMovie(movie) {
    return savedMoviesList.some((item) => item.movieId === movie.id)
  }
  
  function updateSavedMoviesList(movies) {
    const likedMovies = movies.map(movie => ({ ...movie, isLiked: true }))
    setSavedMoviesList(likedMovies)
    setSavedMovies(likedMovies)
  }

  function updateFilteredMoviesList(movies) {
    const updatedFilteredMoviesProperties = movies.map(movie => ({
        ...movie,
        _id: (savedMoviesList.find(likedMovie => likedMovie.movieId === movie.id) || {})._id,
        isLiked: checkIsLikedMovie(movie)
      })
    )
    if (shortMoviesSwitchOn) {
      setFilteredShortMovies(updatedFilteredMoviesProperties)
      localStorage.setItem('filteredShortMovies', JSON.stringify(movies))
    } else {
      setFilteredMovies(updatedFilteredMoviesProperties)
      localStorage.setItem('filteredMovies', JSON.stringify(movies))
    }
  }

  function updateFilteredSavedMoviesList(likedMovies) {
    setFilteredSavedMovies(likedMovies)
  }

  async function handleSearch(request) {
    const reqToLowerCase = request.toLowerCase()
    try {
      await setIsLoading(true)
      if (request.length) {
        setIsLoading(true)
        if (location.pathname === '/saved-movies') {
          handleFilterMovies(reqToLowerCase)
        } else {
          localStorage.setItem('userReqest', request)
          if (shortMoviesSwitchOn) {
            filterShortMovies(reqToLowerCase)
          } else {
            handleFilterMovies(reqToLowerCase)
          }
        }
      } else {
        //Tooltip
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  function handleFilterMovies (request) {
    if (location.pathname === '/saved-movies') {
      const filteredSavedMovies = savedMoviesList.filter((movie) => movie.nameRU.toLowerCase().indexOf(request) >= 0)
      if (shortSavedMoviesSwitchOn) {
        const filteredSavedShortMovies = filteredSavedMovies.filter((movie) => movie.duration < 40)
        setSavedMovies(filteredSavedShortMovies)
      } else {
        setSavedMovies(filteredSavedMovies)
      }
    } else {
      const filteredMovies = allMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(request) >= 0)
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies))
      setFilteredMovies(filteredMovies)
      updateFilteredMoviesList(filteredMovies)
    }
  }

  function filterShortMovies(request) {
    const filteredMovies = allMovies.filter((movie) =>
      movie.nameRU.toLowerCase().indexOf(request) >= 0)
    const filteredShortMovies = filteredMovies.filter((movie) => movie.duration < 40)
    localStorage.setItem('filteredShortMovies', JSON.stringify(filteredShortMovies))
    updateFilteredMoviesList(filteredShortMovies)
  }

  function filterShortMoviesInSearch() {
    const filteredShortMovies = filteredMovies.filter((movie) => movie.duration < 40)
    localStorage.setItem('filteredShortMovies', JSON.stringify(filteredShortMovies))
    setFilteredShortMovies(filteredShortMovies)
  }
  
  return (
    <CurrentUserContext.Provider value={{currentUser, isLogged}}>
    <div className="body">
      <div className="page">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
              <Header />
              <Main/>
              <Footer />
              </>
            }
          />
          <Route path="/signup"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/signin" 
            element={<Login onLogin={onLogin} />} 
          />
          <Route path="/profile" 
            element={
              <ProtectedRoute
                component={Profile} 
                isLogged={isLogged}
                onSignOut={onSignOut}
                onProfileUpdate={handleProfileUpdate}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/movies" element={
            <ProtectedRoute
              component={Movies}
              isLogged={isLogged}
              checkedSwitch={shortMoviesSwitchOn}
              setCheckedSwitch={setShortMoviesSwitchOn}
              startSearch={handleSearch}
              movies={shortMoviesSwitchOn ? filteredShortMovies : filteredMovies}
              likeClick={onLikeClick}
              isLoading={isLoading}
            />} 
          />
          <Route path="/saved-movies" element={
            <ProtectedRoute
              component={SavedMovies}
              isLogged={isLogged}
              movies={savedMovies}
              setMoviesList={setSavedMoviesList}
              likeClick={onLikeClick}
              startSearch={handleSearch}
              checkedSwitch={shortSavedMoviesSwitchOn}
              setCheckedSwitch={setShortSavedMoviesSwitchOn}
              
            />} 
          /> 
        </Routes>
      </div>
    </div>
    </CurrentUserContext.Provider>
  )
}

export default App