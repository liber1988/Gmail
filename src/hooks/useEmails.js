import { getEmails } from "../api/emails";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export function useEmails(searchText, page) {
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const { data, isLoading, isFetching, error, isFetched, isPlaceholderData } =
    useQuery({
      queryKey: ["emails", debouncedSearchText, page],

      queryFn: ({ signal }) => getEmails(debouncedSearchText, signal, page),
      staleTime: 30_000,
      placeholderData: keepPreviousData,
    });

  return {
    emails: data ?? {
      data: [],
      prev: null,
      next: null,
      pages: 0,
      items: 0,
    },
    isLoading,
    isFetching,
    isFetched,
    isPlaceholderData,
    error,
  };
}
