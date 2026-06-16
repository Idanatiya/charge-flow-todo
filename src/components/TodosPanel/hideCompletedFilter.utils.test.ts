import { routes } from "../../config/routes";
import {
  getIsHideCompleted,
  toggleHideCompletedParam,
} from "./hideCompletedFilter.utils";

describe("getIsHideCompleted", () => {
  it("returns false when hideCompleted param is missing", () => {
    expect(getIsHideCompleted(new URLSearchParams())).toBe(false);
  });

  it("returns true when hideCompleted param is true", () => {
    expect(
      getIsHideCompleted(
        new URLSearchParams(`${routes.searchParams.hideCompleted}=true`),
      ),
    ).toBe(true);
  });

  it.each(["false", "other"])(
    'returns false when hideCompleted param is "%s"',
    (value) => {
      expect(
        getIsHideCompleted(
          new URLSearchParams(`${routes.searchParams.hideCompleted}=${value}`),
        ),
      ).toBe(false);
    },
  );
});

describe("toggleHideCompletedParam", () => {
  it("sets hideCompleted to true when filter is off", () => {
    const nextParams = toggleHideCompletedParam(new URLSearchParams());

    expect(nextParams.get(routes.searchParams.hideCompleted)).toBe("true");
  });

  it("removes hideCompleted param when filter is on", () => {
    const nextParams = toggleHideCompletedParam(
      new URLSearchParams(`${routes.searchParams.hideCompleted}=true`),
    );

    expect(nextParams.has(routes.searchParams.hideCompleted)).toBe(false);
  });
});
