function ImagePopup(props) {

  return (
    <div className={`popup popup_photo ${props.card.link ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <button aria-label="Close" className="popup__close-button popup__close-button_type_photo"
                onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;
