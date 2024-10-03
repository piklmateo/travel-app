import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<ProductPage />} path="/product" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
