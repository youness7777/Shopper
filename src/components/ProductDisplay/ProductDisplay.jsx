import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'
export const ProductDisplay = (props) => {

    const{product}=props;
    const {addCart}=useContext(ShopContext);
  return (
    <div className='product-display'>
        <div className="display-left">
            <div className="img-grid">
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
            </div>
            <div >
                  <img src={product.image} className="img-main" alt=''/>
            </div>
        </div>
        <div className="display-right"> 
             <div className="product-name">
             {product.name}</div> 
            <div className="star">
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_dull_icon} alt=''/>
                <p>(112)</p>
            </div>
            <div className="price">
                <div className="new-price">
                ${product.new_price}
                </div>
                <div className="old-price">
                ${product.old_price}
                </div>
            </div>
            <div className='description'>a jacket for the winter with multiple colors and sizes also for the sprint when it's not so cold</div>
            <h2>Select Size</h2>
            <div className="size">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>

            </div>
            <button onClick={()=>{addCart(product.id)}}>ADD TO CART</button>
           <div className='category'>
            <p><span>Category</span> clothes,Mens</p>
            </div> 
            <div className='tags'>
            <p><span>Tags</span> Modern,latest</p>
            </div> 
        </div>

    </div>
  )
}
