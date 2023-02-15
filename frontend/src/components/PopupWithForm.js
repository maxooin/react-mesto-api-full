function PopupWithForm(props) {

  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button className='popup__close-button'
                type='button'
                onClick={props.onClose}></button>
        <h2 className='popup__heading'>{props.title}</h2>
        <form className='popup__form'
              name={`popup-${props.name}`}
              onSubmit={props.onSubmit}>
          {props.children}
          <button className='popup__submit-button'
                  type='submit'>{props.textBtn}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
