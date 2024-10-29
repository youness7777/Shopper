import React, { useEffect,createContext, useState } from 'react'
import all_product from '../components/Assets/all_product'


export const ShopContext =createContext(null);

const getDefaultCart=()=>{
  let cart={};
  for(let index=0; index<all_product.length+1;index++){
    cart[index]=0;
  }
  return cart;
}
const ShopContextProvider = (props) => {

  const [cartitems,setcartitems]=useState(getDefaultCart());  
  
  
  const addCart=(itemId)=>{
    setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    
  }
  const removeCart=(itemId)=>{
    setcartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }
//for search .........................
    const [inputvalue,setinputvalue]=useState('');
    const [filtrer,setfilter]=useState([]);
    const changevalue=(e)=>{
        setinputvalue(e.target.value);
       
    }
   

    useEffect(()=>{
      const filtrage = all_product.filter(produit=>produit.name.includes(inputvalue) )
        setfilter(filtrage);
    },[inputvalue])

    /////////pour dropdown notification
    const{dropdownnotif,setdropdownnotif}=useState(false);
    const dropdownnotification=()=>{
      setdropdownnotif(!dropdownnotif)
 }
    ///////////////////////
//-----------------------------------------------------------------------------------
  const contextValue={all_product,cartitems,addCart,removeCart,inputvalue,filtrer,changevalue,dropdownnotification,dropdownnotif};
    return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;