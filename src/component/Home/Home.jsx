import React, { useContext } from 'react';
import Product from '../Product/Product';
import Category from '../Category/Category';
import Slid from '../Slid/Slid';

export default function Home() {
  
  return (
    <div className="container">
      <Slid/>
      <h2>Category</h2>
      <Category/>
      <h2>Products</h2>
      <Product/>
    </div>
  )
}
