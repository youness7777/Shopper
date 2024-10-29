import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { Alert, Button, Stack } from '@mui/material';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  //const [isAdmin, setIsAdmin] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users');
        setUsers(response.data); 
        console.log(users)
        // Vérifier si l'utilisateur connecté a le rôle admin
       
      
      
        //const isAdmin = response.data.some(user => user.roles.includes('ROLE_ADMIN'));
        //setIsAdmin(isAdmin);
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        //console.log(isAdmin)
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Accès refusé : mettre à jour l'état d'erreur
          setError('Accès refusé. Vous devez être un administrateur pour accéder à cette ressource.');
        } else {
          // Autre erreur : afficher l'erreur dans la console
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();
  }, []);
  const handleLogout = () => {
    // Supprimer le jeton JWT du stockage local
    localStorage.removeItem('token');
    // Rediriger l'utilisateur vers la page de connexion avec le message de succès
    const successMessage='Vous êtes maintenant déconnecté';
    const messagelogout=encodeURIComponent(successMessage);
    const redirectUrl = `/signin?messagelogout=${messagelogout}`;

        // Rediriger l'utilisateur vers la page de connexion avec les paramètres dans l'URL
        window.location.href = redirectUrl;
  };
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {error ? (
        <div>
          <p>{error}</p>
          <p>Veuillez contacter l'administrateur pour obtenir de l'aide.</p>
        </div>
      ) : (
        <>
        {success && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">
            Connexion réussie ! Vous êtes maintenant connecté.
          </Alert>
          
        </Stack>
        
      )}
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>ID:</strong> {user.id}<br />
              <strong>Email:</strong> {user.email}<br />
              <strong>Nom d'utilisateur:</strong> {user.username}<br />
              <strong>roles</strong> {user.roles}<br />
              
              {/* Ajoutez d'autres informations d'utilisateur si nécessaire */}
            </li>
                        

          ))}
        
        <Button onClick={handleLogout} variant="contained">LOGOUT</Button>
     
        </ul>
        </>
        
      )}
      
    </div>
  );
};