import { useUsers } from "../components/UserList/useUsers";
import { TodosPanel } from "../components/TodosPanel/TodosPanel";
import useUserSelection from "../components/UserList/useUserSelection";
import { UserList } from "../components/UserList/UserList";
import { Placeholder } from "../components/ui/Placeholder/Placeholder";

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
        flex: 1,
        minHeight: 0,
        padding: "16px",
      }}
    >
      <UserList
        users={users}
        selectedUserId={selectedUser?.id ?? null}
        onSelectUser={selectUser}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
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
