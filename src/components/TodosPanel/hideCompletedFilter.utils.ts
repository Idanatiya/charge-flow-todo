import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { routes } from "../../config/routes";

const HIDE_COMPLETED_ENABLED = "true";

export const getIsHideCompleted = (params: URLSearchParams): boolean =>
  pipe(
    O.fromNullable(params.get(routes.searchParams.hideCompleted)),
    O.match(
      () => false,
      (value) => value === HIDE_COMPLETED_ENABLED,
    ),
  );

export const toggleHideCompletedParam = (
  params: URLSearchParams,
): URLSearchParams => {
  const nextParams = new URLSearchParams(params);

  pipe(getIsHideCompleted(nextParams), (isHidden) => {
    if (isHidden) {
      nextParams.delete(routes.searchParams.hideCompleted);
    } else {
      nextParams.set(routes.searchParams.hideCompleted, HIDE_COMPLETED_ENABLED);
    }
  });

  return nextParams;
};
