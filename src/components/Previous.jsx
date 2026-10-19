export const Previous = ({ setPage, page }) => {
  return <button onClick={() => setPage(page - 1)}>Previous</button>;
};
