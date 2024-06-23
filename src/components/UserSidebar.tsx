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
import { changeAuthContent, toggleAuth } from "@/state/auth/auth-slice";
import { toggle } from "@/state/sidebar/sidebar-slice";
import { fetchUserDetails, logoutUser } from "@/state/user/user-slice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserSidebar = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  return (
    <SheetContent className="font-sg">
      <SheetHeader>
        <SheetTitle className="font-sgb">Hello 👋 </SheetTitle>
        <SheetDescription>How are you doing today?</SheetDescription>
      </SheetHeader>

      {/* {!user ? <div>plase login</div> : <div>{JSON.stringify(user)}</div>} */}

      <div className="flex-1 flex flex-col gap-5 justify-start items-start pt-5">
        <Avatar className="w-20 h-20 border-2">
          <AvatarImage src={user?.profilePicture ?? ""} />
          <AvatarFallback className="font-sgb">
            <p className="text-2xl">U</p>
          </AvatarFallback>
        </Avatar>

        <div className="w-full flex gap-14 justify-start">
          <p className=" text-slate-500">email</p>
          <p>{!user ? "Guest User" : user.email}</p>
        </div>

        <div className="w-full flex gap-6 justify-start text-sm">
          <p className=" text-slate-500">created-at</p>
          <p>{!user ? "N/A" : user.createdAt?.toString()}</p>
        </div>

        <div className="w-full flex gap-6 justify-start text-sm">
          <p className=" text-slate-500">created-at</p>
          <p>{!user ? "N/A" : user.updatedAt?.toString()}</p>
        </div>

        {!user ? (
          <div className="flex gap-3">
            <Button
              onClick={() => {
                dispatch(changeAuthContent("signin"));
                dispatch(toggle());
                dispatch(toggleAuth());
              }}
            >
              Signin
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                dispatch(changeAuthContent("signup"));
                dispatch(toggle());
                dispatch(toggleAuth());
              }}
            >
              Signup
            </Button>
          </div>
        ) : (
          <Button
            onClick={async () => {
              dispatch(toggle());
              await dispatch(logoutUser());
              await dispatch(fetchUserDetails());
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </SheetContent>
  );
};

export default UserSidebar;
