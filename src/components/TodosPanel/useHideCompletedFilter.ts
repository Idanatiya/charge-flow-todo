import { useCallback } from "react";
import { useSearchParams } from "react-router";
import {
  getIsHideCompleted,
  toggleHideCompletedParam,
} from "./hideCompletedFilter.utils";

export function useHideCompletedFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const hideCompleted = getIsHideCompleted(searchParams);

  const toggleHideCompleted = useCallback(() => {
    setSearchParams((prevParams) => toggleHideCompletedParam(prevParams));
  }, [setSearchParams]);

  return [hideCompleted, toggleHideCompleted] as const;
}
