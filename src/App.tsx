import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center dark:bg-[#1F1F1F] no-scrollbar">
      <Navbar />
      <ProductList />
      <Sidebar />
    </div>
  );
};

export default App;
