import { useUsers } from "../components/UserList/useUsers";
import styles from "../components/UserList/styles.module.css";
import { UserCard } from "../components/UserList/UserCard";
import { TodosPanel } from "../components/TodosPanel/TodosPanel";
import useUserSelection from "../components/UserList/useUserSelection";

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
