import './App.css'
import Main from '../Main/Main'
//import Movies from '../Movies/Movies'
//import Profile from '../Profile/Profile'
import { Route, Routes } from 'react-router-dom'
//import SavedMovies from '../SavedMovies/SavedMovies'
import Layout from '../Layout/Layout'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'


function App() {
  return (
    <div className="body">
      <div className="page">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />  
          </Route>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App