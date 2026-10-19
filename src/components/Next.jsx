export const Next = ({ setPage, page }) => {
  return <button onClick={() => setPage(page + 1)}>Next{page}</button>;
};
