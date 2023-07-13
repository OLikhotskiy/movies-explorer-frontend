import './popup.css'
import './popup__close.css'
import './popup__container.css'
import './popup_is-open.css'
import './popup__info-tooltip.css'
import './popup__info-tooltip-title.css'

function InfoTooltip(props) {
  return (
    <div className={`popup  ${props.isOpen ? "popup_is-open" : ""}`}>
      <div className="popup__container">
        <img
          src={props.image}
          className="popup__info-tooltip"
          alt={props.title}
        />
        <h2 className="popup__info-tooltip-title">{props.title}</h2>

        <button
          className="popup__close"
          type="button"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
