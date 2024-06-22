import { useScrollTop } from "@/hooks/scroll-to-top";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { changeContent, toggle } from "@/state/sidebar/sidebar-slice";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex justify-between items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div>LOGO</div>
      <div className="flex gap-3">
        <ModeToggle />
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
