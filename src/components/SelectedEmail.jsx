export const SelectedEmail = ({ email }) => {
  if (!email) {
    return (
      <div className="selected-email selected-email--empty">
        Choose the mail
      </div>
    );
  }

  return (
    <article className="selected-email">
      <p className="selected-email__sender">{email.sender}</p>
      <h1 className="selected-email__subject">{email.subject}</h1>
      <p className="selected-email__message">{email.preview}</p>
    </article>
  );
};
