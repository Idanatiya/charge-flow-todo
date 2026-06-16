import { useUsers } from "../components/UserList/useUsers";
import styles from "../components/UserList/styles.module.css";
import { UserCard } from "../components/UserList/UserList";
import { useCallback } from "react";
import { TodosPanel } from "../components/TodosPanel/TodosPanel";
import { useSearchParams } from "react-router";

function useUserSelection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedUserId = searchParams.get("userId")
    ? Number(searchParams.get("userId"))
    : null;

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

  // onClick i need to fetch the related todos of the specific user

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
