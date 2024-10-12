import { useEffect } from "react";
import { useCities } from "../../contexts/CityContext";
import styles from "./CityList.module.css";
import { formatDate } from "../../utils/globalFunctions";
import Button from "../FormComponents/Button";
import { useNavigate } from "react-router-dom";

const CityList = () => {
  const { cities, getCities } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCities = async () => {
      if (cities.length === 0) {
        await getCities();
      }
    };

    loadCities();
  }, [cities.length, getCities]);

  return (
    <ul className={styles.cityListContainer}>
      {cities.map((city) => (
        <li onClick={() => navigate(`${city.id}`)} className={styles.cityListItem} key={city.id}>
          <div className={styles.cityListItemInfo}>
            <p>{city.emoji}</p>
            <p>{city.cityName}</p>
          </div>
          <div className={styles.cityListItemInfo}>
            <p>({formatDate(city.date)})</p>
            <Button className={styles.removeBtn}>&times;</Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CityList;
