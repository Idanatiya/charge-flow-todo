import { Outlet } from "react-router";
import styles from "./styles.module.css";

export default function RootLayout() {
  return (
    <div className={styles.wrapper}>
      <TheSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function TheSidebar() {
  return (
    <nav className={styles.sidebarContainer}>
      <div className="logoContainer">
        <img />
      </div>
    </nav>
  );
}
