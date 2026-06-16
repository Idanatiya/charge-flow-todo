import { useUsers } from "../components/UserList/useUsers";
import styles from "../components/UserList/styles.module.css";
import { UserCard } from "../components/UserList/UserList";
import { useCallback } from "react";
import { TodosPanel } from "../components/TodosPanel/TodosPanel";
import { useSearchParams } from "react-router";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import type { User } from "../api/users";
import { useMemo } from "react";

const USER_ID_PARAM = "userId";

const parseUserId = (value: string): O.Option<number> =>
  pipe(
    Number(value),
    O.fromPredicate((value) => Number.isInteger(value)),
  );

const getSelectedUserIdOption = (params: URLSearchParams): O.Option<number> =>
  pipe(O.fromNullable(params.get(USER_ID_PARAM)), O.chain(parseUserId));

const findUserById =
  (users: User[]) =>
  (userId: number): O.Option<User> =>
    pipe(
      users,
      A.findFirst((user) => user.id === userId),
    );

function useUserSelection(users: User[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedUser = useMemo(
    () =>
      pipe(
        getSelectedUserIdOption(searchParams),
        O.chain(findUserById(users)),
        O.toNullable,
      ),
    [searchParams, users],
  );

  const selectUser = useCallback(
    (userId: number) => {
      setSearchParams((prevParams) => {
        const nextParams = new URLSearchParams(prevParams);
        nextParams.set(USER_ID_PARAM, String(userId));
        return nextParams;
      });
    },
    [setSearchParams],
  );

  return [selectedUser, selectUser] as const;
}
export default function HomePage() {
  const { data: users = [], isPending, isError } = useUsers();
  const [selectedUser, selectUser] = useUserSelection(users);

  if (isPending) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minHeight: "100%",
        padding: "16px",
      }}
    >
      <ul className={styles.cardContainer}>
        {users.map((user) => (
          <UserCard
            isSelected={user.id === selectedUser?.id}
            key={user.id}
            user={user}
            onShowTodos={() => selectUser(user.id)}
          />
        ))}
      </ul>
      {selectedUser && (
        <TodosPanel
          username={selectedUser.username}
          key={selectedUser.id}
          selectedUserId={selectedUser.id}
        />
      )}
    </div>
  );
}
