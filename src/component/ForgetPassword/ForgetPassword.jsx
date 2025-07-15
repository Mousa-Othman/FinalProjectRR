import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import {useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  // Schema for email form
  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email')
  });

  async function sendEmail(values) {
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
    console.log(data);
    if (data.statusMsg === 'success') {
      document.querySelector('.forgotPassword').classList.add('d-none');
      document.querySelector('.verfiyCode').classList.remove('d-none');
    }
  }

  let formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: sendEmail
  });

  // Schema for resetCode form
  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required('Reset code is required')
  });
    let navigate=useNavigate()
  async function sendCode(values) {
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
    // console.log(data);
    if (data.status =='Success'){
      navigate('/resetPassword')

    }

  }

  let verfiyFormik = useFormik({
    initialValues: { resetCode: '' },
    validationSchema: validationSchema2,
    onSubmit: sendCode
  });

  return (
    <>
      <div className='forgotPassword'>
        <h3>Forget Password</h3>
        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto my-5">
          <label htmlFor="email">Email:</label>
          <input
            onBlur={formik.handleBlur}
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            id='email'
            name='email'
            className="form-control"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className='text-danger my-3'>{formik.errors.email}</p>
          ) : ''}
          <button
            disabled={!(formik.dirty && formik.isValid)}
            type='submit'
            className="btn bg-main text-light my-3"
          >
            Send Code
          </button>
        </form>
      </div>

      <div className='verfiyCode d-none'>
        <h3>Reset Code</h3>
        <form onSubmit={verfiyFormik.handleSubmit} className="w-75 mx-auto my-5">
          <label htmlFor="resetCode">Reset Code:</label>
          <input
            onBlur={verfiyFormik.handleBlur}
            type="text"
            value={verfiyFormik.values.resetCode}
            onChange={verfiyFormik.handleChange}
            id='resetCode'
            name='resetCode'
            className="form-control"
          />
          {verfiyFormik.touched.resetCode && verfiyFormik.errors.resetCode ? (
            <p className='text-danger my-3'>{verfiyFormik.errors.resetCode}</p>
          ) : ''}
          <button
            disabled={!(verfiyFormik.dirty && verfiyFormik.isValid)}
            type='submit'
            className="btn bg-main text-light my-3"
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
}
