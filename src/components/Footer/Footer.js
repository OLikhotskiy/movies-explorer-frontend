import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__info">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</span>
      <div className="footer__container">
        <span className="footer__copyright">&#169;{new Date().getFullYear()}</span>
        <ul className="footer__links-container">
          <li className="footer__link links"><a rel="noreferrer" href="https://practicum.yandex.ru" target="_blank">Яндекс.Практикум</a></li>
          <li className="footer__link links"><a rel="noreferrer" href="https://github.com/OLikhotskiy" target="_blank">Github</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer