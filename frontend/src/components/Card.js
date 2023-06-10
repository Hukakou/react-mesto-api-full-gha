import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  onCardLike,
  link,
  name,
  likeCount,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i.join('') === currentUser._id);

  const cardLikeButtonClassName = `elements__group ${
    isLiked && "elements__group_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__element">
      <img
        src={link}
        alt={name}
        onClick={handleClick}
        className="elements__mask-group"
      />
      <div className="elements__content">
        <h2 className="elements__element-text">{name}</h2>
        <div className="elements__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайу"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__number-of-likes">{likeCount}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          aria-label="Мусорка"
          className="elements__trash"
          onClick={handleDeleteClick}
        />
      )}
    </div>
  );
}

export default Card;
