import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function CategoryList({categoryList}) {
  return (
    <div className='mt-10'>
      <h2 className='text-green-600 font-bold text-2xl'>Shop By Category</h2>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 mt-2'>
        {categoryList.map((category, index) => (
            <Link href={'/products-category/'+category.attributes.Name} className='flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-200'>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.attributes.Icon.data[0].attributes.url}`}
                width={70}
                height={70}
                alt='icon'
                className='group-hover:scale-125 transition-all ease-in-out'/>

                <h2 className='p-2 text-green-800'>{category.attributes?.Name}</h2>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
