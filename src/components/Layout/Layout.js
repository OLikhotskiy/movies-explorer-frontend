import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
//import Footer from '../Footer/Footer'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <div>TEST</div>
      </main>
      
    </>
  )
}

export default Layout