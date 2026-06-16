import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as O from "fp-ts/Option";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";

export function createMemoryRouterWrapper(initialUrl: string) {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialUrl]}>{children}</MemoryRouter>
  );
}

export function createQueryClientWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function expectSome<T>(option: O.Option<T>, expected: T) {
  expect(O.isSome(option)).toBe(true);

  if (O.isSome(option)) {
    expect(option.value).toEqual(expected);
  }
}

export function expectNone(option: O.Option<unknown>) {
  expect(O.isNone(option)).toBe(true);
}
