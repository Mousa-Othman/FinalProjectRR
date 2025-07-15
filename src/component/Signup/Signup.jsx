import React, { useState } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [isLoding,setLoding]=useState(false)
  const[errMsg,setErr]=useState(null)
  
  let navigate= useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(5, 'Minimum length is 5 characters').max(15, 'Maximum length is 15 characters'),

    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number'),

    email: Yup.string().required('Email is required').email('Invalid email address'),

    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,9}$/,'Password must start with a capital letter and be 7-10 characters long'),

    rePassword: Yup.string().required('Re-password is required').oneOf([Yup.ref('password')], 'Passwords must match')
  });

    //custom validation
  // function validate(value){
  //   let errors={}
  //   if (!value.name){
  //     errors.name='is name required'
  //   } else if(value.name.length <5){
  //     errors.name='minlength is 5 ch '
  //   }else if (value.name.length>15 ){
  //       errors.name='maxlength is 15 ch '
  //   }
  //   if (!value.phone){
  //     errors.phone='phone is requierd'
  //   }else if (!/^01[1250][0-9]{8}$/.test(value.phone)){
  //     errors.phone='enter valiade phone number'
  //   }
  //     if (!value.email) {
  //      errors.email = 'Required';
  //    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
  //      errors.email = 'Invalid email address';
  //    }
  //    if (!value.password){
  //     errors.password='password is required'
  //    }else if (!/^[A-Z][a-z0-9]{6,9}$/.test(value.password)){
  //     errors.password='enter valdation pass , first later captal and...'
  //    }

  //    if (!value.rePassword){
  //     errors.rePassword='repassword is requied'
  //    }else if (value.rePassword !== value.password ){
  //     errors.rePassword='not match'
  //    }

  //   return errors
  // }

  // async function signUp(val) {
  //   try {
  //     const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val);
  //     console.log("✅ Success:", data);
  //     alert("تم التسجيل بنجاح");
  //     // يمكنك عمل redirect أو reset للـ form هنا
  //   } catch (err) {
  //     console.log("❌ Error:", err.response?.data?.message || err.message);
  //     alert(err.response?.data?.message || 'حدث خطأ أثناء التسجيل');
  //   }
  // }
  async function signUp(val) {
      setLoding(true)
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val).catch((err)=>{
        console.log(err.response.data.message)
        setErr(err.response.data.message)
         setLoding(false)
      });
     
      if (data.message =='success'){
        setLoding(false)
        navigate('/signin')
      }
       console.log( data);
  }

  let formik = useFormik({
    initialValues :{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:'',
      },
      // validate,
      validationSchema:validationSchema,
      onSubmit:signUp

    });
  return (
      <div className='my-4'>
        <h1  className='.text-success'>Register Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-8 bg-light shadow p-4 m-auto">
              <div className="row gy-4 ">
                  {/* <div className="col-md-12">
                    <label htmlFor=""></label>
                    <input onChange={formik.handleChange} type="text" className="form-control" />
                  </div> */}
                  <div className="col-md-12">
                    <label htmlFor="userName">name</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='userName' name='name' value={formik.values.name} className="form-control" />
                    {formik.errors.name && formik.touched.name ?
                    <p className='text-danger'>{formik.errors.name}</p> :''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userEmail">email</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='userEmail' value={formik.values.email} name='email' className="form-control"  autoComplete="username" />
                    {formik.errors.email && formik.touched.email?
                    <p className='text-danger'>{formik.errors.email}</p> :''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userPhone">phone</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id='userPhone' name='phone' value={formik.values.phone} className="form-control" />
                    {formik.errors.phone && formik.touched.phone ?
                    <p className='text-danger'>{formik.errors.phone}</p> :''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userPassword">password</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='userPassword' value={formik.values.password} name='password' className="form-control" autoComplete="new-password" />
                    {formik.errors.password && formik.touched.password?
                    <p className='text-danger'>{formik.errors.password}</p> :''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="repassword">repassword</label>
                    <input onChange={formik.handleChange} autoComplete="off" onBlur={formik.handleBlur} type="password" id='repassword' value={formik.values.rePassword} name='rePassword' className="form-control"  />
                    {formik.errors.rePassword && formik.touched.rePassword?
                    <p className='text-danger'>{formik.errors.rePassword}</p> :''}
                  </div>
                  {errMsg !==null ?
                  <p className='text-danger'>{errMsg}</p>
                :
                ''}
                  <div className="col-md-12 text-end my-3">
                    <button type='submit' disabled={!(formik.isValid && formik.dirty)} className="btn btn-primary text-light ">Regiter
                      {isLoding? 
                       <span>
                        <i className='fa-solid fa-spinner fa-spin mx-2'></i>
                      </span>
                      :''}
                     
                    </button>
                  </div>
                  <p>I have account <Link to='/signin'>login</Link></p>
              </div>

            </div>
          </div>
      
        </form>
      </div>
  )
}
