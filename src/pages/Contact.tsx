import Navbar from "@/components/Navbar";
import React from "react";
import ContactUs from "../assets/images/contactus.svg";
import { Input } from "@/components/ui/input";
import { Building, MapPin } from "lucide-react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const Contact = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center font-sg ">
      <Navbar />

      <p className="flex-1 flex flex-row gap-10 justify-center items-center py-10">
        <div className="flex flex-col gap-10">
          <p className="text-3xl">Reach out to us!</p>
          <div className="flex flex-col gap-2 justify-center items-center border-2 rounded-lg py-5 px-2 cursor-pointer hover:scale-105 transition-transform">
            <Building className="w-10 h-10" />
            <p className="font-sgmb">Company Info:</p>
            <p>Jay Bhensdadia LLC</p>
            <p>Tax Id: IND12342324</p>
          </div>

          {/* <div className='flex flex-col gap-2 justify-center items-center border-2 rounded-lg py-5 px-2 cursor-pointer hover:scale-105 transition-transform'>
                        <MapPin className='w-10 h-10' />
                        <p className='font-sgmb'>Address:</p>
                        <p>52/3 CHH Type Sector 20, Gandhinagar</p>
                        <p>Gujarat, India. Pin Code: 382020</p>
                    </div> */}

          <div className="flex flex-col gap-2 justify-center items-center border-2 rounded-lg py-5 px-2 cursor-pointer hover:scale-105 transition-transform">
            <MapPin className="w-10 h-10" />
            <p className="font-sgmb">Call us:</p>
            <p>We are always happy to help.</p>
            <p>+(91)786-5060-345</p>
          </div>
        </div>
        <div className="hidden lg:block lg:w-[600px] justify-center items-center mt-7">
          <img src={ContactUs} alt="" />
        </div>
      </p>

      <Footer />
      <Sidebar />
    </div>
  );
};

export default Contact;
