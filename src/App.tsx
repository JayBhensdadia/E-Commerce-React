import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Landing from "./pages/Landing";
import CheckoutPage from "./pages/Checkout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default App;
