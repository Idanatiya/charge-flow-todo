import { act, renderHook } from "@testing-library/react";

import { createMemoryRouterWrapper } from "../../test/test-utils";
import { useHideCompletedFilter } from "./useHideCompletedFilter";

describe("useHideCompletedFilter", () => {
  it("defaults to false when hideCompleted param is missing", () => {
    const { result } = renderHook(() => useHideCompletedFilter(), {
      wrapper: createMemoryRouterWrapper("/"),
    });

    const [isHideCompleted] = result.current;

    expect(isHideCompleted).toBe(false);
  });

  it("returns true when hideCompleted param is true", () => {
    const { result } = renderHook(() => useHideCompletedFilter(), {
      wrapper: createMemoryRouterWrapper("/?hideCompleted=true"),
    });

    const [isHideCompleted] = result.current;

    expect(isHideCompleted).toBe(true);
  });

  it("toggles hideCompleted on and off", () => {
    const { result } = renderHook(() => useHideCompletedFilter(), {
      wrapper: createMemoryRouterWrapper("/"),
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });
});
