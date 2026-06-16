import {
  expectNone,
  expectSome,
} from "../../test/test-utils";
import type { User } from "../../types/user";
import {
  findUserById,
  getSelectedUserIdOption,
  parseUserId,
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
      getSelectedUserIdOption(new URLSearchParams("userId=2")),
      2,
    );
  });

  it("returns none when userId param is invalid", () => {
    expectNone(getSelectedUserIdOption(new URLSearchParams("userId=abc")));
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
