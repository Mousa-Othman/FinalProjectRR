import axios from "axios";
import { createContext, useState } from "react";

export let cartContext=createContext();
export default function CreateContextProvider(props){
  const [cartId, setCartId] = useState(null);
    
    let [cartNumber,setCartNumber]=useState(0)
    let BaseUrl=`https://ecommerce.routemisr.com`;
    let header={
        token:localStorage?.getItem('userToken')
    }
// console.log(BaseUrl)
// console.log(header)
   function addToCart(id){
    return axios.post(`${BaseUrl}/api/v1/cart`,{
        productId:id
    },
     { headers: header }
    // {
    //      headers: {
    //   token: localStorage.getItem('userToken')  // ✅ جلب التوكن مباشر من localStorage
    //   }
    // }
)
   } 
   function updataCart(id,count){
    return axios.put(`${BaseUrl}/api/v1/cart/${id}`,{
      count:count
    },
    {
         headers:header
    }
)
   } 
   function deleteCart(id){
    return axios.delete(`${BaseUrl}/api/v1/cart/${id}`,
    {
         headers: {
      token: localStorage.getItem('userToken')  // ✅ جلب التوكن مباشر من localStorage
      }
    }
)
   } 

//       function getCart(){
//     return axios.get(`${BaseUrl}/api/v1/cart`,
//     {
//          headers:header
//     }
// )
//    } 

 function getCart() {
    return axios
      .get(`${BaseUrl}/api/v1/cart`, { headers: header })
      .then((res) => {
        setCartId(res.data.data._id);          
        setCartNumber(res.data.numOfCartItems);
        return res;                            
      });
  }


 function  checkoutPayment(id,formData){
    return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      {
        shippingAddress:formData

    },
    {
         headers:header
    }
)

 }

   return <cartContext.Provider value={{ cartId,setCartId,addToCart,cartNumber,setCartNumber,getCart,deleteCart,updataCart, checkoutPayment }}>
    {props.children}

   </cartContext.Provider>

}