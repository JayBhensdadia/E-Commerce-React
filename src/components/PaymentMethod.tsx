import { AppDispatch } from "@/state/store";
import { Banknote, ScrollText, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toggle } from "@/state/sidebar/sidebar-slice";
import { clearMyCartAsyc } from "@/state/user/user-slice";
import { fetchCartItems } from "@/state/cart/cart-slice";
import { togglePurchaseSuccess } from "@/state/purchase-success/purchase-success-slice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().nonempty("Name cannot be empty"),
  city: z.string().nonempty("City cannot be empty"),
  pincode: z
    .string()
    .nonempty("Pincode cannot be empty")
    .regex(/^\d{6}$/, "Pincode must be a 6-digit number"),
});

type FormData = z.infer<typeof formSchema>;

export function CardsPaymentMethod({ isSidebar }: { isSidebar: boolean }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  useEffect(() => {
    // Watch form fields to trigger validation
    watch();
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    navigate("/home");
    if (isSidebar) {
      dispatch(toggle());
    }
    await dispatch(clearMyCartAsyc());
    await dispatch(fetchCartItems());
    dispatch(togglePurchaseSuccess());
  };

  return (
    <Card className="dark:bg-[#1F1F1F]">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Select a payment method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem
              value="card"
              id="card"
              className="peer sr-only"
              aria-label="Card"
            />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-center"
            >
              <Banknote className="mb-3 h-6 w-6" />
              Cash on Delivery
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="cheque"
              id="cheque"
              className="peer sr-only"
              aria-label="Cheque"
            />
            <Label
              htmlFor="cheque"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-center"
            >
              <ScrollText className="mb-3 h-6 w-6" />
              Cheque on Delivery
            </Label>
          </div>
        </RadioGroup>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="First Last" {...register("name")} />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="" {...register("city")} />
            {errors.city && (
              <p className="text-red-600 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" placeholder="" {...register("pincode")} />
            {errors.pincode && (
              <p className="text-red-600 text-sm">{errors.pincode.message}</p>
            )}
          </div>
          <Button type="submit">
            <div className="flex gap-2 justify-center items-center">
              <p>Place Order</p>
              <Truck className="h-5 w-5" />
            </div>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
