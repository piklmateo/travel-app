import { NavLink } from "react-router-dom";
import styles from "./LandingScreenNav.module.css";

const LandingScreenNav = () => {
  return (
    <div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink className={styles.navLink} to="/pricing">
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.navLink} to="/product">
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`btn btn-primary ${styles.navLink}`}
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LandingScreenNav;
