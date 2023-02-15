function InfoTooltip({isOpen, infoIcon, infoText, onClose}) {

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="infotip">
        <button className="popup__close-button" type="button" onClick={onClose}/>
        <img className="infotip__icon"
             src={infoIcon}
             alt="Иконка"/>
        <p className="infotip__text">{infoText}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
