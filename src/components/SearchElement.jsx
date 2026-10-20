import "./SearchElement.css";

export const SearchElement = ({ searchText, onSearchText }) => {
  const handleSearch = (event) => {
    onSearchText(event.target.value);
  };
  return (
    <div className="search">
      <label htmlFor="email-search" className="visually-hidden">
        Search emails
      </label>

      <input
        id="email-search"
        type="search"
        value={searchText}
        placeholder="Search mail"
        className="search__input"
        onChange={handleSearch}
      />
    </div>
  );
};
