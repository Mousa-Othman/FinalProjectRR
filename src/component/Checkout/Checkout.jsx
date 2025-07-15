import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext';


export default function Checkout() {
  // let { checkoutPayment}=useContext(cartContext)
  let { checkoutPayment, cartId, getCart } = useContext(cartContext)
    const [isLoding,setLoding]=useState(false)
    const[errMsg,setErr]=useState(null)

      useEffect(() => {
    if (!cartId) {
      getCart();
    }
  }, [cartId]);
  // let id='65d3a588fd7fcd003463a4a6'

  // async function payment(val) {
     
  //     let data= await checkoutPayment(id , val)
  //     console.log(data)
  //     if (data.status == 'success'){
  //       window.location=data.session.url
  //     }
     
  // }
async function payment(val) {
    setLoding(true);
    try {
      if (!cartId) {
        setErr("Shopping cart could not be found.");
        setLoding(false);
        return;
      }

      const data = await checkoutPayment(cartId, val);
      console.log(data);

      if (data?.data?.status === 'success') {
        window.location = data.data.session.url;
      } else {
        setErr("An error occurred during the payment process.");
      }
    } catch (err) {
      setErr("Failed to execute the request.");
    }
    setLoding(false);
  }

  let formik = useFormik({
    initialValues :{
      details:'',
      city:'',
      phone:''
      },
      onSubmit:payment

    });

  return (
      <div className='container my-4'>
        <h1  className='text-success'>Register Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-8 bg-light shadow p-4 m-auto">
              <div className="row gy-4 ">
                  <div className="col-md-12">
                    <label htmlFor="userEmail">details</label>
                    <input onChange={formik.handleChange}  type="text" id='userEmail' value={formik.values.details} name='details' className="form-control" autoComplete="username" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="urCity">city</label>
                    <input onChange={formik.handleChange} type="text" id='urCity' value={formik.values.city} name='city' className="form-control" autoComplete="current-password" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="urPhone">phone</label>
                    <input onChange={formik.handleChange} type="tel" id='urPhone' value={formik.values.phone} name='phone' className="form-control" autoComplete="current-password" />
                  </div>
                  
                  <div className="col-md-12 text-end my-3">
                    <button type='submit'  className="btn btn-primary text-light ">Pay
                     
                    </button>
                  </div>
              </div>

            </div>
          </div>
      
        </form>
      </div>
  )
}
