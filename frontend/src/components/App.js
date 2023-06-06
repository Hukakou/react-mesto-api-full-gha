import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AuthUserContext from "../contexts/AuthUserContext";
import "../App.css";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip";
import { register, login, authorize } from "../utils/ApiAuth.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  //Состояние попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  //
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState({ email: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [popupSuccessfully, setPopupSuccessfully] = useState(null);
  const [popupSuccessfullyOpen, setPopupSuccessfullyOpen] = useState(false);

  //Функции для открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(element) {
    setSelectedCard(element);
    setIsImagePopupOpen(true);
  }

  //Функуия закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setPopupSuccessfullyOpen(false);
  }

  //Получение данных юзера
  function getUserData() {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Обработчик данных юзера
  function handleUpdateUser(obj) {
    api
      .patchProfileInfo(obj.name, obj.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Полученик карточек с сервера
  function getUsersCards() {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      getUserData();
      getUsersCards();
    }
    const token = localStorage.getItem("token");
    if (token) {
      authorize(token)
        .then((data) => {
          if (data.data.email) {
            setLoggedIn(true);
            setAuthUser(data.data);
            navigate("/", { replace: true });
          }
        })
        .catch(reportError);
    }
  }, [navigate, loggedIn]);

  //Проверка на наличие лайка и запрос на обновлённые данные карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(setCards((state) => state.filter((c) => card._id !== c._id)))
      .catch((err) => {
        console.log(err);
      });
  }

  //Изменение аватарки
  function handleUpdateAvatar(newAvatar) {
    api
      .patchProfileAvatar(newAvatar.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Добавление карточки на страницу
  function handleAddPlace(newCard) {
    api
      .addCard(newCard.name, newCard.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Регистрация
  function handleRegister(email, password) {
    register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setPopupSuccessfully(true);
      })
      .catch((err) => {
        console.log(err);
        setPopupSuccessfully(false);
      })
      .finally(() => setPopupSuccessfullyOpen(true));
  }

  function handleLogin(email, password) {
    login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setPopupSuccessfully(false);
        setPopupSuccessfullyOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setAuthUser({ email: "" });
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthUserContext.Provider value={{ loggedIn, authUser }}>
        <div className="page">
          <Header onLogout={handleLogout} />

          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                }
              />
            </Route>

            <Route
              path="/sign-up"
              element={<Register applyForRegistration={handleRegister} />}
            />

            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <PopupWithForm title="Вы уверены?" name="delete-card" btn="Да" />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isImagePopupOpen={isImagePopupOpen}
          />

          <InfoTooltip
            isOpen={popupSuccessfullyOpen}
            isSuccessful={popupSuccessfully}
            onClose={closeAllPopups}
          />

          {/* <div className="pop-up popup-delete-card">
        <div className="pop-up__container">
          <h2 className="pop-up__title">Вы уверены?</h2>
          <form
            className="form pop-up__form pop-up__form-delete"
            method="get"
            action="#"
            name="userInfo"
            noValidate
          >
            <button className="form__button pop-up__save" type="submit">Да</button>
          </form>
          <button
            className="pop-up__exit pop-up__exit-profile"
            type="button"
            aria-label="выход"
          ></button>
        </div>
      </div> */}
        </div>
      </AuthUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
