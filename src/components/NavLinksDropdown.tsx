import { Ellipsis, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme-provider";
import { useNavigate } from "react-router-dom";

export function NavLinksDropDown() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/home")} className="font-sg">
          Home
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("/orders")}
          className="font-sg"
        >
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("/contact")}
          className="font-sg"
        >
          Contact Us
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
