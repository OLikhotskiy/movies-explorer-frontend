import './NotFound.css'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const back = useNavigate()
  return (
    <main className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__back buttons" onClick={() => back(-1)}>Назад</button>
    </main>
  )
}

export default NotFound