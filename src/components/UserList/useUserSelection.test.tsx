import { act, renderHook } from "@testing-library/react";

import { routes } from "../../config/routes";
import {
  createMemoryRouterWrapper,
  expectNone,
  expectSome,
} from "../../test/test-utils";
import type { User } from "../../types/user";
import { useUserSelection } from "./useUserSelection";

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
  it("returns none when userId param does not exist", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper(routes.home.path),
    });

    const [selectedUser] = result.current;

    expectNone(selectedUser);
  });

  it("returns the selected user when userId param matches a user", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper(
        `${routes.home.path}?${routes.searchParams.userId}=2`,
      ),
    });

    const [selectedUser] = result.current;

    expectSome(selectedUser, users[1]);
  });

  it("returns none when userId param does not match any user", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper(
        `${routes.home.path}?${routes.searchParams.userId}=999`,
      ),
    });

    const [selectedUser] = result.current;

    expectNone(selectedUser);
  });

  it("returns none when userId param is not a number", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper(
        `${routes.home.path}?${routes.searchParams.userId}=abc`,
      ),
    });

    const [selectedUser] = result.current;

    expectNone(selectedUser);
  });

  it("selects a user", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper(routes.home.path),
    });

    const [initialSelectedUser, selectUser] = result.current;

    expectNone(initialSelectedUser);

    act(() => {
      selectUser(3);
    });

    const [selectedUser] = result.current;

    expectSome(selectedUser, users[2]);
  });

  it("replaces the selected user when selecting another user", () => {
    const { result } = renderHook(() => useUserSelection(users), {
      wrapper: createMemoryRouterWrapper(
        `${routes.home.path}?${routes.searchParams.userId}=1`,
      ),
    });

    const [initialSelectedUser, selectUser] = result.current;

    expectSome(initialSelectedUser, users[0]);

    act(() => {
      selectUser(2);
    });

    const [selectedUser] = result.current;

    expectSome(selectedUser, users[1]);
  });
});
