import React, { useContext, useEffect } from 'react'
import { data, Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/TokenContext';
import { cartContext } from '../../Context/cartContext';



export default function Navbar() {
  let {userToken,setToken}=useContext(userContext)
 let {cartNumber,getCart,setCartNumber}=  useContext(cartContext)
  let navigate=useNavigate()
  function logout(){
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/signin')
  }

   useEffect(()=>{
      ( async()=>{
      let {data}=   await getCart();
      // console.log(data)
      // console.log(data.numOfCartItems)
      setCartNumber(data.numOfCartItems)
    
      })()
    },[])
  console.log("✅ Navbar Loaded");
  return (
  <>
    
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light"  style={{ backgroundColor: 'red' }}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          <i className='fa-solid fa-cart-shopping text-main'></i> <span className='fw-bold'>FreshCart</span>
        </a>
        
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userToken !== null ?
           <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="product">Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="category">Category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">Brands</Link>
            </li>
            
          </ul>
          :''
          }
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userToken == null ?
            <>
                <li className="nav-item">
              <Link className="nav-link" to='signup'>Register</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to='signin'>Login</Link>
              </li>
            </>
            :''
          }
          {userToken !== null ?
          <>
             <li className="nav-item d-flex align-items-center">
              <i className='fa-brands fa-facebook mx-3'></i>
              <i className='fa-brands fa-twitter mx-3'></i>
              <i className='fa-brands fa-instagram mx-3'></i>
              <i className='fa-brands fa-linkedin mx-3'></i>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="cart">
              <i className='fa-solid fa-cart-shopping text-main'></i>
              <span className='badge bg-main text-light'>{cartNumber}</span>
              </Link>
            </li>
            <li onClick={()=>{logout()}} className="nav-item">
              <Link className="nav-link" to=''>Logout</Link>
            </li>
          </>
          : ''}
          </ul>
        </div>
      </div>
    </nav>
  
  </>
  )
}
