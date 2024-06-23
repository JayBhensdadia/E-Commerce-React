import React, { useEffect, useState } from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Button } from "./ui/button";
import CartItem from "./CartItem";
import { LoaderCircle, Maximize2, Truck } from "lucide-react";
import axios from "axios";
import { type Product } from "@/state/product/product-slice";
import { toast } from "sonner";
import { CardsPaymentMethod } from "./PaymentMethod";
import { useDispatch } from "react-redux";
import { togglePurchaseSuccess } from "@/state/purchase-success/purchase-success-slice";
import { toggle } from "@/state/sidebar/sidebar-slice";
import { clearMyCartAsyc } from "@/state/user/user-slice";
import { fetchCartItems } from "@/state/cart/cart-slice";
import { useNavigate } from "react-router-dom";

const CheckoutSidebar = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const [total, setTotal] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  return (
    <SheetContent className="font-sg">
      <SheetHeader>
        <div className="flex gap-1 items-center">
          <Button
            className="hover:scale-105"
            size="icon"
            variant="outline"
            onClick={async () => {
              dispatch(toggle());
              navigate("/checkout");
            }}
          >
            <Maximize2 className="h-5 w-5" />
          </Button>

          <SheetTitle className="font-sgb">Checkout</SheetTitle>
        </div>
        <SheetDescription>Let's get your order placed!</SheetDescription>
      </SheetHeader>

      <p className="pt-8 pb-2">Order summary:</p>
      <div className="h-full flex flex-col overflow-scroll no-scrollbar py-5 gap-3">
        {items.map((item) => (
          <CartItem key={item.productId} cartItem={item} />
        ))}

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

        <div className="mb-32">
          <CardsPaymentMethod isSidebar={true} />
        </div>

        {/* <Button
          className="mb-32"
          disabled={total === null || total === 0}
          onClick={async () => {
            dispatch(toggle());

            dispatch(togglePurchaseSuccess());
            await dispatch(clearMyCartAsyc());
            await dispatch(fetchCartItems());
          }}
        >
          <div className="flex gap-2 justify-center items-center">
            <p>Place Order</p>
            <Truck className="h-5 w-5" />
          </div>
        </Button> */}
      </div>
    </SheetContent>
  );
};

export default CheckoutSidebar;
