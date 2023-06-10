import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      btn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="form__section">
            <input
              name="name"
              type="text"
              className="form__input pop-up__user-input pop-up__user-input_card_name"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
              onChange={handleNameChange}
              value={name || ""}
            />
            <span className="form__input-error">Вы пропустили это поле.</span>
          </label>
          <label className="form__section">
            <input
              name="link"
              type="url"
              className="form__input pop-up__user-input pop-up__user-input_card_link"
              placeholder="Ссылка на картинку"
              required
              onChange={handleLinkChange}
              value={link || ""}
            />
            <span className="form__input-error">Введите адрес сайта.</span>
          </label>
        </>
      }
    />
  );
}

export default AddPlacePopup;
