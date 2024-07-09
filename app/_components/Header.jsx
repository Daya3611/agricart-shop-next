"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CircleUserRound, LayoutGrid, SearchIcon, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import GlobalApi from '../_utils/GlobalApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UpdateCartContext } from '../_context/UpdateCartContex';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from './CartItemList';
import { toast } from 'sonner';


function Header() {
    const [categoryList, setCategoryList] = useState([]);
    const [isLogin,setIsLogin] = useState("");
    const [jwt,setJwt] = useState("");
    const [user,setUser] = useState("");
    const [totalCartItems, setTotalCartItems] = useState(0);
    const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
    const [cartItemList, setCartItemList] = useState([]);
    const router = useRouter();

    const getCategoryList = () => {
        GlobalApi.getCategory()
            .then(resp => {
                // console.log("Category List Resp:"+ resp.data.data);
                setCategoryList(resp.data.data);
                console.log("Category response: " + JSON.stringify(resp.data.data));
            })
            .catch(error => {
                alert("Error fetching category list:", error);
            });
    };

    const getCartItems = async () => {
        if (user) {
            const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
            console.log(cartItemList_);
            // alert(cartItemList_);
            setTotalCartItems(cartItemList_.length);
            setCartItemList(cartItemList_);
        }
        else {
            // idr jb user login nhi hoga tb handle kr kya krna hai tujhe
        }
    }

    const onSignOut = () => {
        sessionStorage.clear();
        router.push('/sign-in')
    }

    const onDeleteItem = (id) => {
        GlobalApi.deleteCartItem(id, jwt).then(resp => {
            toast('Item deleted from cart !');
            getCartItems();
        })

    }
    const [subtotal, setSubTotal] = useState(0);

    useEffect(() => {
        setJwt(sessionStorage.getItem('jwt'));
        setIsLogin(sessionStorage.getItem('jwt') ? true : false);
        setUser(JSON.parse(sessionStorage.getItem('user')));
        getCartItems();
        getCategoryList();
        let total = 0;
        cartItemList.forEach(element => {
            total += element.amount;
        });
        setSubTotal(total.toFixed(2))
    }, [cartItemList, updateCart]);

    return (
        <div className='p-5 shadow-sm flex justify-between'>
            <div className='flex item-center gap-8'>
                <Link href={'/'}><img src='/logo.png' alt='logo' width={200} height={100} className='cursor-pointer' /></Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <h2 className=' hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200'>
                            <time dateTime="2016-10-25" suppressHydrationWarning /><LayoutGrid className='h-5 w-5' /> Category
                        </h2>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {categoryList.map((category, index) => (
                            <Link key={category.attributes.Name} href={'/products-category/' + category.attributes.Name}>
                                <DropdownMenuItem >



                                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.attributes.Icon.data[0].attributes.url}`}
                                        unoptimized={true}
                                        alt='icon'
                                        width={25}
                                        height={25}
                                    />
                                    <h2 className='p-2'>{category.attributes?.Name}</h2>

                                </DropdownMenuItem>
                            </Link>


                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='md:flex gap-3 item-center border rounded-full p-2 px-5 hidden'>
                    <SearchIcon />
                    <input type="text" placeholder='Search' className='outline-none' />
                </div>
            </div>

            <div className='flex gap-5 items-center'>

                <Sheet>
                    <SheetTrigger><h2 className='flex gap-2 items-center text-lg'><ShoppingBasket className='h-7 w-7' /> <span className='bg-primary text-white  px-2 rounded-full'>{totalCartItems}</span></h2></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="bg-primary text-white font-bold text-lg p-2">My Cart</SheetTitle>
                            <SheetDescription>
                                <CartItemList cartItemList={cartItemList}
                                    onDeleteItem={onDeleteItem} />
                            </SheetDescription>
                        </SheetHeader>
                        <SheetClose asChild>
                            <div className='absolute w-[90%] bottom-6 flex flex-col'>
                                <h2 className='text-lg font-bold flex justify-between'>Subtotal <span>₹ {subtotal}</span></h2>
                                <Button onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}>Checkout</Button>
                            </div>
                        </SheetClose>
                    </SheetContent>
                </Sheet>



                {!isLogin ?
                    <Link href={'/sign-in'}>
                        <Button>Login</Button>
                    </Link>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><CircleUserRound className='h-12 w-12 bg-green-100 text-primary p-2 rounded-full cursor-pointer' /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <Link href={'/my-order'}><DropdownMenuItem>My Orders</DropdownMenuItem></Link>
                            <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                }

            </div>
        </div>
    );
}

export default Header;
