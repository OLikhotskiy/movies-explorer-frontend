import { useEffect, useState } from "react";
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
import Cookie from "js-cookie";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import wrong from "../../images/wrong.svg"
import ok from "../../images/ok.svg";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [infoTooltipImage, setinfoTooltipImage] = useState("");
  const [infoTooltipTitle, setInfoTooltipTitle] = useState("");
  const [isLogged, setIsLogged] = useState(localStorage.getItem('logged'));
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('beatfilmMovies')) || []);
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [filteredShortMovies, setFilteredShortMovies] = useState(JSON.parse(localStorage.getItem('filteredShortMovies')) || []);
  const [shortMoviesSwitchOn, setShortMoviesSwitchOn] = useState(localStorage.getItem('switchOn') ?? false);
  
  const [savedMoviesRender, setSavedMoviesRender] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filtredSavedMovies, setFiltredSavedMovies] = useState(JSON.parse(localStorage.getItem('filteredSavedMovies')) || []);
  
  const [shortSavedMoviesSwitchOn, setShortSavedMoviesSwitchOn] = useState(localStorage.getItem('switchOn') ?? false);
  
  useEffect(() => {
    checkAuth()
    if (isLogged) {
      Promise.all([mainApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData);
          setIsLogged(true);
        })
        .catch((error) => {
          console.log(error)
          if (error === "Ошибка: 401") {
            localStorage.clear()
            navigate("/", { replace: true })
            setIsLogged(false)
          } 
        });
      Promise.all([getBeatfilmMovies()])
        .then(([beatfilmMovies ]) => {
          setAllMovies(beatfilmMovies)
          if (beatfilmMovies !== undefined) {
            localStorage.setItem('beatfilmMovies', JSON.stringify(beatfilmMovies))
          }
        })
        .catch((error) => {
          console.log(error)
          if (error === "Ошибка: 401") {
            localStorage.clear()
            navigate("/", { replace: true })
            setIsLogged(false)
          } 
        });  
      Promise.all([mainApi.getMovies()])
        .then(([saveMovies]) => {
          updateSavedMoviesList(saveMovies)
        })
        .catch((error) => {
            console.log(error)
            if (error === "Ошибка: 401") {
              localStorage.clear()
              navigate("/", { replace: true })
              setIsLogged(false)
            } 
          });
    }
  }, [isLogged]);  

  function checkAuth() {
    if (localStorage.getItem('logged')) {
      mainApi.getUserInfo()
      .then((res) => {
        if (res) {
          setIsLogged(true)
        }
      })
      .catch((error) => {
        console.log(error)
        if (error === "Ошибка: 401") {
          localStorage.clear()
          navigate("/", { replace: true })
          setIsLogged(false)
        } 
      });
    } else {
      localStorage.clear()
    }
  } 

  function onRegister(values) {
    mainApi
      .registration(values)
      .then(() => {
        onLogin(values);
      })
      .catch((err) => {
        console.log(err);
        addInfoTooltip();
        setinfoTooltipImage(wrong);
        setInfoTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
        if (err === "Ошибка: 401") {
          localStorage.clear()
          navigate("/", { replace: true })
          setIsLogged(false)
        }        
      })
  }

  async function onLogin(values) { 
    try { mainApi.login(values)
        localStorage.setItem('logged', 'true');
        setIsLogged(true);
        addInfoTooltip();
        setinfoTooltipImage(ok);
        setInfoTooltipTitle("Вы успешно вошли!");
        setTimeout(() => closeInfoTooltip(), 2000)
      } catch(err) {
        console.log(err);
        addInfoTooltip();
        setinfoTooltipImage(wrong);
        setInfoTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
        if (err === "Ошибка: 401") {
          localStorage.clear()
          navigate("/", { replace: true })
          setIsLogged(false)
        }
      } 
  }
  
  function onSignOut() {
    mainApi
      .logout()
      .then((res) => {
        setFilteredMovies([]);
        setFilteredShortMovies([]);
        setShortMoviesSwitchOn(false);
        Cookie.remove('jwt');
        localStorage.clear();
        setCurrentUser({});
        setIsLogged(false);
        addInfoTooltip();
        setinfoTooltipImage(ok);
        setInfoTooltipTitle("Вы вышли! Возвращайтесь!");
        setTimeout(() => closeInfoTooltip(), 2000)
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        addInfoTooltip();
        setinfoTooltipImage(wrong);
        setInfoTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
        
      });
  }

  function handleProfileUpdate (newData) {
    mainApi
      .setUserInfo(newData)
      .then((newData) => {
        setCurrentUser(newData);
        addInfoTooltip();
        setinfoTooltipImage(ok);
        setInfoTooltipTitle("Информация о пользователе успешно обновлена!");
        setTimeout(() => closeInfoTooltip(), 2000)
      })
      .catch((error) => {
        console.log(error);
        addInfoTooltip();
        setinfoTooltipImage(wrong);
        setInfoTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
        if (error === "Ошибка: 401") {
          localStorage.clear()
          navigate("/", { replace: true })
          setIsLogged(false)
        }
      });
  };
    
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setSavedMoviesRender(savedMovies)
    }
    if (isLogged) {
      shortMoviesSwitchOn
        ? updateFilteredMoviesList(filteredShortMovies)
        : updateFilteredMoviesList(filteredMovies)
    }
  }, [location, savedMovies])

  useEffect(() => {
    if (shortMoviesSwitchOn) {
      filterShortMoviesInSearch()
      localStorage.setItem('switchOn', true)
    } else {
      handleSearch(localStorage.getItem('userRequest'))
      .then(() => localStorage.removeItem('switchOn'))
    }
  }, [shortMoviesSwitchOn])

  useEffect(() => {
    if (shortSavedMoviesSwitchOn) {
      filterShortMoviesInSearch()
      localStorage.setItem('switchOn', true)
    } else {
      handleSearch(localStorage.getItem('userRequest'))
      .then(() => localStorage.removeItem('switchOn'))
    }
  }, [shortSavedMoviesSwitchOn])

  useEffect(() => {
    if (shortSavedMoviesSwitchOn) {
      const savedShortMoies = savedMoviesRender.filter((movie) => movie.duration < SHORT_MOVIE_DURATION)
      setSavedMoviesRender(savedShortMoies)
    } else {
      setSavedMoviesRender(savedMovies)
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
      const newSavedMovies = [movie, ...savedMovies]
      updateSavedMoviesList(newSavedMovies)
    })
    .catch((err) => {
      console.log(err)
      if (err === "Ошибка: 401") {
        localStorage.clear()
        navigate("/", { replace: true })
        setIsLogged(false)
      }
    })
  }

  async function deleteLike (movie) {
   mainApi.deleteMovie(movie)
    .then(() => {
      const filtredSavedMoviesList = savedMovies.filter(likedMovies => likedMovies._id !== movie._id);
      const newFilteredSavedMoviesList = filtredSavedMovies.filter(likedMovies => likedMovies._id !== movie._id);
      localStorage.setItem('newFilteredSavedMoviesList', JSON.stringify(newFilteredSavedMoviesList))
      updateSavedMoviesList(filtredSavedMoviesList);
      updateFilteredSavedMoviesList(newFilteredSavedMoviesList);
      setSavedMoviesRender(JSON.parse(localStorage.getItem('newFilteredSavedMoviesList')));
      
      addInfoTooltip();
      setinfoTooltipImage(ok);
      setInfoTooltipTitle("Фильм удален из избранного!");
      setTimeout(() => closeInfoTooltip(), 2000)
    })
    .catch((err) => {
      console.log(err)
      if (err === "Ошибка: 401") {
        localStorage.clear()
        navigate("/", { replace: true })
        setIsLogged(false)
      }
    })
  }

  function checkIsLikedMovie(movie) {
    return savedMovies.some((item) => item.movieId === movie.id)
  }
  
  function updateSavedMoviesList(movies) {
    const likedMovies = movies.map(movie => ({ ...movie, isLiked: true }))
    setSavedMovies(likedMovies)
    setSavedMoviesRender(likedMovies)
  }

  function updateFilteredMoviesList(movies) {
    const updatedFilteredMoviesProperties = movies.map(movie => ({
        ...movie,
        _id: (savedMovies.find(likedMovie => likedMovie.movieId === movie.id) || {})._id,
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
    setFiltredSavedMovies(likedMovies)
  }

  async function handleSearch(request) {
    if (!request) {return} else {
    const reqToLowerCase = request.toLowerCase()
    try {
      await setIsLoading(true)
      if (request.length) {
        setIsLoading(true)
        if (location.pathname === '/saved-movies') {
          localStorage.setItem('userRequest', request)
          handleFilterMovies(reqToLowerCase)
        } else {
          localStorage.setItem('userRequest', request)
          if (shortMoviesSwitchOn) {
            filterShortMovies(reqToLowerCase)
          } else {
            handleFilterMovies(reqToLowerCase)
          }
        }
      } else {
        addInfoTooltip();
        setinfoTooltipImage(wrong);
        setInfoTooltipTitle("Ничего не найдено. Измените запрос!");
      }
    } catch (err) {
      console.log(err)
      if (err === "Ошибка: 401") {
        localStorage.clear()
        navigate("/", { replace: true })
        setIsLogged(false)
      }
    } finally {
      setIsLoading(false)
    }
  }
  }

  function handleFilterMovies (request) {
    if (location.pathname === '/saved-movies') {
      const filtredSavedMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(request) >= 0)
      if (shortSavedMoviesSwitchOn) {
        const filteredSavedShortMovies = filtredSavedMovies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION)
        localStorage.setItem('filteredShortMovies', JSON.stringify(filteredSavedShortMovies))
        setSavedMoviesRender(filteredSavedShortMovies)
      } else {
        localStorage.setItem('filteredSavedMovies', JSON.stringify(filtredSavedMovies))
        setSavedMoviesRender(filtredSavedMovies)
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
    const filteredShortMovies = filteredMovies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION)
    localStorage.setItem('filteredShortMovies', JSON.stringify(filteredShortMovies))
    updateFilteredMoviesList(filteredShortMovies)
  }

  function filterShortMoviesInSearch() {
    const filteredShortMovies = filteredMovies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION)
    localStorage.setItem('filteredShortMovies', JSON.stringify(filteredShortMovies))
    setFilteredShortMovies(filteredShortMovies)
  }
  
  function addInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeInfoTooltip() {
    setInfoTooltip(false);
  };
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            element={
              <Register
                isLogged={isLogged}
                onRegister={onRegister}                 
              />
            }
          />
          <Route path="/signin" 
            element={
              <Login
                isLogged={isLogged} 
                onLogin={onLogin}               
              />
            } 
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
          <Route path="movies" 
            element={
              <ProtectedRoute
                component={Movies}
                isLogged={isLogged}
                checkedSwitch={shortMoviesSwitchOn}
                setCheckedSwitch={setShortMoviesSwitchOn}
                startSearch={handleSearch}
                movies={shortMoviesSwitchOn ? filteredShortMovies : filteredMovies}
                likeClick={onLikeClick}
                isLoading={isLoading}
              />
            } />
          <Route path="saved-movies" element={
            <ProtectedRoute
              component={SavedMovies}
              isLogged={isLogged}
              movies={savedMoviesRender}
              
              likeClick={onLikeClick}
              startSearch={handleSearch}
              checkedSwitch={shortSavedMoviesSwitchOn}
              setCheckedSwitch={setShortSavedMoviesSwitchOn}
              
            />} 
          /> 
        </Routes>
      </div>
      <InfoTooltip
          image={infoTooltipImage}
          title={infoTooltipTitle}
          isOpen={infoTooltip}
          onClose={closeInfoTooltip}
        />
    </div>
    </CurrentUserContext.Provider>
  )
}

export default App