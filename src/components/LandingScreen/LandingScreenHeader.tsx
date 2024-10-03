import { Link } from "react-router-dom";
import LandingScreenNav from "./LandingScreenNav";
import logo from "../../assets/logo.png";
import styles from "./LandingScreenHeader.module.css";

const LandingScreenHeader = () => {
  return (
    <div className={styles.landingScreenHeaderContainer}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <LandingScreenNav />
    </div>
  );
};

export default LandingScreenHeader;
