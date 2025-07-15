import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { children } from 'react';
import Home from './component/Home/Home.jsx';
import Brands from './component/Brands/Brands.jsx';
import Product from './component/Product/Product.jsx';
import Category from './component/Category/Category.jsx';
import Signin from './component/Signin/Signin.jsx';
import Signup from './component/Signup/Signup.jsx';
import Cart from './component/Cart/Cart.jsx';
// import Navbar from './component/Navbar/Navbar.jsx';
import Layout from './component/Layout/Layout.jsx';

import Notfound from './component/Notfound/Notfound.jsx';
import UserContextProvider from './Context/TokenContext.js';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute.jsx';
import Details from './component/Details/Details';
import CreateContextProvider from './Context/cartContext.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './component/Checkout/Checkout.jsx';
import Allorders from './component/Allorders/Allorders';
import ForgetPassword from './component/ForgetPassword/ForgetPassword.jsx';
import ResetPassword from './component/ResetPassword/ResetPassword.jsx';








const router = createBrowserRouter ([
  {path:'',element:<Layout/>,children:[
    {path:'',element:<ProtectedRoute> <Home/></ProtectedRoute>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute> },
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute> },
    {path:'product',element:<ProtectedRoute> <Product/></ProtectedRoute>},
    {path:'category',element:<ProtectedRoute><Category/></ProtectedRoute> },
    {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute> },
    {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute> },
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute> },
    {path:'signin',element:<Signin/> },
    {path:'signup',element:<Signup/>},
    {path:'forgetPassword',element:<ForgetPassword/>},
    {path:'resetPassword',element:<ResetPassword/>},
    {path:'*',element: <Notfound/> },
  
  ]}
  ])


function App() {
  return (
    
    <CreateContextProvider>
        <UserContextProvider>
          <RouterProvider router ={router}></RouterProvider>
          <ToastContainer theme='colored'/>
        </UserContextProvider>
   </CreateContextProvider>
    
  
  );
}

export default App;
