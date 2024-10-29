import React, { useContext } from 'react'
import './CartItems.css'
import cart_cross from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../context/ShopContext'
export const CartItems = () => {
  const {all_product,cartitems,removeCart}=useContext(ShopContext);
  
  
  return (
    <div className='cart'>
      <div className="cart-main">
       <p>Product</p>
       <p>Title</p>
       <p>Price</p>
       <p>Quantity</p>
       <p>Total</p>
       <p>Remove</p>

      </div>
      <hr />
       {all_product.map((e)=>{
    if(cartitems[e.id]>0)
    {
           return <div>
            <div className='cartitems cart-main'>
             <img src={e.image} alt='' className='imagepro' />
             <p>{e.name}</p>
             <p>${e.new_price}</p>
             <p className='quantity'>{cartitems[e.id]}</p>
             <p>${cartitems[e.id] * e.new_price}</p>
             <img className='delete' src={cart_cross} onClick={() => { removeCart(e.id) } } alt='' />
           </div>
           <hr />
           </div>
            }
              return null;
            
           
            })}  
           
    </div>
  )


}
