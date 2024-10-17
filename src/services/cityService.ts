import { NewCity } from "../contexts/CityContext";

export const fetchCities = async () => {
  try {
    const res = await fetch("http://localhost:9000/cities");

    if (!res.ok) {
      throw new Error("Error fetching cities");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCity = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:9000/cities/${id}`);

    if (!res.ok) {
      throw new Error("Error fetching cities");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const insertCity = async (city: NewCity) => {
  try {
    const res = await fetch(`http://localhost:9000/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(city),
    });

    if (!res.ok) {
      throw new Error("Error inserting city");
    }

    const data = await res.json();

    console.log("data: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCity = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:9000/cities/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error deleting city");
    }

    const data = await res.json();

    console.log("data: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
export const fetchCityByLatLang = async (lat: string | null, lang: string | null) => {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lang}`
    );

    if (!res.ok) {
      throw new Error("Couldn't fetch city by lat and lang");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
