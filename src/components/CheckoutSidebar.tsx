import React, { useEffect } from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch } from "react-redux";
import { changeContent, toggle } from "@/state/sidebar/sidebar-slice";
import { toggleAuth } from "@/state/auth/auth-slice";
import { Button } from "./ui/button";
import { fetchUserDetails } from "@/state/user/user-slice";

const CheckoutSidebar = () => {
  // const user = useSelector((state: RootState) => state.user.data);
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const load = async () => {
  //     await dispatch(fetchUserDetails());
  //     if (!user) {
  //       await dispatch(toggle());
  //       await dispatch(toggleAuth());
  //     } else {
  //       await dispatch(changeContent("checkout"));
  //     }
  //   };

  //   load();
  // }, [user]);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Checkout Sidebar</SheetTitle>
      </SheetHeader>

      <Button>checkout</Button>
    </SheetContent>
  );
};

export default CheckoutSidebar;
