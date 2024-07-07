

const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'https://agricart-admin-strapi.onrender.com/api'
})

const getCategory =()=> axiosClient.get('/categories?populate=*');

const getSlider = () => axiosClient.get('/sliders?populate=*').then(resp=>{
    return resp.data.data
    
});

const getCategoryList =()=> axiosClient.get('/categories?populate=*').then(resp=>{
    return resp.data.data
    
});

const getAllProduct =()=> axiosClient.get('/products?populate=*').then(resp=>{
    return resp.data.data
    
});

const getProductsByCategory =(category)=> axiosClient.get('/products?filters[categories][Name][$in]='+category+"&populate=*").then(resp=>{
    return resp.data.data
    console.log(resp.data.data);
});

const registerUser =(fullName,username,email,password)=> axiosClient.post('/auth/local/register',{
    fullName:fullName,
    username:username,
    email:email,
    password:password
});

const SignIn =(email,password)=> axiosClient.post('/auth/local',{
    identifier:email,
    password:password
});

const addToCart = (data,jwt)=> axiosClient.post('/user-carts',data,{
    headers:{
        Authorization:'Bearer '+ jwt
    }
});

const getCartItems = (users_permissions_user,jwt)=> axiosClient.get('/user-carts?filters[users_permissions_user][$eq]='+users_permissions_user+'&[populate][product][populate][image][populate][0]=url',{
    headers:{
        Authorization:'Bearer '+ jwt
    }
}).then(resp=>{
    const data = resp.data.data;
    const cartItemList = data.map((item, index) => ({
        name: item?.attributes?.product?.data?.attributes?.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image: item?.attributes?.product?.data?.attributes?.image?.data[0]?.attributes?.url,
        actualPrice: item?.attributes?.product?.data?.attributes?.mrp,
        id: item.id,
        product: item?.attributes?.product?.data?.id
        

    }));
    
    return cartItemList
});

const deleteCartItem = (id,jwt)=> axiosClient.delete('/user-carts/'+id,{
    headers:{
        Authorization:'Bearer '+ jwt
    }
})


const createOrder = (data,jwt)=> axiosClient.post('/orders',data,{
    headers:{
        Authorization:'Bearer '+ jwt
    }
})

const getMyOrders = (userid, jwt) => 
  axiosClient.get(`orders?filters[userid][$eq]=${userid}&populate[OrderItm][populate][product][populate][image]=url`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    }
  }).then(resp => {
    const response = resp.data.data;
    const orderList = response.map(item => ({
      id: item?.id,
      totalOrderAmount: item?.attributes?.totalOrderAmount,
      paymentId: item?.attributes?.paymentId,
      OrderItm: item?.attributes?.OrderItm,
      createdAt: item?.attributes?.createdAt,
      Status: item?.attributes?.Status,
    }));
    return orderList;
  });




export default{
    getCategory,
    getSlider,
    getCategoryList,
    getAllProduct,
    getProductsByCategory,
    registerUser,
    SignIn,
    addToCart,
    getCartItems,
    deleteCartItem,
    createOrder,
    getMyOrders
}