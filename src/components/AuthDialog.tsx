import { AppDispatch, RootState } from "@/state/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "./ui/dialog";
import { useDispatch } from "react-redux";
import { changeAuthContent, toggleAuth } from "@/state/auth/auth-slice";
import Home from "@/pages/Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthDialog = () => {
  const isOpen = useSelector((state: RootState) => state.auth.isOpen);
  const content = useSelector((state: RootState) => state.auth.content);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => console.log("loading auth dialog..."), []);
  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(toggleAuth())}>
      {content === "signin" && <SignIn />}
      {content === "signup" && <SignUp />}
    </Dialog>
  );
};

export default AuthDialog;
