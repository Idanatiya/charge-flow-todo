import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

import { useUsers } from "../api/users";
import { TodosPanel } from "../components/TodosPanel/TodosPanel";
import { UserList } from "../components/UserList/UserList";
import { useUserSelection } from "../components/UserList/useUserSelection";
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

  const usersOption = pipe(
    users,
    O.fromPredicate((users) => users.length > 0),
  );

  return (
    <div className={styles.page}>
      {pipe(
        usersOption,
        O.match(
          () => <Placeholder>No users found</Placeholder>,
          (users) => (
            <>
              <UserList
                users={users}
                selectedUserId={pipe(
                  selectedUser,
                  O.map((user) => user.id),
                  O.toNullable,
                )}
                onSelectUser={selectUser}
              />
              <div className={styles.todosSection}>
                {pipe(
                  selectedUser,
                  O.match(
                    () => (
                      <Placeholder>
                        Select a user to see their todos
                      </Placeholder>
                    ),
                    (user) => (
                      <TodosPanel
                        selectedUserId={user.id}
                        username={user.username}
                      />
                    ),
                  ),
                )}
              </div>
            </>
          ),
        ),
      )}
    </div>
  );
}
