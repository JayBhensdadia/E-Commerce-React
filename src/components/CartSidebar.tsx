import React, { useEffect } from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import {
  deleteCartItemAsync,
  deleteProductFromCart,
  fetchCartItems,
  loadCart,
  reduceCartItemQuantityAsync,
  reduceQuantity,
  syncCart,
} from "@/state/cart/cart-slice";
import { changeContent } from "@/state/sidebar/sidebar-slice";
import { fetchUserDetails } from "@/state/user/user-slice";
import { toggleAuth } from "@/state/auth/auth-slice";
import CartItem from "./CartItem";
import EmptyCartImage from "../assets/images/empty-cart.svg";

const CartSidebar = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const load = async () => {
      if (user) {
        await dispatch(syncCart());
        await dispatch(fetchCartItems());
      } else {
        await dispatch(fetchUserDetails());

        if (!user) {
          await dispatch(loadCart());
        }
      }
    };

    load();
  }, [user]);
  return (
    <SheetContent className="font-sg">
      <SheetHeader>
        <SheetTitle className="font-sgb">Cart</SheetTitle>
        <SheetDescription>
          {items.length != 0 ? "Great choices!" : "Keep shoping!"}
        </SheetDescription>
      </SheetHeader>

      <div className="h-full flex flex-col overflow-scroll no-scrollbar py-5 gap-3">
        {items.length === 0 && (
          <div className="flex-1 flex justify-center items-center">
            <img src={EmptyCartImage} alt="" className="w-[250px]" />
          </div>
        )}

        {items.map((item) => {
          return <CartItem cartItem={item} />;
        })}

        {items.length !== 0 && (
          <Button
            className="mb-32"
            onClick={async () => {
              if (user) {
                await dispatch(changeContent("checkout"));
              } else {
                await dispatch(toggleAuth());
              }
            }}
          >
            Checkout
          </Button>
        )}
      </div>
    </SheetContent>
  );
};

export default CartSidebar;
