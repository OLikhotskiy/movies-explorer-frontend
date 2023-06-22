import './AboutMe.css'
import Photo from '../../../images/Author.jpg'

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="main__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text">
          <div>
            <h4 className="about-me__title">Олег</h4>
            <p className="about-me__subtitle">Фронтенд-разработчик, 42&nbsp;года</p>
            <p className="about-me__resume">Я&nbsp;живу в&nbsp;Калинингаде. Закончил факультет психологии Томского государственного университета. У&nbsp;меня есть жена и&nbsp;две дочки. Я&nbsp;люблю слушать музыку. С&nbsp;детства увлекался компьютерами и&nbsp;программированием. Но&nbsp;всерьез никогда этим не&nbsp;занимался. Благодаря государственной программе &laquo;Цифровые технологии&raquo; поступил на&nbsp;курс по&nbsp;веб-разработке от&nbsp;Яндекс.Практикума. Планирую заниматься фриланс-заказами и&nbsp;по&nbsp;итогу найти интересную и&nbsp;высокооплачиваимую работу.</p>
          </div>
          <a className="about-me__link links" href="https://github.com/OLikhotskiy" target={'_blank'} rel="noreferrer">Github</a>
        </div>
        <img className="about-me__photo" src={Photo} alt="Я" />
      </div>
    </section>
  )
}

export default AboutMe