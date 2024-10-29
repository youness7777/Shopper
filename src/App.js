import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Shop } from './pages/Shop';
import { ShopCategory } from './pages/ShopCategory';
import { Cart } from './pages/Cart';
import { LoginSignup } from './pages/LoginSignup';
import { Product1 } from './pages/Product1';
import men_banner from './components/Assets/banner_women.png'
import women_banner from './components/Assets/banner_mens.png'
import kid_banner from './components/Assets/banner_kids.png'
import { LoginSignIn } from './pages/LoginSignIn';
import { Users } from './pages/Users';
import ModeratorAnnouncements from './pages/Anouncements';


/*function Mybutton({prop, changprop}){
  return(
    <div>
      <p> you have clicked:{prop}</p>
    <button onClick={changprop}> click here</button>
    
    </div>
  ) 
}
*/

function App() {

  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/Mens' element={<ShopCategory banner={men_banner}  category="men"/>}/>
      <Route path='/Womans' element={<ShopCategory banner={women_banner} category="women"/>}/>
      <Route path='/Kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
      <Route path='/product' element={<Product1/>}>
     <Route path=':productId' element={<Product1/>}/>
     </Route> 
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/signin' element={<LoginSignIn/>}>
     <Route path='/signin/:encodedSource/:encodedEmailSuccess/:encodedSuccessMessage' element={<LoginSignIn/>}/>
    
     </Route> 
      <Route path='/Anouncements' element={<ModeratorAnnouncements/>}></Route>
      <Route path='/signup' element={<LoginSignup/>}/>
      <Route path='/users' element={<Users/>}/>
      
    </Routes>
    </BrowserRouter>
    
    </div>
  )















  /*const [count,setcount]=useState(0);
  const chang=()=>{
     setcount(count +1)
    }
  return  (
    <>
  <Mybutton prop={count} changprop={chang}/> ;
  <Mybutton  prop={count} changprop={chang}/> ;
  </>
  );
     
   
 */

}

export default App;
