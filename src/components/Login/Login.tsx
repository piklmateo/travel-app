import { FormEvent, useState } from "react";
import LandingScreenHeader from "../LandingScreen/LandingScreenHeader";
import styles from "./Login.module.css";
import { handleLogin } from "../../services/userService";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = {
    username: username,
    password: password,
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await handleLogin(user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className="landingScreenContainer">
        <LandingScreenHeader />
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" disabled={isLoading ? true : false}>
            {isLoading ? "Submiting" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
