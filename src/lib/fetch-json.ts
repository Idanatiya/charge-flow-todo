import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

export const fetchJson = <A>(
  url: string,
  signal?: AbortSignal,
): TE.TaskEither<Error, A> =>
  pipe(
    TE.tryCatch(
      () => fetch(url, { signal }),
      (reason) => new Error(String(reason)),
    ),
    TE.chain((response) =>
      response.ok
        ? TE.right(response)
        : TE.left(new Error(`HTTP ${response.status}`)),
    ),
    TE.chain((response) =>
      TE.tryCatch<Error, A>(
        () => response.json(),
        (reason) => new Error(String(reason)),
      ),
    ),
  );
