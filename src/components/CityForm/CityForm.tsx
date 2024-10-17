import { useNavigate } from "react-router-dom";
import Button from "../FormComponents/Button";
import styles from "./CityForm.module.css";
import { FormEvent, useEffect, useState } from "react";
import { NewCity, useCities } from "../../contexts/CityContext";
import { useURLLocation } from "../../hooks/useURLLocation";

const CityForm = () => {
  const navigate = useNavigate();
  const { handleInsertCity, selectedCity } = useCities();
  const [cityName, setCityName] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const { lat, lng: lang } = useURLLocation();

  useEffect(() => {
    if (selectedCity) {
      setCityName(selectedCity.city);
      setCountryName(selectedCity.countryName);
    }
  }, [selectedCity]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newCity: NewCity = {
      cityName: cityName,
      country: countryName,
      emoji: selectedCity?.countryCode,
      date: date,
      notes: info,
      position: {
        lat: Number(lat),
        lng: Number(lang),
      },
    };

    await handleInsertCity(newCity);
    navigate("/app/cities");
  };

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    navigate("/app/cities");
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="cityName">City name</label>
          <input
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="country">Country name</label>
          <input
            onChange={(e) => setCountryName(e.target.value)}
            value={countryName}
            type="text"
            name="country"
            id="country"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="date">Date</label>
          <input onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="info">Additional information</label>
          <textarea onChange={(e) => setInfo(e.target.value)} name="info" id="info"></textarea>
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
