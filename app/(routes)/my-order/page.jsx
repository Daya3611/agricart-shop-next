"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../_utils/GlobalApi';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import moment from 'moment';
import MyOrderItem from './_components/MyOrderItem';

function Page() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  
  const getMyOrders = async () => {
    const orderList_ = await GlobalApi.getMyOrders(user.id, jwt);
    console.log(orderList_);
    setOrderList(orderList_);
  };
  
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    setJwt(sessionStorage.getItem('jwt'));
    setUser(JSON.parse(sessionStorage.getItem('user')));
    if (!sessionStorage.getItem('jwt')) {
      router.replace('/');
    } else {
      getMyOrders();
    }
  }, []);

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">My Order</h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font bold text-primary">Order History</h2>
        <div className='justify-evenly '>
          {orderList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger onClick={() => handleToggle(index)}>
                <div className='border p-2 bg-slate-100 flex justify-evenly gap-24'>
                  <h2><span className='font-bold mr-2'>Order Date: </span> {moment(item?.createdAt).format('DD-MMM-YYYY, h:mm a')}</h2>
                  <h2><span className='font-bold mr-2'>Total Amount: ₹</span> {item?.totalOrderAmount}</h2>
                  <h2><span className='font-bold mr-2'>Status: </span> {item?.Status}</h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent isOpen={openIndex === index}>
                <p>Order Details: {item?.OrderItm.map((order, index_) => (
                  <MyOrderItem orderItm={order} key={index_} />

                ))}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
