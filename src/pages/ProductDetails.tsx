import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomImage from "@/components/CustomImage";
import Navbar from "@/components/Navbar";
import { Product, fetchProductById } from "@/state/product/product-slice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector(
    (state: RootState) => state.products.selectedProduct
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center dark:bg-[#1F1F1F] no-scrollbar">
      <Navbar />

      {!product ? (
        <div>Invalid product ID</div>
      ) : (
        <div className="w-full px-20 flex gap-5 ">
          <div className="w-[500px] aspect-square">
            <CustomImage url={product.image} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
            <p className="text-lg font-semibold">${product.price}</p>
            <Button>Add to cart</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
