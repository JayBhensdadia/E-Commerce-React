import { togglePurchaseSuccess } from "@/state/purchase-success/purchase-success-slice";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Confetti from "react-confetti";

const PurchaseSuccessDialog = () => {
  const isDone = useSelector(
    (state: RootState) => state.purchaseSuccess.isDone
  );

  const dispatch = useDispatch<AppDispatch>();

  const [otp, setOtp] = useState<number | null>(null);

  useEffect(() => {
    const temp = Math.floor(1000 + Math.random() * 9000);
    setOtp(temp);
  }, [isDone]);

  useEffect(() => {}, []);

  return (
    <Dialog
      open={isDone}
      onOpenChange={() => dispatch(togglePurchaseSuccess())}
    >
      <DialogContent className="font-sg">
        <DialogHeader>
          <DialogTitle className="font-sgb">Congratulations 🎉</DialogTitle>
          <DialogDescription>
            The order has been sucessfully placed, and will arrive soon!
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-2 justify-center items-center">
          <p className="text-5xl">{otp}</p>
          <p className="font-sgmb">
            ⚠️ Keep this otp handy for recieving delivery!
          </p>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              dispatch(togglePurchaseSuccess());
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseSuccessDialog;
