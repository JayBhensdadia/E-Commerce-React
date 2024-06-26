import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";

import { LoaderCircle, Truck } from "lucide-react";
import axios from "axios";
import { type Product } from "@/state/product/product-slice";
import { toast } from "sonner";

import { useDispatch } from "react-redux";
import { togglePurchaseSuccess } from "@/state/purchase-success/purchase-success-slice";
import { clearMyCartAsyc, fetchUserDetails } from "@/state/user/user-slice";
import { fetchCartItems } from "@/state/cart/cart-slice";
import CartItem from "@/components/CartItem";
import { CardsPaymentMethod } from "@/components/PaymentMethod";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Payment from "../assets/images/payment.svg";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/login.svg";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const CheckoutPage = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const items = useSelector((state: RootState) => state.cart.items);
  const [total, setTotal] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      await dispatch(fetchUserDetails());
      await dispatch(fetchCartItems());
    };
    load();
  }, []);

  useEffect(() => {
    const calculate = async () => {
      console.log("Calculating your total...");

      try {
        const productPromises = items.map(async (item) => {
          const res = await axios({
            method: "get",
            withCredentials: true,
            url: `http://localhost:8080/api/product/${item.productId}`,
          });
          const product: Product = res.data.product;
          return product.price * item.quantity;
        });

        const productTotals = await Promise.all(productPromises);
        const tempTotal = productTotals.reduce((acc, curr) => acc + curr, 0);
        console.log("Total:", tempTotal);
        setTotal(tempTotal);
      } catch (error) {
        toast.error("Error in calculating your bill, try again in some time");
      }
    };

    calculate();
  }, [items]);

  if (!user) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center font-sg">
        <Navbar />
        <div className="flex-1 flex flex-col gap-10 justify-center items-center">
          <img src={LoginImage} alt="" className="w-[350px]" />
          <p className="text-5xl">Please Login!</p>
        </div>
        <Footer />
        <Sidebar />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col font-sg ">
      <Navbar />
      <div className="flex-1 flex justify-center items-center py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* image */}
          <div className="flex flex-col gap-5 items-center justify-center">
            <div className="hidden lg:block lg:w-[300px] justify-center self-start mt-7">
              <img src={Payment} alt="" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          </div>

          {/* order summary */}
          <div className="flex flex-col gap-2 p-2">
            <p className="pb-2">Order summary:</p>
            <div className="flex-1 p-2 flex flex-col overflow-scroll no-scrollbar">
              {items.map((item) => (
                <CartItem key={item.productId} cartItem={item} />
              ))}
            </div>

            <div className="text-2xl py-5 flex gap-2">
              Total:
              {total === null ? (
                <div className="flex items-center">
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  <p className="text-sm">Calculating...</p>
                </div>
              ) : (
                <p className="font-sgmb bg-slate-200 dark:bg-slate-600 px-2 rounded-md">
                  $ {total.toFixed(3)}
                </p>
              )}
            </div>
          </div>

          {/* payment method */}
          <div className=" flex flex-col gap-3">
            {total === null ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CardsPaymentMethod isSidebar={false} total={total} />
            )}

            {/* <Button
              className="mb-32"
              disabled={total === null || total === 0}
              onClick={async () => {
                navigate("/home");
                await dispatch(clearMyCartAsyc());
                await dispatch(fetchCartItems());
                dispatch(togglePurchaseSuccess());
              }}
            >
              <div className="flex gap-2 justify-center items-center">
                <p>Place Order</p>
                <Truck className="h-5 w-5" />
              </div>
            </Button> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
