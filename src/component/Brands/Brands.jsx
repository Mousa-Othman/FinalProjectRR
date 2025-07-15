import axios from 'axios'
import React from 'react'
import {ColorRing} from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Brands() {
  async function getBrands(){
   let res= await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
   return res.data
  }
  let {data ,isLoading,isFetching,isError} =useQuery('brands',getBrands);
  console.log(data);
if (isError) {
  return <p className="text-danger text-center mt-5">Error in requst'</p>;
}

 
 return (
  <>
       { !isLoading ? 
    <>
     <div className="container">
      <h2 className="my-4 text-center">All Brands</h2>
      <div className="row">
        {data?.data?.map((brand) => (
          <div className="col-md-3 mb-4" key={brand._id}>
            <div className="card h-100 shadow-sm text-center">
              <img
                src={brand.image}
                className="card-img-top p-3"
                alt={brand.name}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title">{brand.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>:
      <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />

  }
  </>
  
 
   
  );

}
