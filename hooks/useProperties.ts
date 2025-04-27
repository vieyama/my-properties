import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface UseItemsOptions {
  search?: string;
}

export const useProperties = ({ search }: UseItemsOptions = {}) => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  
  const endpoint = `/properties${query}`;
  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher, {
    revalidateOnReconnect: false
  });

  return {
    items: data?.data ?? null,
    isLoading,
    isError: error,
    mutate,
  };
};
