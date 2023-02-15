import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as Auth from "../utils/auth"
import InfoTooltip from "./InfoTooltip";
import okIcon from '../image/icon/ok-icon.svg'
import errIcon from '../image/icon/err-icon.svg'

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [infoText, setInfoText] = useState('');
  const [infoIcon, setInfoIcon] = useState();
  const [isInfoTipOpen, setIsInfoTipOpen] = useState(false);

  const navigate = useNavigate();


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function login() {
    setLoggedIn(true)
  }

  function handleInfoTipOpen() {
    setIsInfoTipOpen(true)
  }

  function handleLogin(email, pwd) {
    Auth.login(email, pwd)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          login();
          setEmail(email)
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/singin');
  }

  function handleSingUp(email, pwd) {
    Auth.singup(email, pwd)
      .then((res) => {
        if (res.data) {
          setInfoIcon(okIcon)
          setInfoText('Вы успешно зарегистрировались!')
          navigate('/singin')
        }
      })
      .catch((err) => {
        setInfoIcon(errIcon)
        setInfoText('Что-то пошло не так! Попробуйте ещё раз.')
        console.log(err)
      })
    handleInfoTipOpen();
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      Auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            login()
            navigate('/')
          }
        });
    }
  }

  function handleUpdateUser(item) {
    api.setUserInfoApi(item.name, item.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((res) => {
        console.log(res)
      })
  }

  function handleUpdateAvatar(item) {
    api.changeAvatar(item)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api.deleteElement(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(item) {
    api.addNewElement(item)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoTipOpen(false)
    setSelectedCard({})
  }

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => {
        console.log(err)
      })

    api.getUserInfoApi()
      .then((userProperty) => {
        setCurrentUser(userProperty)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn}
                onLogOut={handleLogOut}
                email={email}/>
        <Routes>
          <Route exact path="/"
                 element={<ProtectedRoute loggedIn={loggedIn}
                                          component={Main}
                                          onEditProfile={handleEditProfileClick}
                                          onAddPlace={handleAddPlaceClick}
                                          onEditAvatar={handleEditAvatarClick}
                                          onCardClick={handleCardClick}
                                          cards={cards}
                                          onCardLike={handleCardLike}
                                          onCardDelete={handleCardDelete}/>}/>
          <Route path="/singup" element={<Register onSingUp={handleSingUp}/>}/>
          <Route path="/singin" element={<Login onLogin={handleLogin}/>}/>
        </Routes>
        <Footer/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopup}
                          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopup}
                       onAddPlace={handleAddPlaceSubmit}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopup}
                         onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm title='Вы уверены?'
                       name='delete-form'
                       textBtn='Да'/>

        <ImagePopup card={selectedCard}
                    onClose={closeAllPopup}/>

        <InfoTooltip infoText={infoText}
                     infoIcon={infoIcon}
                     onClose={closeAllPopup}
                     isOpen={isInfoTipOpen}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
