import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Landing from "./pages/Landing";
import CheckoutPage from "./pages/Checkout";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";


//root component of react application
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
    </Routes>
  );
};

export default App;
