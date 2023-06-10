import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`pop-up popup-img ${
        props.isImagePopupOpen ? "pop-up_active" : ""
      }`}
    >
      <div className="pop-up__img-container">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="pop-up__card-img"
        />
        <button
          className="pop-up__exit pop-up__exit-img"
          type="button"
          aria-label="выход"
          onClick={props.onClose}
        ></button>
        <p className="pop-up__img-info">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
