"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LoaderCircle, LoaderIcon, ShoppingBasket } from 'lucide-react'
import { useRouter } from 'next/navigation'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { useContext } from 'react'
import { UpdateCartContext } from '../_context/UpdateCartContex'

function ProductItemDetails({product}) {

  const jwt = sessionStorage.getItem('jwt');
  const user= JSON.parse(sessionStorage.getItem('user'));
  const {updateCart,setUpdateCart} = useContext(UpdateCartContext);
    const [productTotalPrice,setProductTotalPrice] = useState(
        product.attributes.sellingPrice?
        product.attributes.sellingPrice:
        product.attributes.mrp
    )

    const router = useRouter();
    const [quantity,setQuantity] = useState(1);
    const  [loading,setLoding]=useState(false);

    const addToCart=()=>{
      setLoding(true);
      if(!jwt)
      {
        router.push('/sign-in');
        return ;
      }

      const data = {
        data:{
          quantity:quantity,
          amount:(quantity*productTotalPrice).toFixed(2),
          product:product.id,
          users_permissions_user:user.id,
          userid:user.id
        }
        
      }
      // alert(data);
      GlobalApi.addToCart(data,jwt).then(resp=>{
        // alert(resp);
        
        toast('Added to cart');
        setUpdateCart(!updateCart);
        setLoding(false)
      },(e)=>{
        toast('Error while adding to cart')
        setLoding(false)
      })
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
      <img src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.attributes.image.data[0].attributes.url}`} width={300} height={300} alt='img'
      className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'
      />

      <div className='flex flex-col gap-3'>
      <h2 className='text-2xl front-bold'>{product.attributes.name}</h2>
      <h2 className='text-sm front-bold text-gray-500'>{product.attributes.description}</h2>

      <div className='flex gap-3 '>
            {product.attributes.sellingPrice && <h2 className='font-bold text-lg text-3xl'>
                ₹ {product.attributes.sellingPrice}
                </h2>}
            <h2 className={` ${product.attributes.sellingPrice&& 'line-through text-gray-500 text-2xl'} `}>₹ {product.attributes.mrp}</h2>
        </div>
        <h2 className='font-medium text-lg'>Quantity {product.attributes.itemQuantityType}</h2>

        <div  className='flex flex-col items-baseline gap-3'>
            <div className='flex  items-center'>
            <div className='p-2 border flex gap-10 items-center'>
            <Button className="flex gap-1 bg-gray-200 text-black" disabled={quantity==1} onClick={()=> setQuantity(quantity-1)}>
                -
            </Button>
                
                <h2>{quantity}</h2>
                <Button className="flex gap-1  bg-gray-200 text-black"  onClick={()=> setQuantity(quantity+1)}>
                +
            </Button>
            </div>
            <h2 className='text-2xl font-bold'> = ₹   {(quantity*productTotalPrice).toFixed(2)}</h2>
            </div>
            

            <Button className="flex gap-3" onClick={()=>addToCart()} disabled={loading}>
                <ShoppingBasket/>
                {loading?<LoaderCircle className='animate-spin'/>:'Add To Cart'}
            </Button>
        </div>
        <h2><span className='font-bold'>Category: </span>  {product.attributes.categories.data[0].attributes.Type}</h2>
      </div>
    </div>
  )
}

export default ProductItemDetails
