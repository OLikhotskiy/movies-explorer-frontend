import './Techs.css'

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="main__title">Технологии</h2>
      <h4 className="techs__title">7&nbsp;технологий</h4>
      <p className="techs__subtitle">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__list-element">HTML</li>
        <li className="techs__list-element">CSS</li>
        <li className="techs__list-element">JS</li>
        <li className="techs__list-element">React</li>
        <li className="techs__list-element">Git</li>
        <li className="techs__list-element">Express.js</li>
        <li className="techs__list-element">mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs