import React from "react";
import CustomImage from "./CustomImage";
import { Button } from "./ui/button";

interface ProductProps {
  name: string;
  description: string;
  price: number;
  image: string;
}
const Product = ({ name, description, price, image }: ProductProps) => {
  return (
    <div className="flex-1 border-2 rounded-lg flex flex-col gap-2 cursor-pointer hover:scale-105 transition-transform max-w-[500px] font-sg">
      <div className="flex-1 rounded-tl-lg rounded-tr-lg aspect-square overflow-clip dark:opacity-80">
        <CustomImage url={image} />
      </div>
      <div className="flex flex-col justify-between py-2 px-5">
        <p className="text-lg">{name}</p>
        <p className="font-sgmb text-lg">${price}</p>
      </div>
    </div>
  );
};

export default Product;
