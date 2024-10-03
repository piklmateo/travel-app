import styles from "./Product.module.css";
import productImg from "../../assets/img-2.jpg";
import LandingScreenHeader from "../LandingScreen/LandingScreenHeader";

const Product = () => {
  return (
    <div className={styles.productContainer}>
      <div className="landingScreenContainer">
        <LandingScreenHeader />
        <div className={styles.productGrid}>
          <div className={styles.productContent}>
            <h1>About WorldWide.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
              dicta illum vero culpa cum quaerat architecto sapiente eius non
              soluta, molestiae nihil laborum, placeat debitis, laboriosam at
              fuga perspiciatis?
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              doloribus libero sunt expedita ratione iusto, magni, id sapiente
              sequi officiis et.
            </p>
          </div>
          <img
            className={styles.productImg}
            src={productImg}
            alt="product-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
