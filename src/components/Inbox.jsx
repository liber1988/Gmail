import "./Inbox.css";
import Emails from "./Emails";
import { SelectedEmail } from "./SelectedEmail";
import emails from "../constants/emails";
import { useState } from "react";
import { SearchElement } from "./SearchElement";
const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(1);
  const [searchText, setSearchtext] = useState("");
  const getFilteredEmails = (text) => {
    const normalizedText = (text || "").toLowerCase();

    return emails.filter((email) =>
      Object.values(email).some((value) =>
        String(value).toLowerCase().includes(normalizedText),
      ),
    );
  };
  const email = emails.find((email) => email.id === selectedEmail);

  return (
    <main className="inbox">
      <section className="inbox__list">
        <SearchElement onSearchText={setSearchtext} />
        <Emails
          emails={getFilteredEmails(searchText)}
          onSelectEmail={setSelectedEmail}
          selectedEmailId={selectedEmail}
        />
      </section>

      <section className="inbox__content">
        <SelectedEmail email={email} />
      </section>
    </main>
  );
};

export default Inbox;
