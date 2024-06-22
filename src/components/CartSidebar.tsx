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
  deleteProductFromCart,
  loadCart,
  reduceQuantity,
} from "@/state/cart/cart-slice";

const CartSidebar = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadCart());
  }, []);
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Cart Sidebar</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-col">
        {items.map((item) => {
          return (
            <div key={item.productId} className="flex flex-col border-2">
              <p>{item.productId}</p>
              <p>{item.userId}</p>
              <p>{item.quantity}</p>
              <Button
                variant="destructive"
                onClick={() => dispatch(deleteProductFromCart(item.productId))}
              >
                delete item
              </Button>

              <Button
                variant="destructive"
                onClick={() => dispatch(reduceQuantity(item.productId))}
              >
                -
              </Button>
            </div>
          );
        })}
      </div>
    </SheetContent>
  );
};

export default CartSidebar;
