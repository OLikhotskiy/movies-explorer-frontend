import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SavedMovies from '../SavedMovies/SavedMovies'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { useEffect, useState } from "react";
import mainApi from '../../utils/MainApi'
import { getBeatfilmMovies } from '../../utils/MoviesApi'


function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || [])
  const [isLogged, setIsLogged] = useState(localStorage.getItem('loggedIn'))

  useEffect(() => {
    tokenCheck()
    if (isLogged) {
      Promise.all([mainApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData);
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
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        
      })
  }

  function onLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLogged(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function onSignOut() {
    localStorage.clear();
    navigate("/");
    setEmail("");
  }

  function handleUpdateUser (newData) {
    mainApi
      .setUserInfo(newData)
      .then((newData) => {
        setCurrentUser(newData);
        
      })
      .catch((error) => console.log(error));
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
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/signin" 
            element={<Login onLogin={onLogin} />} 
          />
          <Route path="/profile" 
            element={
              <Profile 
                isLoggedIn={isLogged}
                onSignOut={onSignOut}
                onUpdateUser={handleUpdateUser}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} /> 
        </Routes>
      </div>
    </div>
    </CurrentUserContext.Provider>
  )
}

export default App