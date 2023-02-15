import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleTitleAdd(evt) {
    setName(evt.target.value);
  }

  function handleLinkAdd(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [])

  return (
    <PopupWithForm title='Новое место'
                   name='add-form'
                   textBtn='Сохранить'
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
      <input className="popup__input popup__input_value_title"
             name="title"
             placeholder="Название"
             type="text"
             minLength="2"
             maxLength="30"
             onChange={handleTitleAdd}
             required/>
      <span className="popup__error title-error"></span>

      <input className="popup__input popup__input_value_url"
             name="url"
             placeholder="Ссылка"
             type="url"
             onChange={handleLinkAdd}
             required/>
      <span className="popup__error url-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
