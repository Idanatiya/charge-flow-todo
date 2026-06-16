import { QueryClient } from "@tanstack/react-query";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

// Explicitly ensure 'Promise<A>' is the return type
export async function toQueryFn<A>(
  taskEither: TE.TaskEither<Error, A>,
): Promise<A> {
  const result = await taskEither();

  if (E.isLeft(result)) {
    throw result.left;
  }

  return result.right;
}
