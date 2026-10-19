import Email from "./Email";

const Emails = ({ emails, onSelectEmail, selectedEmailId, onDeleteEmail }) => {
  return (
    <div className="emails-list">
      {emails.map((email) => (
        <Email
          key={email.id}
          email={email}
          onSelectEmail={onSelectEmail}
          isActive={email.id === selectedEmailId}
          onDeleteEmail={onDeleteEmail}
        />
      ))}
    </div>
  );
};

export default Emails;
