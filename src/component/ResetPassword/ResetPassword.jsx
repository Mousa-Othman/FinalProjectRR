import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPassword(){
  let navigate=useNavigate()
 async function resetPassword(values){ 
 let {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
 console.log(data);
 if(data.token) {navigate('/signin')
 

 }
 
  }
    const validationSchema = Yup.object({
      email: Yup.string().required('Email is required').email('Invalid email address'),
  
      newPassword: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,9}$/,'Password must start with a capital letter and be 7-10 characters long'),
  
    });
  let formik=useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
    validationSchema:validationSchema,
    onSubmit : resetPassword
  })
  return (
    <div>
      <form  onSubmit={formik.handleSubmit} className='w-75 my-5 mx-auto'>
        <label htmlFor="">Email:</label>
        <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' id='email' value={formik.values.email}/>
        <label htmlFor="">newPassword:</label>
        <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control' id='newPassword' value={formik.values.newPassword}/>
        {formik.errors.newPassword && formik.touched.newPassword?
          <p className='text-danger'>{formik.errors.newPassword}</p> :''}
        <button type="submit"  className="btn bg-main text-light ">Reset Password</button>
      </form>
    </div>
  )
}
