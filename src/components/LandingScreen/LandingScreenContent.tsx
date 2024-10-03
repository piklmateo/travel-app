import styles from "./LandingScreenContent.module.css";

const LandingScreenContent = () => {
  return (
    <div className={styles.landingScreenContentContainer}>
      <h1>You travel the world. WorldWise keeps track of your adventures.</h1>
      <h3>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus quis
        consectetur non adipisci pariatur. Laborum libero inventore modi
        architecto sit delectus. Rem officia consequatur cupiditate beatae
        suscipit expedita est odit.
      </h3>
      <button className="btn btn-primary">START TRACKING NOW</button>
    </div>
  );
};

export default LandingScreenContent;
