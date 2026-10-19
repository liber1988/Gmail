export const Page = ({ setPage, page }) => {
  return (
    <button className="page-current" onClick={() => setPage(page)}>
      Page {page}
    </button>
  );
};
