import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { Alert, Stack } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button, IconButton, SnackbarContent, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const ModeratorAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageQueue, setMessageQueue] = useState([]);
  
  useEffect(() => {
    if (notifications.length > 0) {
      // Ajouter chaque notification à la file d'attente avec un délai de 2 secondes
      notifications.forEach((notification, index) => {
        setTimeout(() => {
          setMessageQueue((prevQueue) => [...prevQueue, notification]);
        }, index * 3000); // Délai de 2 secondes entre chaque notification
      });
      setTimeout(() => {
        setNotifications([]);
      
      setTimeout(() => {
        setMessageQueue([]);
      }, 500); 
    }, notifications.length * 3000);// Délai avant de fermer les Snackbars précédents (ajustez selon vos besoins)
    }
    
    
  }, [notifications]);
  
  
  
  
  useEffect(() => {
    fetchAnnouncements();
    setupMercureListener();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/moderator/announcements');
      setAnnouncements(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const setupMercureListener = () => {
    const url = new URL('https://localhost/.well-known/mercure');
    url.searchParams.append('topic', 'http://example.com/annonces');

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received notification:', data);
      //console.log(data.createdAt);
      //console.log(calculateElapsedTime(data.createdAt));
      setNotifications(prevNotifications => [...prevNotifications, data.message]);
      setOpen(true);
    };

    return () => {
      eventSource.close();
    };
  };
  //Fonction pour calculer le temps écoulé en minutes
  const calculateElapsedTime = (createdAt) => {
    const notificationTime = new Date(createdAt);
  
    // Obtenir le temps actuel
    const currentTime = new Date();
    
    // Calculer la différence en millisecondes
    const elapsedTimeInMilliseconds = currentTime - notificationTime;
    
    // Convertir la différence en minutes
    const elapsedTimeInMinutes = Math.floor(elapsedTimeInMilliseconds / (1000 * 60));
    
    return elapsedTimeInMinutes;
};

  const handleApprove = async (id) => {
    try {
      await axios.post('http://127.0.0.1:8000/moderator/approve/${id}', null, {
        //method: 'POST'
      });
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          announcement.id === id ? { ...announcement, status: 'Approved' } : announcement
        )
      );
    } catch (error) {
      console.error('Error approving announcement:', error);
    }
  };

  const handleDismiss = async (id) => {
    try {
      await axios.post('http://127.0.0.1:8000/moderator/dismiss/${id}', null, {
        method: 'POST'
      });
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          announcement.id === id ? { ...announcement, status: 'Dismissed' } : announcement
        )
      );
    } catch (error) {
      console.error('Error dismissing announcement:', error);
    }
  };
  const handleClose = () => {
    setOpen(false);
    // Retirer la première notification de la file d'attente après la fermeture du Snackbar
    setMessageQueue((prevQueue) => prevQueue.slice(1));
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
    
  );
  return (
    <div>
      
      <Stack
        spacing={2}
        sx={{ maxWidth: 600 }}
        alignItems="center" // Centrer verticalement les Snackbars
      >
        {/* Afficher chaque message de la file d'attente dans un Snackbar */}
        {messageQueue.map((notification, index) => (
          <Snackbar
            key={index}
            open={open}
            autoHideDuration={9000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <SnackbarContent
              message={<div dangerouslySetInnerHTML={{ __html: notification }} />}
              action={action}
            />
          </Snackbar>
          
        ))}
      </Stack>
 
      <h1>Moderator Announcements</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td>{announcement.title}</td>
              <td>{announcement.price}</td>
              <td>{announcement.description}</td>
              <td>{announcement.status}</td>
              <td>
                <button
                  onClick={() => handleApprove(announcement.id)}
                  disabled={announcement.status === 'Approved' || announcement.status === 'Dismissed'}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDismiss(announcement.id)}
                  disabled={announcement.status === 'Approved' || announcement.status === 'Dismissed'}
                >
                  Dismiss
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorAnnouncements;