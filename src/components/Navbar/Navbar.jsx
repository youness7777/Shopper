import React, { useState,useEffect  } from 'react'
import './Navbar.css'
import logo1 from '../Assets/logo.png'
import img_cart from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { NomtificationM } from '../notification/NomtificationM'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
export const Navbar = () => {
    let[emplacement,setemplacement]=useState("Shop");
    const[dropdownnotif,setdropdownnotif]=useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

   
      const fetchUnreadCount = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/notifications/unread-count');
          setUnreadCount(response.data.unreadCount);
        } catch (error) {
          console.error('Error fetching unread count:', error);
        }
      };
      const markAllNotificationsAsRead = async () => {
        try {
          await axios.post('http://127.0.0.1:8000/notifications/mark-all-as-read');
          setUnreadCount(0); // Mettre à jour le compteur de notifications non lues
        } catch (error) {
          console.error('Error marking all notifications as read:', error);
        }
      };
      
      useEffect(() => {
        fetchUnreadCount();
      }, []);
    
      const handleNotificationIconClick = () => {
        // Ouvrir ou fermer le dropdown des notifications
        setdropdownnotif(!dropdownnotif);
        // Marquer toutes les notifications comme lues
         markAllNotificationsAsRead();
      };
      

    const handleNewNotification = async () => {
      await fetchUnreadCount(); // Fetch the unread count from the server to ensure it's in sync
    };


    const changecolor1=()=>{
       setemplacement("Shop")
    }
    const changecolor2=()=>{
        setemplacement("Men")
    }
    const changecolor3=()=>{
        setemplacement("Kids")
    }
    const changecolor4=()=>{
        setemplacement("Woman")
    }
    
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo1} alt='' ></img>
            <p>Shopper</p>
        </div>
     
            <ul className="nav-list">
               <li onClick={changecolor1}><Link style={{textDecoration:'none'}} to='/'> Shop</Link>{emplacement==="Shop"? <hr/>:<></>} </li>
               <li onClick={changecolor2}><Link style={{textDecoration:'none'}} to='/Mens'>Men</Link>{emplacement==="Men"? <hr/>:<></>}</li>
               <li onClick={changecolor3}><Link style={{textDecoration:'none'}} to='/Kids'>Kids</Link>{emplacement==="Kids"? <hr/>:<></>} </li>
               <li onClick={changecolor4}><Link style={{textDecoration:'none'}} to='/Womans'>Woman</Link>{emplacement==="Woman"? <hr/>:<></>} </li>
               
            </ul>
            <div className="nav-login-cart">
                <Link to='/signin'><button>Login</button></Link>
                <Link to='/cart'><img src={img_cart} alt=''/></Link>
            
                <div className="count">0</div>
            
              <div className='dropd'>

                    <div className='foricon' onClick={handleNotificationIconClick}>
                        <NotificationsNoneIcon fontSize='large'></NotificationsNoneIcon>
                        {unreadCount > 0 && <div className='count-notif'>{unreadCount}</div>}
                    </div>

                    <div className={`notifs ${dropdownnotif ?'active' : 'inactive'}`}>
                   
                        <NomtificationM  onNewNotification={handleNewNotification}/>
                    </div>
                 </div>
            </div>
        
    </div>
  )
}
