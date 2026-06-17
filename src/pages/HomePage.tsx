import { TodosPanel } from "../components/TodosPanel/TodosPanel";
import { UserList } from "../components/UserList/UserList";
import { useUserSelection } from "../components/UserList/useUserSelection";
import { useUsers } from "../api/users";
import { Placeholder } from "../components/ui/Placeholder/Placeholder";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { data: users = [], isPending, isError } = useUsers();
  const [selectedUser, selectUser] = useUserSelection(users);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className={styles.page}>
      <UserList
        users={users}
        selectedUserId={selectedUser?.id ?? null}
        onSelectUser={selectUser}
      />
      <div className={styles.todosSection}>
        {selectedUser ? (
          <TodosPanel
            username={selectedUser.username}
            key={selectedUser.id}
            selectedUserId={selectedUser.id}
          />
        ) : (
          <Placeholder>Select a user to see their todos</Placeholder>
        )}
      </div>
    </div>
  );
}
