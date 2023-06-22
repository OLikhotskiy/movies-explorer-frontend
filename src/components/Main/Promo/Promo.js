import './Promo.css'

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <nav>
        <ul className="promo__nav">
          <li className="promo__nav-links links"><a href="#about-project" className="promo__nav-link">О проекте</a></li>
          <li className="promo__nav-links links"><a href="#techs" className="promo__nav-link">Технологии</a></li>
          <li className="promo__nav-links links"><a href="#about-me" className="promo__nav-link">Студент</a></li>
        </ul>
      </nav>
    </section>
  )
}

export default Promo