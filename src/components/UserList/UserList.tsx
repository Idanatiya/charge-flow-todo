import type { User } from "../../api/users";

import styles from "../UserList/styles.module.css";

type UserCardProps = {
  user: User;
  onShowTodos: () => void;
  isSelected: boolean;
};

export function UserCard({ user, onShowTodos, isSelected }: UserCardProps) {
  return (
    <li className={`${styles.card} ${isSelected ? styles.selected : ""}`}>
      <div className={styles.avatarContaier} data-name={user.username}>
        <img src={`https://robohash.org/${user.id}.png`} alt={user.name} />
      </div>
      <div className="">
        <div>Username: {user.username}</div>
        <div>Name: {user.name}</div>
        <button onClick={onShowTodos}>Show TODOs</button>
      </div>
    </li>
  );
}
