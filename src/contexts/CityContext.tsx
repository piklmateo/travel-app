import { createContext, useContext, useReducer, ReactNode, FormEvent, useCallback, useState } from "react";
import { deleteCity, fetchCities, fetchCity, insertCity } from "../services/cityService";

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
  id: string;
}

export interface NewCity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number | null;
    lng: number | null;
  };
}

const initialState = {
  cities: [] as City[],
  currentCity: null as City | null,
};

type Action = { type: "cities/loaded"; payload: City[] } | { type: "cities/add"; payload: City } | { type: "city/remove"; payload: string } | { type: "city/loaded"; payload: City };

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
      };
    case "cities/add":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
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
  getCity: (id: string) => Promise<void>;
  handleInsertCity: (city: NewCity) => Promise<void>;
  handleDeleteCity: (id: string, e: FormEvent) => Promise<void>;
  handleCloseSidebar: () => void;
  isOpen: boolean;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

interface CitiesProviderProps {
  children: ReactNode;
}

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [{ cities, currentCity }, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const getCities = useCallback(async () => {
    try {
      const data = await fetchCities();
      dispatch({ type: "cities/loaded", payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: "cities/loaded", payload: [] });
    }
  }, [dispatch]);

  const getCity = async (id: string) => {
    const data = await fetchCity(id);
    dispatch({ type: "city/loaded", payload: data });
  };

  const handleInsertCity = async (newCity: NewCity) => {
    const res = await insertCity(newCity);
    if (res) {
      const updatedCities = await fetchCities();
      dispatch({ type: "cities/loaded", payload: updatedCities });
    }
  };

  const handleDeleteCity = async (id: string, e: FormEvent) => {
    e.stopPropagation();
    const res = await deleteCity(id);
    if (res) {
      dispatch({ type: "city/remove", payload: id });
    }
  };

  const handleCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        dispatch,
        getCities,
        getCity,
        handleInsertCity,
        handleDeleteCity,
        handleCloseSidebar,
        isOpen,
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
