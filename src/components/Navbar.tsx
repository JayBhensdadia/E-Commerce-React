import { useScrollTop } from "@/hooks/scroll-to-top";
import { cn } from "@/lib/utils";
import { changeContent, toggle } from "@/state/sidebar/sidebar-slice";
import { AppDispatch, RootState } from "@/state/store";
import { House, Mail, ShoppingBag, ShoppingCartIcon, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { NavLinksDropDown } from "./NavLinksDropdown";

const Navbar = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={cn(
        "z-50 bg-background flex justify-between items-center w-full p-6 border-b shadow-sm dark:shadow-sm"
      )}
    >
      <div className="flex flex-row sm:gap-7 gap-3 items-center">
        <div className="text-2xl capitalize font-sgb flex gap-10">
          <a href="/">Haatdi</a>
        </div>

        <div className="sm:flex flex-row gap-5 font-sg hidden">
          <Link
            to="/home"
            className={cn(
              currentPath === "/home" && "bg-slate-300 dark:text-slate-950",
              "border-2 px-2 rounded-lg py-1"
            )}
          >
            <div className="flex gap-1 items-center justify-center">
              <House className="w-5 h-5" />
              <p>home</p>
            </div>
          </Link>
          <Link
            to="/orders"
            className={cn(
              currentPath === "/orders" && "bg-slate-300 dark:text-slate-950",
              "border-2 px-2 rounded-lg py-1"
            )}
          >
            <div className="flex gap-1 items-center">
              <ShoppingBag className="w-5 h-5" />
              <p>My Orders</p>
            </div>
          </Link>

          <Link
            to="/contact"
            className={cn(
              currentPath === "/contact" && "bg-slate-300 dark:text-slate-950",
              "border-2 px-2 rounded-lg py-1"
            )}
          >
            <div className="flex gap-1 items-center justify-center">
              <Mail className="w-5 h-5" />

              <p>Contact Us</p>
            </div>
          </Link>
        </div>

        <div className="sm:hidden">
          <NavLinksDropDown />
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <ModeToggle />
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              dispatch(changeContent("cart"));
              dispatch(toggle());
            }}
          >
            <ShoppingCartIcon className="primary" />
          </Button>
          {items.length > 0 && (
            <span className="w-5 h-5 bg-red-500 rounded-full text-white flex justify-center items-center absolute -top-2 -right-2">
              {items.length}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            dispatch(changeContent("user"));
            dispatch(toggle());
          }}
        >
          <User />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
