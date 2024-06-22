import AuthDialog from "@/components/AuthDialog";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center dark:bg-[#1F1F1F] no-scrollbar">
      <Navbar />
      <ProductList />
      <Sidebar />
      <AuthDialog />
    </div>
  );
};

export default Home;
