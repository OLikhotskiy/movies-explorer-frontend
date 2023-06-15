import './App.css'
import Main from '../Main/Main'
//import Movies from '../Movies/Movies'
//import Profile from '../Profile/Profile'
import { Route, Routes } from 'react-router-dom'
//import SavedMovies from '../SavedMovies/SavedMovies'
import Layout from '../Layout/Layout'
//import NotFound from '../NotFound/NotFound'//
//import Login from '../Login/Login'
//import Register from '../Register/Register'

function App() {
  return (
    <div className="body">
      <div className="page">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />  
          </Route>
          
        </Routes>
      </div>
    </div>
  )
}

export default App