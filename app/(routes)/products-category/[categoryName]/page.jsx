import React from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import TopCategoryList from '../_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'

async function page({ params }) {
    const categoryName = decodeURIComponent(params.categoryName); // Decode the category name
    const productList = await GlobalApi.getProductsByCategory(categoryName);
    const categoryList = await GlobalApi.getCategoryList();

    return (
        <div>
            <h2 className='p-4 bg-green-800 text-white font-bold text-3xl text-center'>
                {categoryName}
            </h2>
            <TopCategoryList categoryList={categoryList} selectedCategory={categoryName} />
            <div className='p-5 md:p-10'>
                <ProductList productList={productList} />
            </div>
        </div>
    );
}

export default page;
