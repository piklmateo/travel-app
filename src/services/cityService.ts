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
  }
};

export const fetchCity = async (id: number) => {
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
