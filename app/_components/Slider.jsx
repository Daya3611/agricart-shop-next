import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
import Image from 'next/image';
function Slider({sliderList = []}) {
    
  return (
    <div className='p-5'>

        <Carousel>
        <CarouselContent>
            {sliderList.map((sliders, index) => (
                <CarouselItem>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${sliders.attributes.image.data[0].attributes.url}`} alt='slider101' width={1000} height={500} className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl' />
            </CarouselItem>
            ))}
            
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>

    </div>
    

    
  )
}

export default Slider
