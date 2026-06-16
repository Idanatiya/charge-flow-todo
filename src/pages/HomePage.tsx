import { useUsers } from "../components/UserList/useUsers";
import styles from "../components/UserList/styles.module.css";
import { UserCard } from "../components/UserList/UserList";
import { useCallback } from "react";
import { TodosPanel } from "../components/TodosPanel/TodosPanel";
import { useSearchParams } from "react-router";
import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";

const USER_ID_PARAM = "userId";

const parseUserId = (value: string): O.Option<number> =>
  pipe(
    Number(value),
    O.fromPredicate((value) => Number.isInteger(value)),
  );

const getSelectedUserId = (params: URLSearchParams): number | null =>
  pipe(
    O.fromNullable(params.get(USER_ID_PARAM)),
    O.chain(parseUserId),
    O.match(
      () => null,
      (userId) => userId,
    ),
  );

function useUserSelection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedUserId = getSelectedUserId(searchParams);

  const selectUser = useCallback(
    (userId: number) => {
      setSearchParams({ userId: String(userId) });
    },
    [setSearchParams],
  );

  return {
    selectedUserId,
    selectUser,
  };
}
export default function HomePage() {
  const { data: users, isPending, isError } = useUsers();
  const { selectedUserId, selectUser } = useUserSelection();

  if (isPending) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <ul className={styles.cardContainer}>
        {users.map((user) => (
          <UserCard
            isSelected={user.id === selectedUserId}
            key={user.id}
            user={user}
            onShowTodos={() => selectUser(user.id)}
          />
        ))}
      </ul>
      {selectedUserId !== null && (
        <TodosPanel key={selectedUserId} selectedUserId={selectedUserId} />
      )}
    </>
  );
}
