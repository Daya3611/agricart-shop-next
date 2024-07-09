"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ArrowRight } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


function page() {

    const [jwt, setJwt] = useState("");
    const [user, setUser] = useState("");
    const [users_permissions_user, setUsers_permissions_user] = useState("");
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [cartItemList, setCartItemList] = useState([]);
    const [subtotal, setSubTotal] = useState(0);
    // const [users_permissions_user,setUsers_permissions_user]=useState();
    const [name, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [companyName, setCompany] = useState();
    const [address, setAddress] = useState();
    const [zip, setZip] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [contry, setCountry] = useState();
    const [landmark, setLandmark] = useState();

    const [totalAmount, setTotalAmount] = useState();


    const router = useRouter();

    const getCartItems = async () => {
        const cartItemList_ = await GlobalApi.getCartItems(JSON.parse(sessionStorage.getItem('user')).id, sessionStorage.getItem('jwt'));
        console.log(cartItemList_);
        // alert(cartItemList_);
        setTotalCartItems(cartItemList_.length);
        setCartItemList(cartItemList_);
    }


    // Tax And delivery charges
    const calculateTotaAmount = () => {
        const totalAomunt = subtotal * 1 + 100 + subtotal * (9 / 100)

        return totalAomunt
    }
    const Tdelivery = () => {
        const delivery = 100;
        return delivery.toFixed(2)
    }

    const Ttax = () => {
        const tax = subtotal * (9 / 100)
        return tax.toFixed(2)
    }

    // const AmountOff=()=>{
    //     const off = ;
    // }

    const onApprove = (data) => {
        console.log(data);
        toast('Paymet Done For Testing Only')
        alert('Order Palced Succsefully . Please Make Payment  For Order Confermation Or Else Your Order Is Conver in COD mode & Our Support Team Will Contact You Shortly')
        // toast(data)


        const payLode = {
            data: {
                paymentId: (data.paymentId).toString(),
                totalOrderAmount: subtotal,
                name: name.toString(),
                // name:data.name,
                email: email,
                phone: phone,
                companyName: companyName,
                address: address,
                zip: zip,
                city: city.toString(),
                state: state.toString(),
                contry: contry.toString(),
                landmark: landmark,
                OrderItm: cartItemList,
                userid: user.id,
                users_permissions_user: users_permissions_user

            }
        }

        GlobalApi.createOrder(payLode, jwt).then(resp => {
            console.log(resp);
            toast('Order Placed Successfully');
            cartItemList.forEach((item, index) => {
                GlobalApi.deleteCartItem(item.id, jwt).then(resp => {
                })
            })
            router.replace('/order-confermation');
        })
    }

    const onClick = (data) => {
        alert('Order Palced Succsefully . Please Make Payment  For Order Confermation Or Else Your Order Is Conver in COD mode & Our Support Team Will Contact You Shortly')
        toast('Order Palced Succsefully . Please Make Payment  For Order Confermation Or Else Your Order Is Conver in COD mode & Our Support Team Will Contact You Shortly')

    }
    useEffect(() => {
        setJwt(sessionStorage.getItem('jwt'));
        setUser(JSON.parse(sessionStorage.getItem('user')));
        setUsers_permissions_user(JSON.parse(sessionStorage.getItem('users_permissions_user')));
        if (!sessionStorage.getItem('jwt')) {
            router.push('/sign-in');
        }
        getCartItems();
        let total = 0;
        cartItemList.forEach(element => {
            total += element.amount;
        });
        setTotalAmount(total * 1 + 100 + subtotal * (9 / 100).toFixed(2))
        setSubTotal(total)
    }, []);

    return (
        <div>
            <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>

            <div className='p-5 px-5 md:px-10 grid grid-cols-1  sm: grid-cols-1 py-8 '>
                <div className='md:col-span-2 mx-20'>
                    <h2 className='font-bold text-3xl'>Billing Details</h2>
                    <h2 className='text-lg pt-5'>Personal details</h2>
                    <div className='grid md:grid-cols-2 gap-5 mt-2'>
                        <Input placeholder='Full Name' onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                        <Input placeholder='Company Name if Applicable' onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <h2 className='text-lg pt-5'>Address</h2>
                    <div className='grid grid-cols-2 gap-5 mt-8'>
                        <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                        <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} />
                        <Input placeholder='City' onChange={(e) => setCity(e.target.value)} />
                        <Input placeholder='State' onChange={(e) => setState(e.target.value)} />
                        <Input placeholder='Country' onChange={(e) => setCountry(e.target.value)} />
                        <Input placeholder='Landmark' onChange={(e) => setLandmark(e.target.value)} />
                    </div>
                </div>

                <div className='mt-5 mx-10 border rounded-xl'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center rounded-xl'>Order Summary ({totalCartItems})</h2>
                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-bold flex justify-between'>Subtotal: <span>₹ {subtotal}</span></h2>
                        <hr />
                        <h2 className='flex justify-between'>Tax (9%) : <span>₹ {Ttax()}</span></h2>
                        <h2 className='flex justify-between'>Delivery : <span>₹ {Tdelivery()}</span></h2>
                        <hr />
                        <h2 className='font-bold flex justify-between'>Total : <span>₹ {calculateTotaAmount()}</span></h2>
                        <Button disabled={!(name && email && phone && address && zip && city && state)} onClick={() => onApprove({ paymentId: 112233 })}  >Submit Details </Button>

                        <Link href="https://superprofile.bio/vp/6688f9c5a064bd00136c778d"><Button disabled={!(name && email && phone && address && zip && city && state)} onClick={onClick}  >Payment </Button></Link>
                        {/* <PayPalButtons style={{ layout: "horizontal" }}
                onApprove={onApprove} 
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: 5,
                                    currency_code: "USD",
                                },
                            },
                        ],
                    });
                }}
                /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
