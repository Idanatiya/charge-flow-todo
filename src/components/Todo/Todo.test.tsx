import { render, screen } from "@testing-library/react";

import type { Todo as TodoType } from "../../types/todo";
import { Todo } from "./Todo";

const todo: TodoType = {
  id: 1,
  userId: 1,
  title: "Buy groceries",
  completed: true,
};

describe("Todo", () => {
  it("renders the todo title and completed state", () => {
    render(<Todo todo={todo} />);

    const checkbox = screen.getByRole("checkbox", { name: "Buy groceries" });
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
  });
});
