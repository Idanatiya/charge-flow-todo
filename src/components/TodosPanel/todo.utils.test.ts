import type { Todo } from "../../types/todo";
import { getTodoStats } from "./todo.utils";

const todos = [
  { id: 1, userId: 1, title: "Todo 1", completed: false },
  { id: 2, userId: 1, title: "Todo 2", completed: true },
  { id: 3, userId: 1, title: "Todo 3", completed: true },
] as Todo[];

describe("getTodoStats", () => {
  it("returns zero completed when no todos are completed", () => {
    expect(getTodoStats([todos[0]])).toEqual({
      completed: 0,
      incomplete: 1,
      total: 1,
    });
  });

  it("returns completed, incomplete, and total counts", () => {
    expect(getTodoStats(todos)).toEqual({
      completed: 2,
      incomplete: 1,
      total: 3,
    });
  });

  it("returns zeros for an empty list", () => {
    expect(getTodoStats([])).toEqual({
      completed: 0,
      incomplete: 0,
      total: 0,
    });
  });
});
