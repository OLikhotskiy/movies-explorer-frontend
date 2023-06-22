import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="main__title">О проекте</h2>
      <div className="about-project__container">
        <div>
          <h4 className="about-project__title">Дипломный проект включал 5&nbsp;этапов</h4>
          <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div>
          <h4 className="about-project__title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h4>
          <p className="about-project__subtitle">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__terms">
        <div className="about-project__terms-sector">
          <span className="about-project__terms-term about-project__terms-1week">1&nbsp;неделя</span>
          <span className="about-project__terms-description">Back-end</span>
        </div>
        <div className="about-project__terms-sector">
          <span className="about-project__terms-term">4&nbsp;недели</span>
          <span className="about-project__terms-description">Front-end</span>
        </div>
      </div>
    </section>
  )
}

export default AboutProject