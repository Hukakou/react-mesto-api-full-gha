import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`pop-up popup-${props.name} ${
        props.isOpen ? "pop-up_active" : ""
      }`}
    >
      <div className="pop-up__container">
        <h2 className="pop-up__title">{props.title}</h2>
        <form
          className={`form pop-up__form pop-up__form-${props.name}`}
          method="get"
          action="#"
          name="userInfo"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="form__button pop-up__save" type="submit">
            {props.btn}
          </button>
        </form>
        <button
          className="pop-up__exit pop-up__exit-profile"
          type="button"
          aria-label="выход"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
