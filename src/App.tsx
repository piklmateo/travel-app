import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import { CitiesProvider } from "./contexts/CityContext";
import CityForm from "./components/CityForm/CityForm";
import CityInfo from "./components/CityInfo/CityInfo";

function App() {
  return (
    <div>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route element={<PricingPage />} path="/pricing" />
            <Route element={<ProductPage />} path="/product" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<DashboardPage />} path="/app">
              <Route index element={<Navigate replace to="cities" />} />
              <Route element={<CityList />} path="cities" />
              <Route element={<CityInfo />} path="cities/:id" />
              <Route element={<CountryList />} path="countries" />
              <Route element={<CityForm />} path="new" />
            </Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </div>
  );
}

export default App;
