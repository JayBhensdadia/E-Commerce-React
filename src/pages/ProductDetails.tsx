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
import { ShoppingCart } from "lucide-react";
import Footer from "@/components/Footer";

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
    <div className="w-full h-screen flex flex-col items-center dark:bg-[#1F1F1F] no-scrollbar relative">
      <Navbar />

      {!product ? (
        <div className="flex-1">Invalid product ID</div>
      ) : (
        <div className="flex-1 w-full px-10 py-20 sm:px-20 flex flex-col md:flex-row gap-16 items-center font-sg ">
          <div className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] aspect-square rounded-lg overflow-clip shadow-2xl">
            <CustomImage url={product.image} />
          </div>
          <div className="w-full flex flex-col gap-5 self-start">
            <h1 className="text-4xl font-sgb">{product.name}</h1>
            <hr />
            <p className="text-lg">{product.description}</p>
            <p className="text-3xl font-sgb">${product.price}</p>
            <Button
              className="max-w-[300px]"
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
              <div className="flex gap-2 items-center justify-center">
                <p>Add to cart</p>
                <ShoppingCart className="h-5 w-5" />
              </div>
            </Button>
          </div>
        </div>
      )}

      <Sidebar />
      <AuthDialog />
      <PurchaseSuccessDialog />
      <Footer />
    </div>
  );
};

export default ProductDetails;
