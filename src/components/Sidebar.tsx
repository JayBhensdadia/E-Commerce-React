import { AppDispatch, RootState } from "@/state/store";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toggle } from "@/state/sidebar/sidebar-slice";
import CartSidebar from "./CartSidebar";
import UserSidebar from "./UserSidebar";
import CheckoutSidebar from "./CheckoutSidebar";

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const content = useSelector((state: RootState) => state.sidebar.content);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(toggle())}>
      {content === "cart" && <CartSidebar />}
      {content === "user" && <UserSidebar />}
      {content === "checkout" && <CheckoutSidebar />}
    </Sheet>
  );
};

export default Sidebar;
