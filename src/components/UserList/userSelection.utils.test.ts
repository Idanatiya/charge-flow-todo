import { expectNone, expectSome } from "../../test/test-utils";
import { routes } from "../../config/routes";
import type { User } from "../../types/user";
import {
  findUserById,
  getSelectedUserIdOption,
  parseUserId,
  setUserIdParam,
} from "./userSelection.utils";

const users = [
  { id: 1, name: "Idan", username: "idan_wolf" },
  { id: 2, name: "Noa", username: "noa_gold" },
] as User[];

describe("parseUserId", () => {
  it.each([
    ["1", 1],
    ["42", 42],
  ])('parses "%s" as %i', (value, expected) => {
    expectSome(parseUserId(value), expected);
  });

  it.each(["", "   ", "abc", "0", "-1", "1.5"])(
    'returns none for invalid value "%s"',
    (value) => {
      expectNone(parseUserId(value));
    },
  );
});

describe("getSelectedUserIdOption", () => {
  it("returns none when userId param is missing", () => {
    expectNone(getSelectedUserIdOption(new URLSearchParams()));
  });

  it("returns some when userId param is valid", () => {
    expectSome(
      getSelectedUserIdOption(
        new URLSearchParams(`${routes.searchParams.userId}=2`),
      ),
      2,
    );
  });

  it("returns none when userId param is invalid", () => {
    expectNone(
      getSelectedUserIdOption(
        new URLSearchParams(`${routes.searchParams.userId}=abc`),
      ),
    );
  });
});

describe("findUserById", () => {
  it("returns the matching user", () => {
    expectSome(findUserById(users)(2), users[1]);
  });

  it("returns none when user id is not found", () => {
    expectNone(findUserById(users)(999));
  });

  it("returns none when users array is empty", () => {
    expectNone(findUserById([])(1));
  });
});

describe("setUserIdParam", () => {
  it("sets the userId param", () => {
    const params = setUserIdParam(new URLSearchParams(), 3);

    expect(params.get(routes.searchParams.userId)).toBe("3");
  });

  it("clears hideCompleted when selecting a user", () => {
    const params = setUserIdParam(
      new URLSearchParams(`${routes.searchParams.hideCompleted}=true`),
      2,
    );

    expect(params.get(routes.searchParams.userId)).toBe("2");
    expect(params.has(routes.searchParams.hideCompleted)).toBe(false);
  });
});
