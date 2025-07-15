import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Details.module.scss';
import { cartContext } from '../../Context/cartContext';
import { toast } from 'react-toastify';




export default function Details() {
  const [productDetails,setDetails]=useState(null);
  let params=useParams();
  let productId=params.id;
  async function getProduct(){
  let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
  setDetails(data.data)
  }
  useEffect(()=>{
    getProduct()
  },[]);
   //#region 
   let {addToCart,setCartNumber}=useContext(cartContext)
    
   async function addToMyCart(id) {
     let {data}=await addToCart(id)
     if (data.status =='success'){
       toast.success(data.message);
       setCartNumber(data.numOfCartItems)
 
     }else toast.error('not save')
    
   }
   //#endregion
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <img src={productDetails?.imageCover} alt={productDetails?.title} className='w-100' />
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around  ">
          <div>
            <h2>{productDetails?.title}</h2>
            <p>{productDetails?.description}</p>
          </div>
          <div>
            <p>{productDetails?.category.name}</p>
            <div className='d-flex justify-content-between'>
              <p><span className='text-main'>Price</span>{productDetails?.price}</p>
              <p><span >{productDetails?.ratingsAverage}</span><i className='fa-solid fa-star rating-color'></i></p>
            </div>
            <button onClick={()=>{addToMyCart(productDetails._id)}} className='btn bg-main text-light w-100'>Add Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
