import React from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import { Item } from '../item/Item'
export const Popular = () => {
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className='popular-item'>
            {data_product.map((element,i)=>{
                return <Item key={i} id={element.id} name={element.name} image={element.image} new_price={element.new_price} old_price={element.old_price} />
            })}
        </div>
    </div>
  )
}
