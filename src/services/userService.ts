interface LoginCredentials {
  username: string;
  password: string;
}

export const handleLogin = async (user: LoginCredentials) => {
  try {
    const res = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error("Something went wrong...");
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
