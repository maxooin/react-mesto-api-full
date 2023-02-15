import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img alt="Аватар" className="profile__photo" src={currentUser.avatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button aria-label="Edit" className="profile__edit-button" type="button"
                    onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button aria-label="Add" className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards.map((card) =>
          <Card key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}/>
        )}
      </section>
    </main>
  )
}

export default Main;
