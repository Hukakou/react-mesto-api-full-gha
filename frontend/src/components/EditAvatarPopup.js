import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      btn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="form__section">
            <input
              name="link"
              type="url"
              className="form__input pop-up__user-input pop-up__user-input_card_link"
              placeholder="Ссылка на картинку"
              required
              ref={ref}
            />
            <span className="form__input-error">Введите адрес сайта.</span>
          </label>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
