import React from 'react'
import './Collections.css'
import { Item } from '../item/Item'
import new_collections from '../Assets/new_collections'
export const Collections = () => {
  return (
    <div className='collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className='collection-item'>
            {new_collections.map((element,i)=>{
                return <Item key={i} id={element.id} name={element.name} image={element.image} new_price={element.new_price} old_price={element.old_price} />
            })}
        </div>

    </div>
  )
}
