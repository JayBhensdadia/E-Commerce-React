import React from "react";
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
import { changeAuthContent, toggleAuth } from "@/state/auth/auth-slice";
import { toggle } from "@/state/sidebar/sidebar-slice";

const UserSidebar = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>User Sidebar</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>

      {!user ? <div>plase login</div> : <div>{JSON.stringify(user)}</div>}

      <Button
        onClick={() => {
          dispatch(changeAuthContent("signin"));
          dispatch(toggle());
          dispatch(toggleAuth());
        }}
      >
        Login
      </Button>
    </SheetContent>
  );
};

export default UserSidebar;
