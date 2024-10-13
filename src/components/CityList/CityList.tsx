import { FormEvent, useEffect } from "react";
import { useCities } from "../../contexts/CityContext";
import styles from "./CityList.module.css";
import { formatDate } from "../../utils/globalFunctions";
import Button from "../FormComponents/Button";
import { useNavigate } from "react-router-dom";

const CityList = () => {
  const { cities, getCities, handleDeleteCity } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCities = async () => {
      await getCities();
    };

    loadCities();
  }, [getCities]);

  return (
    <ul className={styles.cityListContainer}>
      {cities === undefined || cities.length > 0 ? (
        cities.map((city) => (
          <li
            onClick={() =>
              navigate(`${city.id}?lat=${city.position.lat?.toString()}&lng=${city.position.lng?.toString()}`)
            }
            className={styles.cityListItem}
            key={city.id}
          >
            <div className={styles.cityListItemInfo}>
              <p>{city.emoji}</p>
              <p>{city.cityName}</p>
            </div>
            <div className={styles.cityListItemInfo}>
              <p>({formatDate(city.date)})</p>
              <Button onClick={(e: FormEvent) => handleDeleteCity(city.id, e)} className={styles.removeBtn}>
                &times;
              </Button>
            </div>
          </li>
        ))
      ) : (
        <div className="center">
          <p>No cities available.</p>
          <p>Start exploring.</p>
        </div>
      )}
    </ul>
  );
};

export default CityList;
