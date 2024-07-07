import { Button } from '@/components/ui/button'
import { Trash2Icon} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
// import { useContext } from 'react'

function CartItemList({cartItemList,onDeleteItem}) {
    
  return (
    <div>
      <div className='h-[500px] overflow-auto'>
        {cartItemList.map((cart,index)=>(
            <div className='flex justify-between items-center p-2 mb-5'>
                <div className='flex gap-6 items-center'>
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart.image}`} width={70} height={70} alt={cart?.name} className='border p-2'/>

                    <div>
                        <h2 className='font-bold'>{cart?.name}</h2>
                        <h2>Quantity: {cart?.quantity}</h2>
                        <h2 className='text-lg font-bold'>Amount: ₹ {cart?.amount}</h2>
                    </div>
                    
                </div>
                <Button className='bg-red-500 hover:bg-red-700'><Trash2Icon className='cursor-pointer' onClick={()=>onDeleteItem(cart.id)}/></Button>
                
            </div>

            
        ))}
      </div>
      
    </div>
  )
}

export default CartItemList
