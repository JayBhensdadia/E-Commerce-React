import Navbar from '@/components/Navbar';
import { fetchOrders } from '@/state/order/order-slice';
import { AppDispatch, RootState } from '@/state/store';
import { fetchUserDetails } from '@/state/user/user-slice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoginImage from '../assets/images/login.svg';
import CartSidebar from '@/components/CartSidebar';
import UserSidebar from '@/components/UserSidebar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const orders = useSelector((state: RootState) => state.order.orders);
    const user = useSelector((state: RootState) => state.user.data);
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
    useEffect(() => {
        const load = async () => {
            await dispatch(fetchUserDetails());
            await dispatch(fetchOrders());
        };

        load();
    }, []);




    if (!user) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center font-sg">
                <Navbar />
                <div className="flex flex-col gap-10 justify-center items-center">
                    <img src={LoginImage} alt="" className="w-[350px]" />
                    <p className="text-5xl">Please Login</p>
                </div>
            </div>
        );
    }
    return (
        <div className='w-full h-screen flex flex-col gap-5 items-center dark:bg-[#1F1F1F] no-scrollbar relative'>
            <Navbar />
            <div className='flex-1 w-full px-10 flex flex-col font-sg gap-5'>
                <p className='text-3xl font-sgmb'>Order History</p>

                <div className='flex flex-col gap-5'>
                    {orders.map((item) => {
                        return <div key={item._id} className='flex flex-col gap-2 border-2 rounded-lg max-w-[400px] p-2 hover:scale-105 transition-transform cursor-pointer' onClick={() => {
                            navigate(`/orders/${item._id}`);
                        }}>
                            <p>Order Id: {item._id}</p>
                            <p>Total: {item.total}</p>
                            <p>Created At: {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>;
                    })}
                </div>
                {/* <div>{JSON.stringify(orders)}</div> */}
            </div>

            <Sidebar />
            <Footer />
        </div>
    );
};

export default Orders;