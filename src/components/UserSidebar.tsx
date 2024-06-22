import React from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";

const UserSidebar = () => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>User Sidebar</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default UserSidebar;
