import type { User } from "../../types/user";
import { List } from "../ui/List/List";
import { UserCard } from "./UserCard";
import styles from "./UserList.module.css";

type UserListProps = {
  users: User[];
  selectedUserId: number | null;
  onSelectUser: (userId: number) => void;
};

export function UserList({
  users,
  selectedUserId,
  onSelectUser,
}: UserListProps) {
  return (
    <List className={styles.cardContainer}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={user.id === selectedUserId}
          onShowTodos={() => onSelectUser(user.id)}
        />
      ))}
    </List>
  );
}
