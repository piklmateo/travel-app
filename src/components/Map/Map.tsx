import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CityContext";
import Button from "../FormComponents/Button";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useURLLocation } from "../../hooks/useUrlLocation";

const Map = () => {
  const navigate = useNavigate();
  const { cities, getCities } = useCities();
  const { position, getPosition } = useGeolocation();
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const { lat, lng } = useURLLocation();
  const [isInfoDisplayed, setIsInfoDisplayed] = useState<boolean>(false);

  useEffect(() => {
    const loadCities = async () => {
      await getCities();
    };

    loadCities();
  }, [getCities]);

  useEffect(() => {
    if (lat && lng) {
      const selectedCity = {
        lat: Number(lat),
        lng: Number(lng),
      };
      setSelectedPosition(selectedCity);
    } else {
      setSelectedPosition(null);
    }
  }, [lat, lng]);

  const SelectedMarker = () => {
    const map = useMapEvents({
      click(e) {
        const newPosition = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        setSelectedPosition(newPosition);
        setIsInfoDisplayed(false);
        navigate(`new?lat=${newPosition.lat.toString()}&lng=${newPosition.lng.toString()}`);
      },
    });

    useEffect(() => {
      if (selectedPosition) {
        map.setView(selectedPosition);
      }
    }, [map]);

    return selectedPosition ? (
      <Marker position={[selectedPosition.lat, selectedPosition.lng]}>
        <Popup>Selected Position</Popup>
      </Marker>
    ) : null;
  };

  const handleUserPosition = () => {
    getPosition();

    if (position?.lat && position?.lng) {
      const userPosition = {
        lat: position.lat,
        lng: position.lng,
      };
      setSelectedPosition(userPosition);
      setIsInfoDisplayed(false);
    } else {
      console.error("User position is undefined");
      setSelectedPosition(null);
    }
  };

  const handleInfoButton = () => {
    setIsInfoDisplayed(!isInfoDisplayed);
  };

  return (
    <div className={styles.mapContainer}>
      <Button onClick={handleUserPosition} className={`btn btn-primary ${styles.btnPosition} `}>
        Use your position
      </Button>

      <svg
        fill="#aaa"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 416.979 416.979"
        className={styles.btnInfo}
        onClick={handleInfoButton}
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"></path>{" "}
          </g>
        </g>
      </svg>

      <div className={`${styles.infoContainer} ${isInfoDisplayed ? styles.show : styles.hide}`}>
        To add new cities to the city list click on the desired city on the map
      </div>

      <MapContainer
        className={styles.map}
        center={
          selectedPosition ? [selectedPosition.lat, selectedPosition.lng] : [52.32191088594773, 13.403320312500002]
        }
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.length > 0 &&
          cities.map((city) => (
            <Marker key={city.id} position={[city.position.lat!, city.position.lng!]}>
              <Popup>{city.cityName}</Popup>
            </Marker>
          ))}
        <SelectedMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
