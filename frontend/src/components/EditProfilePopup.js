import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      btn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="form__section">
            <input
              name="name"
              type="text"
              className="form__input pop-up__user-input pop-up__user-input_info_name"
              required
              minLength="2"
              maxLength="40"
              onChange={handleNameChange}
              value={name || ""}
            />
            <span className="form__input-error">Вы пропустили это поле. </span>
          </label>
          <label className="form__section">
            <input
              name="job"
              type="text"
              className="form__input pop-up__user-input pop-up__user-input_info_job"
              required
              minLength="2"
              maxLength="200"
              onChange={handleDescriptionChange}
              value={description || ""}
            />
            <span className="form__input-error">Введите адрес сайта. </span>
          </label>
        </>
      }
    />
  );
}

export default EditProfilePopup;
