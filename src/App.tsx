import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<ProductPage />} path="/product" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<DashboardPage />} path="/app" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
