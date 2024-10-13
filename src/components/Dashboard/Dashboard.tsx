import SidebarPanel from "../SidebarPanel/SidebarPanel";
import Map from "../Map/Map";
import styles from "./Dashboard.module.css";
import { useSidebar } from "../../contexts/SidebarContext";

const Dashboard = () => {
  const { isOpen } = useSidebar();

  return (
    <div className={isOpen ? styles.dashboardContainer : styles.dashboardContainerClosed}>
      <SidebarPanel />
      <Map />
    </div>
  );
};

export default Dashboard;
