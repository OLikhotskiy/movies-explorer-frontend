import './Portfolio.css'

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul>
        <li className="portfolio__element">
            <a className="portfolio__link links" href="https://github.com/OLikhotskiy/how-to-learn" target="_blank" rel="noreferrer">
                Статичный сайт
                <div className="portfolio__link-image"></div>
            </a>
        </li>
        <li className="portfolio__element">
            <a className="portfolio__link links" href="https://github.com/OLikhotskiy/russian-travel" target="_blank" rel="noreferrer">
                Адаптивный сайт
                <div className="portfolio__link-image"></div>
            </a>
        </li>
        <li className="portfolio__element">
            <a className="portfolio__link links" href="https://github.com/OLikhotskiy/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
                Одностраничное приложение
                <div className="portfolio__link-image"></div>
            </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio