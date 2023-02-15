import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleJobChange(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm title='Редактировать профиль'
                   name='edit-form'
                   textBtn='Сохранить'
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
      <input className="popup__input popup__input_value_name"
             name="name"
             placeholder="Имя"
             type="text"
             value={name}
             minLength="2"
             maxLength="40"
             onChange={handleNameChange}
             required/>
      <span className="popup__error name-error"></span>

      <input className="popup__input popup__input_value_job"
             name="job"
             placeholder="О себе"
             type="text"
             value={description}
             minLength="2"
             maxLength="200"
             onChange={handleJobChange}
             required/>
      <span className="popup__error job-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
