import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CityContext";

const Map = () => {
  const navigate = useNavigate();
  const { cities, getCities } = useCities();
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lang = searchParams.get("lng");

  useEffect(() => {
    const loadCities = async () => {
      await getCities();
    };

    loadCities();
  }, [getCities]);

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

    return selectedPosition && lat && lang ? (
      <Marker position={[Number(lat), Number(lang)]}>
        <Popup>nekvi popup</Popup>
      </Marker>
    ) : null;
  };

  return (
    <div className={styles.mapContainer}>
      <MapContainer className={styles.map} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cities === undefined || cities.length > 0
          ? cities.map((city) => (
              <Marker key={city.id} position={[city.position.lat!, city.position.lng!]}>
                <Popup>{city.cityName}</Popup>
              </Marker>
            ))
          : null}

        <SelectedMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
