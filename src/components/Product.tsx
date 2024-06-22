import React from "react";

interface ProductProps {
  name: string;
  description: string;
  price: number;
  image: string;
}
const Product = ({ name, description, price, image }: ProductProps) => {
  return (
    <div className="border-2 rounded-lg flex flex-col gap-5 cursor-pointer hover:scale-105 transition-transform max-w-[250px]">
      <img
        src={image}
        alt="product"
        className="flex-1 rounded-tl-lg rounded-tr-lg"
      />
      <div className="flex justify-between py-2 px-5">
        <p className="text-lg font-bold">{name}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default Product;
