import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import { Sidebar } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center dark:bg-[#1F1F1F] no-scrollbar">
      <Navbar />
      <ProductList />
      <Sidebar />
    </div>
  );
};

export default Home;
