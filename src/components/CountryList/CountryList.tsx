import { useEffect } from "react";
import { useCities } from "../../contexts/CityContext";
import styles from "./CountryList.module.css";
import { ScaleLoader } from "react-spinners";

const CountryList = () => {
  const { cities, getCities, isLoading } = useCities();

  useEffect(() => {
    const loadCities = async () => {
      await getCities();
    };

    loadCities();
  }, [getCities]);

  if (isLoading) {
    return (
      <div className={styles.cityListContainer}>
        <ScaleLoader color="#ffb545" />
      </div>
    );
  }

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
