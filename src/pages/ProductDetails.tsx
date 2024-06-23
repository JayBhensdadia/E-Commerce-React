import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomImage from "@/components/CustomImage";
import Navbar from "@/components/Navbar";
import { Product, fetchProductById } from "@/state/product/product-slice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  addToCartAsync,
  fetchCartItems,
} from "@/state/cart/cart-slice";
import Sidebar from "@/components/Sidebar";
import AuthDialog from "@/components/AuthDialog";
import PurchaseSuccessDialog from "@/components/PurchaseSuccessDialog";

const ProductDetails = () => {
  const { id } = useParams();

  const product = useSelector(
    (state: RootState) => state.products.selectedProduct
  );
  const user = useSelector((state: RootState) => state.user.data);
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
        <div className="w-full px-20 flex flex-col md:flex-row gap-5 items-center">
          <div className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] aspect-square">
            <CustomImage url={product.image} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
            <p className="text-lg font-semibold">${product.price}</p>
            <Button
              onClick={async () => {
                if (user) {
                  await dispatch(
                    addToCartAsync({
                      userId: user._id,
                      productId: product._id,
                      quantity: 1,
                    })
                  );
                  await dispatch(fetchCartItems());
                } else {
                  dispatch(
                    addToCart({
                      userId: "",
                      productId: product._id,
                      quantity: 1,
                    })
                  );
                }
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      )}

      <Sidebar />
      <AuthDialog />
      <PurchaseSuccessDialog />
    </div>
  );
};

export default ProductDetails;
