import { useEffect } from "react";
import { useCities } from "../../contexts/CityContext";
import styles from "./CountryList.module.css";

const CountryList = () => {
  const { cities, getCities } = useCities();

  useEffect(() => {
    const loadCities = async () => {
      await getCities();
    };

    loadCities();
  }, [getCities]);

  return (
    <div>
      {!cities || cities.length > 0 ? (
        <ul className={styles.countriesGrid}>
          {cities.map((city) => (
            <li className={styles.countriesGridItem} key={city.id}>
              <p>{city.emoji}</p>
              <p>{city.country}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="center">
          <p>No countries available.</p>
          <p>Start exploring.</p>
        </div>
      )}
    </div>
  );
};

export default CountryList;
