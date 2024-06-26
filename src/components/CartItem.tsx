import {
  addToCart,
  addToCartAsync,
  deleteCartItemAsync,
  deleteProductFromCart,
  fetchCartItems,
  reduceCartItemQuantityAsync,
  reduceQuantity,
  type CartItem,
} from "@/state/cart/cart-slice";
import { Product } from "@/state/product/product-slice";
import React, { useEffect, useState } from "react";
import CustomImage from "./CustomImage";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { LoaderCircle, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import axios from "axios";

const CartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const [product, setProduct] = useState<null | undefined | Product>(null);
  const products = useSelector((state: RootState) => state.products.value);
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(products);
    console.log("item._id = ", cartItem.productId);

    const temp = products.find((item) => item._id === cartItem.productId);
    console.log(temp);

    if (temp) {
      setProduct(temp);
      return;
    }

    const load = async () => {
      console.log("fetching product from server");

      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:8080/api/product/${cartItem.productId}`,
          withCredentials: true,
        });
        setProduct(res.data.product);
      } catch (error) {
        console.log("error in fetching product from server");
      }
    };

    load();
  }, [products, cartItem]);

  if (!product) {
    return (
      <div className="flex gap-2">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        <p>loading product...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 relative border-2 rounded-md items-center">
      {/* image */}
      <div className="w-24 h-24 rounded-md overflow-clip m-3">
        <CustomImage url={product.image} />
      </div>

      {/* details */}
      <div className="flex flex-col py-2 gap-3 text-sm">
        <p>{product.name}</p>
        <p className="font-sgb">$ {product.price}</p>
        <div className="flex justify-between gap-5 pr-2">
          <div className="flex gap-1 self-start">
            <Button
              variant="outline"
              size="icon"
              onClick={async () => {
                if (user) {
                  await dispatch(
                    addToCartAsync({
                      userId: user._id,
                      productId: cartItem.productId,
                      quantity: 1,
                    })
                  );
                  await dispatch(fetchCartItems());
                  return;
                } else {
                  dispatch(
                    addToCart({
                      userId: "",
                      productId: cartItem.productId,
                      quantity: 1,
                    })
                  );
                  return;
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <p className="w-9 border-2 aspect-square rounded-md flex justify-center items-center">
              {cartItem.quantity}
            </p>

            <Button
              variant="outline"
              size="icon"
              onClick={async () => {
                if (user) {
                  await dispatch(
                    reduceCartItemQuantityAsync({
                      itemId: cartItem.productId,
                      userId: user._id,
                      quantity: cartItem.quantity,
                    })
                  );

                  await dispatch(fetchCartItems());
                  return;
                } else {
                  dispatch(reduceQuantity(cartItem.productId));
                  return;
                }
              }}
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="destructive"
            size="icon"
            onClick={async () => {
              if (user) {
                await dispatch(
                  deleteCartItemAsync({
                    itemId: cartItem.productId,
                    userId: user._id,
                  })
                );
                await dispatch(fetchCartItems());
                return;
              } else {
                dispatch(deleteProductFromCart(cartItem.productId));
                return;
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* <div className="absolute ml-[165px] mt-[-10px]">
          <Button
            variant="destructive"
            size="icon"
            onClick={async () => {
              if (user) {
                await dispatch(
                  deleteCartItemAsync({
                    itemId: cartItem.productId,
                    userId: user._id,
                  })
                );
                await dispatch(fetchCartItems());
                return;
              } else {
                dispatch(deleteProductFromCart(cartItem.productId));
                return;
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default CartItem;
