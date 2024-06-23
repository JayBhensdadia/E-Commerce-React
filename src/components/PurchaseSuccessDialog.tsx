import { togglePurchaseSuccess } from "@/state/purchase-success/purchase-success-slice";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect } from "react";
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

const PurchaseSuccessDialog = () => {
  const isDone = useSelector(
    (state: RootState) => state.purchaseSuccess.isDone
  );

  const dispatch = useDispatch<AppDispatch>();
  console.log("inside purchase success dialog");

  return (
    <Dialog
      open={isDone}
      onOpenChange={() => dispatch(togglePurchaseSuccess())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Congratulations 🎉</DialogTitle>
          <DialogDescription>
            The order has been sucessfully placed! And will arrive soon!
          </DialogDescription>
        </DialogHeader>
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
