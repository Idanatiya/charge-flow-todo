import { NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={styles.wrapper}>
      <TheSidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

function TheSidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.logoLabel}>Todos exercise</span>
        <span>Idan Atiya</span>
      </div>
      <nav>
        <NavLink end to="/">
          Home
        </NavLink>
      </nav>
    </div>
  );
}
