import { useEffect } from "react";
import { City, useCities } from "../../contexts/CityContext";
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
  type CountryList = { country: string; emoji: string };

  const countries = cities.reduce((arr: CountryList[], city: City) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, [] as CountryList[]);

  console.log(countries);

  if (isLoading) {
    return (
      <div className={styles.cityListContainer}>
        <ScaleLoader color="#ffb545" />
      </div>
    );
  }

  return (
    <div>
      {!countries || countries.length > 0 ? (
        <ul className={styles.countriesGrid}>
          {countries.map((city) => (
            <li className={styles.countriesGridItem} key={city.country}>
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
