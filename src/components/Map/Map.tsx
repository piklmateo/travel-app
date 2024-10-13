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
    } else {
      console.error("User position is undefined");
      setSelectedPosition(null);
    }
  };

  return (
    <div className={styles.mapContainer}>
      <Button onClick={handleUserPosition} className={`btn btn-primary ${styles.btnPosition} `}>
        Use your position
      </Button>
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
