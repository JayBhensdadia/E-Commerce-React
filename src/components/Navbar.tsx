import { useScrollTop } from "@/hooks/scroll-to-top";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon, User } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { changeContent, toggle } from "@/state/sidebar/sidebar-slice";
import { Input } from "./ui/input";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const scrolled = useScrollTop();
  const { id } = useParams();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex justify-between items-center w-full p-6",
        scrolled && "border-b shadow-sm dark:shadow-sm"
      )}
    >
      <div className="text-2xl capitalize font-sgb flex gap-10">
        <p>Haatdi</p>
        {id ? null : <Input placeholder="What are you looking for?" />}
      </div>
      <div className="flex gap-3">
        <ModeToggle />

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
