import React, { useContext, useState } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/TokenContext';


export default function Signin() {
  const [isLoding,setLoding]=useState(false)
  const[errMsg,setErr]=useState(null)
  let {userToken ,setToken}=useContext(userContext)
  
  let navigate= useNavigate()

  const validationSchema = Yup.object({


    email: Yup.string().required('Email is required').email('Invalid email address'),

    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,9}$/,'Password must start with a capital letter and be 7-10 characters long'),

  });


  async function signIn(val) {
      setLoding(true)
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', val).catch((err)=>{
        setErr(err.response.data.message)
         setLoding(false)
      });
     
      if (data.message =='success'){
        localStorage.setItem('userToken',data.token)
        setToken(data.token)
        setLoding(false)
        navigate('/home')
      }
  }

  let formik = useFormik({
    initialValues :{
      email:'',
      password:'',
      },
      // validate,
      validationSchema:validationSchema,
      onSubmit:signIn

    });
  return (
      <div className='my-4'>
        <h1  className='.text-success'>Register Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-8 bg-light shadow p-4 m-auto">
              <div className="row gy-4 ">
                  <div className="col-md-12">
                    <label htmlFor="userEmail">email</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='userEmail' value={formik.values.email} name='email' className="form-control" autoComplete="username" />
                    {formik.errors.email && formik.touched.email?
                    <p className='text-danger'>{formik.errors.email}</p> :''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userPassword">password</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='userPassword' value={formik.values.password} name='password' className="form-control" autoComplete="current-password" />
                    {formik.errors.password && formik.touched.password?
                    <p className='text-danger'>{formik.errors.password}</p> :''}
                  </div>
                  {errMsg !==null ?
                  <p className='text-danger'>{errMsg}</p>
                :
                ''}
                  <div className="col-md-12 text-end my-3">
                    <button type='submit' disabled={!(formik.isValid && formik.dirty)} className="btn btn-primary text-light ">Login
                      {isLoding? 
                       <span>
                        <i className='fa-solid fa-spinner fa-spin mx-2'></i>
                      </span>
                      :''}
                     
                    </button>
                  </div>
                  <p>I have account <Link to='/signup'>Register</Link></p>
                  <p>I have account <Link to='/forgetPassword'>forgetPassword</Link></p>
              </div>

            </div>
          </div>
      
        </form>
      </div>
  )
}
