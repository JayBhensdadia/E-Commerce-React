import CustomImage from "@/components/CustomImage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { fetchOrderItems } from "@/state/order/order-slice";
import { Product } from "@/state/product/product-slice";
import { AppDispatch, RootState } from "@/state/store";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();

  const orderItems = useSelector((state: RootState) => state.order.orderItems);
  const dispatch = useDispatch<AppDispatch>();

  const [items, setItems] = useState<Product[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (id) {
        await dispatch(fetchOrderItems({ orderId: id }));
      }
    };

    load();
  }, [id]);

  useEffect(() => {
    const getProduct = async ({ id }: { id: string }) => {
      console.log("fetching product from server");

      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:8080/api/product/${id}`,
          withCredentials: true,
        });
        return res.data.product;
      } catch (error) {
        console.log("error in fetching product from server");
      }
    };

    const promiseArr = orderItems.map((order) => {
      return getProduct({ id: order.productId });
    });

    const resolve = async () => {
      const temp: any = await Promise.all(promiseArr);
      setItems(temp);
    };

    resolve();
  }, [orderItems]);

  if (!items) {
    return (
      <div className="flex gap-2">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        <p>loading product...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center no-scrollbar relative">
      <Navbar />
      <div className="flex-1 w-full px-10 flex flex-col font-sg gap-5">
        <p className="text-3xl font-sgmb">OrderDetails</p>
        {/* <p>{JSON.stringify(orderItems)}</p> */}

        {/* <p>{JSON.stringify(items)}</p> */}

        {items.map((item) => {
          return (
            <button
              key={item._id}
              className="flex flex-row gap-2 relative border-2 rounded-md justify-start items-center max-w-[500px] hover:scale-105 transition-transform cursor-pointer text-left"
              onClick={() => {
                navigate(`/${item._id}`);
              }}
            >
              <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-md overflow-clip m-3">
                <CustomImage url={item.image} />
              </div>

              <div className="flex flex-col py-2 gap-3">
                <p>{item.name}</p>
                <p className="font-sgb">$ {item.price}</p>
                <p>
                  Quantity:{" "}
                  {orderItems.find((i) => i.productId === item._id)?.quantity}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <Footer />
      <Sidebar />
    </div>
  );
};

export default OrderDetails;
