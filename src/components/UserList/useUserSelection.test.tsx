import { act, renderHook } from "@testing-library/react";

import { createMemoryRouterWrapper } from "../../test/test-utils";
import { useUserSelection } from "./useUserSelection";
import type { User } from "../../types/user";

const users = [
  {
    id: 1,
    name: "Idan",
    username: "idan_wolf",
  },
  {
    id: 2,
    name: "Noa",
    username: "noa_gold",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
  },
] as User[];

describe("useUserSelection", () => {
  it("returns null when userId param does not exist", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper("/"),
    });

    const [selectedUser] = result.current;

    expect(selectedUser).toBeNull();
  });

  it("returns the selected user when userId param matches a user", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper("/?userId=2"),
    });

    const [selectedUser] = result.current;

    expect(selectedUser).toEqual(users[1]);
  });

  it("returns null when userId param does not match any user", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper("/?userId=999"),
    });

    const [selectedUser] = result.current;

    expect(selectedUser).toBeNull();
  });

  it("returns null when userId param is not a number", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper("/?userId=abc"),
    });

    const [selectedUser] = result.current;

    expect(selectedUser).toBeNull();
  });

  it("selects a user", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper("/"),
    });

    const [initialSelectedUser, selectUser] = result.current;

    expect(initialSelectedUser).toBeNull();

    act(() => {
      selectUser(3);
    });

    const [selectedUser] = result.current;

    expect(selectedUser).toEqual(users[2]);
  });

  it("replaces the selected user when selecting another user", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper("/?userId=1"),
    });

    const [initialSelectedUser, selectUser] = result.current;

    expect(initialSelectedUser).toEqual(users[0]);

    act(() => {
      selectUser(2);
    });

    const [selectedUser] = result.current;

    expect(selectedUser).toEqual(users[1]);
  });
});
