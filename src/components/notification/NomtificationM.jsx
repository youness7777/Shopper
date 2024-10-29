import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './Notification.css';
import axiosInstance from '../../pages/axiosInstance';
import PersonPinIcon from '@mui/icons-material/PersonPin';
export const NomtificationM = ({ onNewNotification }) => {
    
    const[Notifications,setNotification]=useState([]);
    useEffect(() => {    
    const fetchNotifications = async () => {
        try {
          const response = await axiosInstance.get('http://127.0.0.1:8000/notifications'); // Appel de l'API Symfony
          setNotification(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
  
      fetchNotifications()
      const url = new URL('https://localhost/.well-known/mercure');
    url.searchParams.append('topic', 'http://example.com/youness');

    const eventSource = new EventSource(url);

    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      await fetchNotifications(); // Refresh notifications from the database to ensure it's in sync
      onNewNotification(); // Call parent function to refresh the unread count
    };

    return () => {
      eventSource.close();
    };
    }, []);
    
  

    const formatDate = (createdAt) => {
      const date = new Date(createdAt);
      const currentDate = new Date();
    
      const timeDifference = currentDate.getTime() - date.getTime();
      const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Conversion en minutes
      const hoursDifference = Math.floor(minutesDifference / 60); // Conversion en heures
      const daysDifference = Math.floor(hoursDifference / 24); // Conversion en jours
    
      if (timeDifference < 60000) { // Moins d'une minute
        return 'à l\'instant';
      } else if (daysDifference > 0) {
        return `il y a ${daysDifference} jour${daysDifference > 1 ? 's' : ''}`;
      } else if (hoursDifference > 0) {
        return `il y a ${hoursDifference} heure${hoursDifference > 1 ? 's' : ''}`;
      } else {
        return `il y a ${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`;
      }
    };

  return (
    <div className='notification-dropdown'>
      
      <div className='dropdown-content'>
        <h3>Notifications</h3>
        <div className='contenu-notif'>
        <ul>
          {Notifications.map(notification => (
            <div className='notifs'>
  <li key={notification.id}>
    <div className='pro'>
  <PersonPinIcon/>
  <div dangerouslySetInnerHTML={{ __html: notification.message }} />
  </div>
  <span>{formatDate(notification.createdAt)}</span>
</li>         </div> ))}
        </ul>
        </div>
      </div>
    </div>
  );
};
