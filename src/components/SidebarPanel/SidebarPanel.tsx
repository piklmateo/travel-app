import { NavLink } from "react-router-dom";
import styles from "./SidebarPanel.module.css";

const SidebarPanel = () => {
  return (
    <div className={styles.sidebarPanelContainer}>
      <nav className={styles.sidebarPaneNavigation}>
        <ul>
          <li>
            <NavLink className={styles.navLink} to="/cities">
              Cities
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.navLink} to="/countries">
              Countries
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.sidebarContent}>Content</div>
    </div>
  );
};

export default SidebarPanel;
