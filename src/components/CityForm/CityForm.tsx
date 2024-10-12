import { useNavigate } from "react-router-dom";
import Button from "../FormComponents/Button";
import styles from "./CityForm.module.css";
import { FormEvent } from "react";

const CityForm = () => {
  const navigate = useNavigate();

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    navigate("/app/cities");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("ADDED!");
  };

  return (
    <div>
      <form className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="cityName">City name</label>
          <input type="text" name="cityName" id="cityName" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="country">Country name</label>
          <input type="text" name="country" id="country" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="info">Additional information</label>
          <textarea name="info" id="info"></textarea>
        </div>

        <div className={styles.formButtonsContainer}>
          <Button onClick={handleCancel} className={`btn ${styles.btnCancel}`}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="btn btn-primary">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CityForm;
