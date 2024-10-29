import React from 'react'
import exc_img from '../Assets/exclusive_image.png'
import './Offers.css'
export const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Eclusive</h1>
            <h1>Offers For You</h1>
            <p>OnLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className='offers-right'>
            <img src={exc_img} alt=''/>
          
        </div>

    </div>
  )
}
