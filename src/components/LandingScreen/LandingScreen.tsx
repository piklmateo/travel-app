import styles from "./LandingScreen.module.css";
import LandingScreenContent from "./LandingScreenContent";
import LandingScreenHeader from "./LandingScreenHeader";

export default function LandingScreen() {
  return (
    <main className={styles.backgroundImage}>
      <div className={styles.after}></div>
      <div className={styles.landingScreenContainer}>
        <LandingScreenHeader />
        <LandingScreenContent />
      </div>
    </main>
  );
}
