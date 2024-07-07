import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function TopCategoryList({categoryList,selectedCategory}) {
  return (
    <div className='flex gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 mt-2 p-4 overflow-auto mx-7 md:mx-20 justify-center'>
    {categoryList.map((category, index) => (
        <Link href={'/products-category/'+category.attributes.Name} className={`flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-200 w-[150px] min-w-[100px]
        ${selectedCategory == category.attributes.Name && 'bg-green-600 text-white'}
        `}>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.attributes.Icon.data[0].attributes.url}`}
            width={70}
            height={70}
            alt='icon'
            className='group-hover:scale-125 transition-all ease-in-out'/>

            <h2 className='p-2 text-green-800'>{category.attributes?.Name}</h2>
        </Link>
    ))}
  </div>
  )
}

export default TopCategoryList
