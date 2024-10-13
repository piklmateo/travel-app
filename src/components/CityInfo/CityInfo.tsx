import { useEffect } from "react";
import { useCities } from "../../contexts/CityContext";
import styles from "./CityInfo.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../FormComponents/Button";
import { formatDate } from "../../utils/globalFunctions";

const CityInfo = () => {
  const navigate = useNavigate();
  const { getCity, currentCity } = useCities();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadCityData = async () => {
      if (id && (!currentCity || currentCity.id?.toString() !== id)) {
        try {
          await getCity(id);
        } catch (error) {
          console.error("Failed to fetch city data:", error);
        }
      }
    };
    loadCityData();
  }, [getCity, id, currentCity]);

  return (
    <div className={styles.cityInfoContainer}>
      <div className={styles.infoGroup}>
        <p>City name</p>
        <p>{currentCity?.cityName}</p>
      </div>
      <div className={styles.infoGroup}>
        <p>You went to {currentCity?.cityName} on</p>
        <p>{formatDate(currentCity?.date) || ""}</p>
      </div>
      <div className={styles.infoGroup}>
        <p>Your notes</p>
        <p>{currentCity?.notes}</p>
      </div>
      <div className={styles.infoGroup}>
        <p>Learn more</p>
        <p>{currentCity?.emoji}</p>
      </div>
      <Button className={`btn ${styles.btnBack}`} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default CityInfo;
