import React, { useContext, useEffect } from 'react';
import Navbar from '../../component/Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { userContext } from '../../Context/TokenContext.js';

export default function Layout() {
  let {setToken}=useContext(userContext)
  useEffect(()=>{
    if (localStorage.getItem('userToken')!== null){
      setToken(localStorage.getItem('userToken'))
    }
  } ,[]);//
  return (
    <div>
      <Navbar/>
      <div className="container">
        <Outlet/>
      </div>
      
      <Footer/>
    </div>
  )
}
