import { fetchOrderItems } from '@/state/order/order-slice';
import { Product } from '@/state/product/product-slice';
import { AppDispatch, RootState } from '@/state/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {

    const { id } = useParams();

    const orderItems = useSelector((state: RootState) => state.order.orderItems);
    const dispatch = useDispatch<AppDispatch>();

    const [items, setItems] = useState<Product[] | null>(null);

    useEffect(() => {

        const load = async () => {
            if (id) {
                await dispatch(fetchOrderItems({ orderId: id }));
            }
        };

        load();

    }, [id]);


    useEffect(() => {


        const getProduct = async ({ id }: { id: string; }) => {
            console.log("fetching product from server");

            try {
                const res = await axios({
                    method: "get",
                    url: `http://localhost:8080/api/product/${id}`,
                    withCredentials: true,
                });
                return res;
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




    return (
        <div>
            <p>OrderDetails of {id}</p>
            <p>{JSON.stringify(orderItems)}</p>
            <p>{JSON.stringify(items)}</p>
        </div>

    );
};

export default OrderDetails;