import SidebarPanel from "../SidebarPanel/SidebarPanel";
import Map from "../Map/Map";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <SidebarPanel />
      <Map />
    </div>
  );
};

export default Dashboard;
