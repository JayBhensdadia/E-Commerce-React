import AuthDialog from "@/components/AuthDialog";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import PurchaseSuccessDialog from "@/components/PurchaseSuccessDialog";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center no-scrollbar relative">
      <Navbar />
      <ProductList />
      <Footer />
      <Sidebar />
      <AuthDialog />
      <PurchaseSuccessDialog />
    </div>
  );
};

export default Home;
