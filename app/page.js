import { Button } from "@/components/ui/button";
import Slider from "./_components/Slider";
import { Divide } from "lucide-react";
import Image from "next/image";
import GlobalApi from "./_utils/GlobalApi";
import Header from "./_components/Header";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";


export default async function Home() {
  const sliderList=await GlobalApi.getSlider();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProduct();
  
  return (
  <div className="p-10">
    
    <Slider sliderList={sliderList}/>
    <CategoryList categoryList={categoryList}/>
    <ProductList productList={productList}/>
    <img src="/ban1.jpg" width={1000} height={300} alt="banner"
    className="w-full h-[400px] object-contain mt-10"
    />
    <Footer/>
    
    <Toaster />
  </div>
  );
}
