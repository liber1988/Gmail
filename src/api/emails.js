import axios from "axios";

export async function getEmails(searchText, signal, page) {
  const response = await axios.get("http://localhost:3000/emails", {
    params: {
      "sender:contains": searchText,
      _page: page,
      _per_page: 9,
    },
    signal,
  });

  return response.data;
}
export async function deleteEmail(id) {
  const response = await axios.delete(`http://localhost:3000/emails/${id}`);

  return response.data;
}
