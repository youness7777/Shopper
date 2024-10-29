import React, { useContext } from 'react'
import './Search.css'
import { ShopContext } from '../../context/ShopContext'

export const Search = () => {

    const{changevalue}=useContext(ShopContext);
  return (
    
    <div className='searchinput'>
     <input type='search' onInput={changevalue}/>
     

    </div>
  )
}
