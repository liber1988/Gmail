import "./Email.css";

const Email = ({ email, onSelectEmail, isActive, onDeleteEmail }) => {
  return (
    <div className={`email-row ${isActive ? "email-row--active" : ""}`}>
      <button
        type="button"
        className="email-button"
        onClick={() => onSelectEmail(email)}
      >
        <span className="email-button__sender">{email.sender}</span>

        <span className="email-button__subject">{email.subject}</span>

        <span className="email-button__preview">{email.preview}</span>
      </button>

      {isActive && (
        <button
          type="button"
          className="email-delete"
          aria-label="Delete email"
          title="Delete email"
          onClick={() => onDeleteEmail(email.id)}
        >
          <svg
            className="email-delete__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 6v8h2V9h-2Zm4 0v8h2V9h-2ZM7 9v10c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V9h-2v10H9V9H7Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Email;
