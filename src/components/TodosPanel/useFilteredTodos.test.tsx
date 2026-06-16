import { act, renderHook } from "@testing-library/react";

import { createMemoryRouterWrapper } from "../../test/test-utils";
import type { Todo } from "../../types/todo";
import { useFilteredTodos } from "./useFilteredTodos";

const todos = [
  { id: 1, userId: 1, title: "Todo 1", completed: false },
  { id: 2, userId: 1, title: "Todo 2", completed: true },
  { id: 3, userId: 1, title: "Todo 3", completed: false },
] as Todo[];

describe("useFilteredTodos", () => {
  it("returns all todos when hide completed filter is off", () => {
    const { result } = renderHook(() => useFilteredTodos(todos), {
      wrapper: createMemoryRouterWrapper("/"),
    });

    expect(result.current.filteredTodos).toEqual(todos);
    expect(result.current.isHideCompleted).toBe(false);
  });

  it("hides completed todos when hideCompleted param is true", () => {
    const { result } = renderHook(() => useFilteredTodos(todos), {
      wrapper: createMemoryRouterWrapper("/?hideCompleted=true"),
    });

    expect(result.current.filteredTodos).toEqual([todos[0], todos[2]]);
    expect(result.current.isHideCompleted).toBe(true);
  });

  it("updates filtered todos when toggling hide completed", () => {
    const { result } = renderHook(() => useFilteredTodos(todos), {
      wrapper: createMemoryRouterWrapper("/"),
    });

    expect(result.current.filteredTodos).toEqual(todos);

    act(() => {
      result.current.onToggleHideCompleted();
    });

    expect(result.current.filteredTodos).toEqual([todos[0], todos[2]]);
    expect(result.current.isHideCompleted).toBe(true);

    act(() => {
      result.current.onToggleHideCompleted();
    });

    expect(result.current.filteredTodos).toEqual(todos);
    expect(result.current.isHideCompleted).toBe(false);
  });
});
