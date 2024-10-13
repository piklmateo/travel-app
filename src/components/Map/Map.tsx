import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CityContext";

const Map = () => {
  const navigate = useNavigate();
  const { cities, getCities } = useCities();
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCityPosition, setSelectedCityPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

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
      setSelectedCityPosition(selectedCity);
    }
  }, [lat, lng]);

  const SelectedMarker = () => {
    useMapEvents({
      click(e) {
        const newPosition = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        setSelectedPosition(newPosition);
        navigate(`new?lat=${newPosition.lat.toString()}&lng=${newPosition.lng.toString()}`);
      },
    });

    return selectedPosition && lat && lng ? (
      <Marker position={[Number(lat), Number(lng)]}>
        <Popup>nekvi popup</Popup>
      </Marker>
    ) : null;
  };

  function ChangeCenter({ position }) {
    const map = useMap();
    if (position) {
      map.setView(position);
    }
    return null;
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={
          selectedCityPosition
            ? [selectedCityPosition.lat, selectedCityPosition.lng]
            : [52.32191088594773, 13.403320312500002]
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
        <ChangeCenter position={selectedCityPosition} />
      </MapContainer>
    </div>
  );
};

export default Map;
