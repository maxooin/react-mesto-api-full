import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm title='Обновить аватар'
                   name='avatar-form'
                   textBtn='Сохранить'
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
      <input className="popup__input popup__input_value_url"
             name="url"
             placeholder="Ссылка"
             type="url"
             ref={avatarRef}
             required/>
      <span className="popup__error url-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
