import React from 'react'
import './Breadcum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
export const Breadcum = (props) => {
    const{product}= props;
  return (
    <div className='breadcrum'>
        Home <img src={arrow_icon} alt=''/>
        {product.name}
        </div>
  )
}
