import "./Inbox.css";
import "./Pages.css";
import Emails from "./Emails";
import { SelectedEmail } from "./SelectedEmail";
import { FidgetSpinner } from "react-loader-spinner";
import { useState } from "react";
import { SearchElement } from "./SearchElement";
import { useEmails } from "../hooks/useEmails";
import { Previous } from "./Previous";
import { Page } from "./Page";
import { Next } from "./Next";
import { useDeleteEmail } from "../hooks/useDeleteEmail";
import { useSearchParams } from "react-router";
const Inbox = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page"));

  const page =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchText, setSearchtext] = useState("");

  const { emails, isLoading, isFetching, isFetched, error, isPlaceholderData } =
    useEmails(searchText, page);
  const setPage = (nextPage) => {
    const resolvedPage =
      typeof nextPage === "function" ? nextPage(page) : nextPage;

    setSearchParams((currentParams) => {
      const newParams = new URLSearchParams(currentParams);

      if (resolvedPage <= 1) {
        newParams.delete("page");
      } else {
        newParams.set("page", String(resolvedPage));
      }

      return newParams;
    });
  };
  const handleSearch = (text) => {
    setSearchtext(text);
    setPage(1);
  };
  const deleteMutation = useDeleteEmail();

  const handleDeleteEmail = (id) => {
    console.log("DELETE ID :", id);
    deleteMutation.mutate(id);
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
  };
  return (
    <main>
      <section className="inbox">
        <section className="inbox__list">
          <SearchElement onSearchText={handleSearch} setPage={setPage} />

          {isLoading && !isFetched ? (
            <div className="loading-overlay">
              <FidgetSpinner
                visible={true}
                height="80"
                width="80"
                ariaLabel="fidget-spinner-loading"
                backgroundColor="#1a73e8"
                ballColors={["#1a73e8", "#4285f4", "#8ab4f8"]}
              />
            </div>
          ) : error ? (
            <div>Failed to load emails</div>
          ) : emails.data.length === 0 ? (
            <div>No emails found</div>
          ) : (
            <Emails
              emails={emails.data}
              onSelectEmail={setSelectedEmail}
              selectedEmailId={selectedEmail?.id}
              onDeleteEmail={handleDeleteEmail}
            />
          )}

          {isFetching && isPlaceholderData ? (
            <div>Loading new emails</div>
          ) : null}
        </section>

        <section className="inbox__content">
          <SelectedEmail email={selectedEmail} />
        </section>
      </section>

      <section className="pages">
        {emails.prev ? <Previous setPage={setPage} page={page} /> : null}

        <Page setPage={setPage} page={page} />

        {emails.next ? <Next setPage={setPage} page={page} /> : null}
      </section>
    </main>
  );
};

export default Inbox;
