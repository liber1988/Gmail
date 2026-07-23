import Email from "./Email";

const Emails = ({ emails, onSelectEmail, selectedEmailId }) => {
  return (
    <div className="emails-list">
      {emails.map((email) => (
        <Email
          key={email.id}
          email={email}
          onSelectEmail={onSelectEmail}
          isActive={email.id === selectedEmailId}
        />
      ))}
    </div>
  );
};

export default Emails;
