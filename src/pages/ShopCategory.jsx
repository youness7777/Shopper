import React, { useContext, useState } from 'react'
//import all_product from '../components/Assets/all_product'
import { Item } from '../components/item/Item'
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import './ShopCategory.css'
import { Search } from '../components/Search/Search';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
export const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext);
  const{inputvalue,filtrer}=useContext(ShopContext);
  //let open=false;
  const[dropdown,setdropdown]=useState(false);
  const dropdownstate=()=>{
           setdropdown(!dropdown);
  }
  return (
    <div>
      <div className="shop-category">
        <img className='banner' src={props.banner} alt=""/>
        <div className="category-index">
          <p>
            <span>Showing 1-12 </span>out of 36 products
          </p>
          <Search/>
          <div className="fordropdown">
          <div className='category-sort' onClick={dropdownstate}>
            Sort by <img src={dropdown_icon} alt='' />
          </div>
          <div className={`dropdown-list ${dropdown?'active':'inactive'}`}>
          <ul className='list-ul'>
          <li>
          <StarIcon/>
          <p>Mes favoris</p></li>
          <li>
            <PersonIcon/>
            <p>Profil</p></li>
              <li>
                
            <FaceIcon/>
            <p>Account</p></li>
            <li>
          <StarIcon/>
          <p>Mes favoris</p></li>
            </ul>
            </div>
            </div>
        </div>
        <div className="category-products">
        
           {inputvalue===''? (all_product.map((element,i)=>{
              if(props.category===element.category){
                 return <Item key={i} id={element.id} name={element.name} image={element.image} new_price={element.new_price} old_price={element.old_price} />
                }
            })):(filtrer.map((element,i)=>{
              if(props.category===element.category){
                 return <Item key={i} id={element.id} name={element.name} image={element.image} new_price={element.new_price} old_price={element.old_price} />
                }
            }))}
        </div>
        <div className="category-more">
          Explore More
        </div>


      </div>
      


    </div>
  )
}
