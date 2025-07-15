// //#region 
// import axios from 'axios';
// import React ,{useState ,useEffect} from 'react';
// import {ColorRing} from 'react-loader-spinner';
// import { Link } from 'react-router-dom';

// export default function Product() {
//   let [productList,setProduct]=useState([])
//   async function getProducts(){
//   let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//   setProduct(data.data)
//   }
// useEffect(()=>{getProducts()},[])
//   return (
//    <div className='row'>
//     {productList.length > 0 ?
//     <>
//      {productList.map((product) => {
//       return (
//         <div className='col-md-3' key={product._id}>
//           <div className='product p-5'>
//             <Link to={`/details/${product._id}`}>
//                   <img
//                   src={product.imageCover}
//                   className='w-100'
//                   alt={product.title}
//                 />
//                 <p className='text-main'>{product.category.name}</p>
//                 <h6>{product.title}</h6>
//                 <div className='d-flex justify-content-between'>
//                   <p>{product.price} EGp</p>
//                   <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color mx-1'></i></p>
//                 </div>
//             </Link>
          
//             <button className='btn bg-main text-light'>Add to cart</button>
//           </div>
//         </div>
//       );
//     })}
//     </> 
//     :
//     <div className='vh-100 d-flex justify-content-center align-items-center'>
//           <ColorRing
//           visible={true}
//           height="80"
//           width="80"
//           ariaLabel="color-ring-loading"
//           wrapperStyle={{}}
//           wrapperClass="color-ring-wrapper"
//           colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//           />
//     </div>

//     }

   
//   </div>
//   )
// }
// //#endregion
import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import { toast } from 'react-toastify';


export default function Product() {
  //#region 
  let {addToCart,setCartNumber}=useContext(cartContext)
   
  async function addToMyCart(id) {
    let {data}=await addToCart(id)
    if (data.status =='success'){
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)

    }else toast.error('not save')
    // console.log(data)
    
  }
  //#endregion
  async function getProducts() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return data.data;
  }

  const { data: productList, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

  if (isError) {
    return <p className='text-danger'>حدث خطأ أثناء تحميل المنتجات</p>;
  }

  return (
    <div className='row'>
      {productList.map((product) => {
        return (
          <div className='col-md-3' key={product._id}>
            <div className='product p-5'>
              <Link to={`/details/${product._id}`}>
              {/* {console.log(product._id)} */}
                <img
                  src={product.imageCover}
                  className='w-100'
                  alt={product.title}
                />
                <p className='text-main'>{product.category.name}</p>
                <h6>{product.title}</h6>
                <div className='d-flex justify-content-between'>
                  <p>{product.price} EGp</p>
                  <p>
                    {product.ratingsAverage}
                    <i className='fa-solid fa-star rating-color mx-1'></i>
                  </p>
                </div>
              </Link>

              <button onClick={()=>{addToMyCart(product._id)}} className='btn bg-main text-light'>Add to cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
