import { createContext, useContext, useReducer, ReactNode } from "react";
import { fetchCities, fetchCity } from "../services/cityService";

export interface City {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number | null;
    lng: number | null;
  };
  id: number | null;
}

const initialState = {
  cities: [] as City[],
  currentCity: null as City | null,
};

type Action = { type: "cities/loaded"; payload: City[] } | { type: "city/add"; payload: City } | { type: "city/remove"; payload: number } | { type: "city/loaded"; payload: City };

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
      };

    case "city/add":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case "city/remove":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    default:
      throw new Error("Unknown action type");
  }
};

interface CitiesContextType {
  cities: City[];
  currentCity: City | null;
  dispatch: React.Dispatch<Action>;
  getCities: () => Promise<void>;
  getCity: (id: number) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

interface CitiesProviderProps {
  children: ReactNode;
}

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [{ cities, currentCity }, dispatch] = useReducer(reducer, initialState);

  const getCities = async () => {
    const data = await fetchCities();
    dispatch({ type: "cities/loaded", payload: data });
  };

  const getCity = async (id: number) => {
    const data = await fetchCity(id);
    dispatch({ type: "city/loaded", payload: data });
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        dispatch,
        getCities,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
