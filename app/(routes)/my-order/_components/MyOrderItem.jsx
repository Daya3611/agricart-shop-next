import React from 'react'
import Image from 'next/image';
function MyOrderItem({orderItm}) {
  return (
    <div className='w-[55%]'>
    <div className='grid grid-cols-5  p-2  items-center border-bottom'>
      <Image src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${orderItm.product.data.attributes.image.data[0].attributes?.url}`} alt={orderItm.product.data.attributes.name} width={80} height={80} className='bg-gray-100 p-5 rounded-lg border'/>
      
      <div className='col-span-2'>
        <h2>{orderItm.product.data.attributes.name}</h2>
        <h2>Item Price: {orderItm.product.data.attributes.mrp}</h2>
      </div>
      <h2>Quantity: {orderItm.quantity} </h2>
      <h2>Total Amount: {orderItm.amount} </h2>
      
    </div>
    <hr className='mt-3'></hr>
    </div>
    
  )
}

export default MyOrderItem
// flex gap-5 justify-evenly

// import React from 'react';
// import Image from 'next/image';

// function MyOrderItem({ orderItm }) {
//   return (
//     <div className='w-full md:w-[55%] mx-auto'>
//       <div className='grid grid-cols-1 md:grid-cols-5 p-2 items-center border-b gap-4 md:gap-0'>
//         <div className='flex justify-center md:justify-start'>
//           <Image 
//             src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${orderItm.product.data.attributes.image.data[0].attributes?.url}`} 
//             alt={orderItm.product.data.attributes.name} 
//             width={80} 
//             height={80} 
//             className='bg-gray-100 p-5 rounded-lg border'
//           />
//         </div>
        
//         <div className='col-span-2 text-center md:text-left'>
//           <h2>{orderItm.product.data.attributes.name}</h2>
//           <h2>Item Price: {orderItm.product.data.attributes.mrp}</h2>
//         </div>
        
//         <div className='text-center md:text-left'>
//           <h2>Quantity: {orderItm.quantity}</h2>
//         </div>
        
//         <div className='text-center md:text-left'>
//           <h2>Total Amount: {orderItm.amount}</h2>
//         </div>
//       </div>
//       <hr className='mt-3' />
//     </div>
//   );
// }

// export default MyOrderItem;
