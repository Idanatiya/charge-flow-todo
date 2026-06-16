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
      <div className={styles.cardContent}>
        <div className={styles.avatarContaier}>
          <img src={`https://robohash.org/${user.id}.png`} alt={user.name} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.infoLine}>Username: {user.username}</div>
          <div className={styles.infoLine}>Name: {user.name}</div>
        </div>
      </div>
      <button className={styles.showTodosButton} onClick={onShowTodos}>
        Show TODOs
      </button>
    </li>
  );
}
