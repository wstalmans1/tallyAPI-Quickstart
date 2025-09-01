import { useQuery as useReactQuery } from "@tanstack/react-query";
import { fetcher } from "../RawQuery/fetcher";

export const useQuery = ({ query, variables }) => {
  return useReactQuery({
    queryKey: [query.slice(0,10), variables],
    queryFn: () => {
      return fetcher({ query, variables });
    }
  });
};
