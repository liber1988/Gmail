import "./Email.css";

const Email = ({ email, onSelectEmail, isActive }) => {
  return (
    <button
      type="button"
      className={`email-button ${isActive ? "email-button--active" : ""}`}
      onClick={() => onSelectEmail(email.id)}
    >
      <span className="email-button__sender">{email.sender}</span>

      <span className="email-button__subject">{email.subject}</span>

      <span className="email-button__preview">{email.preview}</span>
    </button>
  );
};

export default Email;
