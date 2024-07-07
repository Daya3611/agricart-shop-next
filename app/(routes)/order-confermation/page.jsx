import { CheckCircle2 } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link'

// function page() {
//   return (
//     <div className='flex justify-center my-20'>
//       <div className='border shaow-md flex flex-col justify-center p-20 rounded-lg items-center gap-3 px-32'>
//         <CheckCircle2 className='h-24 w-24 text-primary'/>
//         <h2 className='font-medium text-3xl text-primary'>Order Successfull</h2>
//         <h2>Thank you so much for order</h2>
//         <h2>Your Order Details shere with you within next 6 hrs on email or Whatsapp on your provided contact details.</h2>

//         <Link href={'/my-order'}><Button className="mt-8">Track Your Order</Button></Link>
//       </div>
//     </div>
//   )
// }

// export default page


// import React from 'react'

function page() {
  return (
    <div className='flex justify-center my-20'>
      <div className='border shaow-md flex flex-col justify-center p-20 rounded-lg items-center gap-3 px-32'>
      <CheckCircle2 className='h-24 w-24 text-primary'/>
      <h2 className='font-medium text-3xl text-primary'>Order Successfull</h2>
      <h2>Thank you so much for order</h2>
      <h2>Your Order Details shere with you within next 6 hrs on email or Whatsapp on your provided contact details.</h2>
      {/* <div><Link><Button className="mt-8">Track Your Order</Button></Link></div> */}
      <h2>Goto My order to see order status</h2>
      </div>
    </div>
  )
}

export default page
