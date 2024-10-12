import { NavLink, Outlet } from "react-router-dom";
import styles from "./SidebarPanel.module.css";

const SidebarPanel = () => {
  return (
    <div className={styles.sidebarPanelContainer}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="cities">Cities</NavLink>
          </li>
          <li>
            <NavLink to="countries">Countries</NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.sidebarContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarPanel;
