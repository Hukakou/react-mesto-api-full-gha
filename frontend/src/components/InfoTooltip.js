import commentTrue from "../images/commentTrue.svg";
import commentFalse from "../images/commentFalse.svg";

function InfoTooltip({ isOpen, isSuccessful, onClose, ...props }) {
  function getIcon() {
    if (isSuccessful) return commentTrue;
    if (!isSuccessful) return commentFalse;
  }

  function getMessage() {
    if (isSuccessful) return "Вы успешно зарегистрировались!";
    if (!isSuccessful) return "Что-то пошло не так! Попробуйте еще раз.";
  }

  return (
    <div className={isOpen ? `pop-up pop-up_active` : "pop-up"}>
      <div className="pop-up__container pop-up__comment">
        <img
          className="pop-up__comment-icon"
          src={getIcon()}
          alt="Иконка состояния"
        />
        <h2 className="pop-up__comment-title">{getMessage()}</h2>
        <button
          className="pop-up__exit pop-up__exit-profile"
          type="button"
          aria-label="выход"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
