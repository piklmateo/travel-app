import { useEffect } from "react";
import { useCities } from "../../contexts/CityContext";
import styles from "./CountryList.module.css";

const CountryList = () => {
  const { cities, getCities } = useCities();

  useEffect(() => {
    const loadCities = async () => {
      if (cities.length === 0) {
        await getCities();
      }
    };

    loadCities();
  }, [cities.length, getCities]);

  return (
    <div>
      <ul className={styles.countriesGrid}>
        {cities.map((city) => (
          <li className={styles.countriesGridItem} key={city.id}>
            <p>{city.emoji}</p>
            <p>{city.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
