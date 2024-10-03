import styles from "./Pricing.module.css";
import pricingImg from "../../assets/img-1.jpg";
import LandingScreenHeader from "../LandingScreen/LandingScreenHeader";

const Pricing = () => {
  return (
    <div className={styles.pricingContainer}>
      <div className="landingScreenContainer">
        <LandingScreenHeader />

        <div className={styles.pricingGrid}>
          <img
            className={styles.pricingImg}
            src={pricingImg}
            alt="pricing-img"
          />
          <div className={styles.pricingContent}>
            <h1>Simple pricing. Just $9/month.</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
              vel labore mollitia iusto. Recusandae quos provident, laboriosam
              fugit voluptatem iste.
            </p>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};

export default Pricing;
