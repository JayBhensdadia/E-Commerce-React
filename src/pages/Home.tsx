import AuthDialog from "@/components/AuthDialog";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import PurchaseSuccessDialog from "@/components/PurchaseSuccessDialog";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center dark:bg-[#1F1F1F] no-scrollbar">
      <Navbar />
      <ProductList />
      <Sidebar />
      <AuthDialog />
      <PurchaseSuccessDialog />
    </div>
  );
};

export default Home;
