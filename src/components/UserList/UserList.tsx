import type { User } from "../../types/user";
import { UserCard } from "./UserCard";
import styles from "./styles.module.css";

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
    <ul className={styles.cardContainer}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={user.id === selectedUserId}
          onShowTodos={() => onSelectUser(user.id)}
        />
      ))}
    </ul>
  );
}
