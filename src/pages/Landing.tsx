import Navbar from "@/components/Navbar";
import React from "react";
import HeroImage from "../assets/images/shopping.svg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center dark:bg-[#1F1F1F] no-scrollbar font-sg">
      <Navbar />
      <div className="flex-1 mx-20 flex justify-center items-center">
        <div className="flex-1 flex flex-col sm:flex-row gap-20 justify-center items-center">
          <img
            src={HeroImage}
            className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
          />
          <div className="flex flex-col gap-5">
            <p className="text-8xl sm:text-[10rem] font-sg">Haatdi</p>
            <p className="text-3xl">
              One stop solution for all your daily needs!
            </p>
            <Button
              className="flex gap-2 justify-center items-center hover:scale-105 transition-transform text-xl py-5"
              onClick={() => {
                navigate("/home");
              }}
            >
              <p>Happy shopping</p>
              <ArrowRight className="h-7 w-7" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
