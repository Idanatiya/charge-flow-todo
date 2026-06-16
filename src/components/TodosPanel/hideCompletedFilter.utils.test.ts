import {
  getIsHideCompleted,
  HIDE_COMPLETED_PARAM,
  toggleHideCompletedParam,
  TRUE,
} from "./hideCompletedFilter.utils";

describe("getIsHideCompleted", () => {
  it("returns false when hideCompleted param is missing", () => {
    expect(getIsHideCompleted(new URLSearchParams())).toBe(false);
  });

  it("returns true when hideCompleted param is true", () => {
    expect(
      getIsHideCompleted(new URLSearchParams(`${HIDE_COMPLETED_PARAM}=${TRUE}`)),
    ).toBe(true);
  });

  it.each(["false", "other"])(
    'returns false when hideCompleted param is "%s"',
    (value) => {
      expect(
        getIsHideCompleted(
          new URLSearchParams(`${HIDE_COMPLETED_PARAM}=${value}`),
        ),
      ).toBe(false);
    },
  );
});

describe("toggleHideCompletedParam", () => {
  it("sets hideCompleted to true when filter is off", () => {
    const nextParams = toggleHideCompletedParam(new URLSearchParams());

    expect(nextParams.get(HIDE_COMPLETED_PARAM)).toBe(TRUE);
  });

  it("removes hideCompleted param when filter is on", () => {
    const nextParams = toggleHideCompletedParam(
      new URLSearchParams(`${HIDE_COMPLETED_PARAM}=${TRUE}`),
    );

    expect(nextParams.has(HIDE_COMPLETED_PARAM)).toBe(false);
  });
});
