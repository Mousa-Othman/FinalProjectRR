import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import { Link } from 'react-router-dom'

 

export default function Cart() {
  const [data,setData]=useState([])
  const [cartPrice,setPrice]=useState()
  let {getCart,deleteCart,updataCart,setCartNumber }=useContext(cartContext);

  // useEffect can't be async, so we use an IIFE to handle async/await.
// Fetches cart data once when the component mounts.
  useEffect(()=>{
    ( async()=>{
    let {data}=   await getCart()
    // console.log(data.data.products)
    // console.log(data.data)
    // console.log(data)
    // console.log(data.numOfCartItems)
    setData(data.data.products);
    setPrice(data.data.totalCartPrice);
  
    })()
  },[])

 async function removeProduct(id){
    let {data}= await deleteCart(id);
    setData(data.data.products);
    setPrice(data.data.totalCartPrice);
      setCartNumber(data.numOfCartItems);
    // console.log(data)
  }

 async function updataProduct(id,count){
     let {data}= await updataCart(id,count);
    setData(data.data.products);
    // console.log(data.data.products)
    setPrice(data.data.totalCartPrice);
      setCartNumber(data.numOfCartItems);
    console.log(data)
   
  }
  return (
    <div className='container'>
      <h2>Shopping Cart</h2>
      <Link to="/checkout" >
        <button className='btn text-light bg-main'>onlinePayment</button>
      </Link>
      <div className="row">
        <div className="col-md-11 bg-main-light shadow p-5 m-auto my-5">
          <h3><span className='text-main fw-bold '>Total Price  </span>{cartPrice}</h3>
          {data.map((pro)=>{
            console.log(pro)
            return <div className="row border-bottom py-5"  key={pro._id}>
              <div className="col-md-1">
                <img src={pro.product.imageCover} className='w-100' alt='cover'/>
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center">
                <div >
                  <h5>{pro.product.title}</h5>
                  <p>{pro.price}</p>
                  {/* {console.log(pro.product._id)} */}
                  <button onClick={()=>{removeProduct(pro.product._id)}} className='btn btn-outline-danger'> <i className='fa-regular fa-trash-can'></i>remove</button>
                </div>
                <div>
                  <button onClick={()=>{updataProduct(pro.product._id,pro.count+1)}} className='btn btn-outline-success'>+</button>
                  <span className='mx-2'>{pro.count}</span>
                  <button onClick={()=>{updataProduct(pro.product._id,pro.count-1)}} className='btn btn-outline-success'>-</button>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
      
    </div>
  )
}
