// import profileAvatar from '../images/profile-avatar.jpg';
// import { api } from '../utils/Api';
import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const profileContext = useContext(CurrentUserContext);
  const { name, about, avatar } = profileContext;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <div className="profile__user-photo">
            <button
              type="button"
              aria-label="Добавить аватар пользователя"
              className="profile__btn-add-avatar"
              onClick={onEditAvatar}
            ></button>
            <img
              src={avatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </div>
          <div className="profile__profile-info">
            <h1 className="profile__name-profile">{name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
            <p className="profile__subname-profile">{about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={onAddPlace}
        ></button>
      </section>

      <template id="elements" className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            name={card.name}
            link={card.link}
            likeCount={card.likes.length}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </template>
    </main>
  );
}

export default Main;
