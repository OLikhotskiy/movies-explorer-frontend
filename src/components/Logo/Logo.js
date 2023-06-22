import './Logo.css'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/">
      <div className="logo buttons"></div>
    </Link>
  )
}

export default Logo