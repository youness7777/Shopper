import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcum } from '../components/Breadcum/Breadcum';
import { ProductDisplay } from '../components/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../components/DesciptionBox/DescriptionBox';

export const Product1 = () => {
  const{all_product}=useContext(ShopContext);
  const{productId}=useParams();
  const product= all_product.find((e)=>e.id===Number(productId));
  return (
    <div>
         <Breadcum product={product}/>
         <ProductDisplay product={product}/>
         <DescriptionBox/>
    </div>
  )
}
