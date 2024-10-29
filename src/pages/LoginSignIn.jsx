import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './LoginSignIn.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';
export const LoginSignIn = () => {
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  ///////pour les erreurs et success auth///
  const [error, setError] = useState(null);
   
 
   ///////pour paramettres venus depuis l'url de register(succesmessage ,email)
    const {encodedSuccessMessage,encodedEmailSuccess,encodedSource} = useParams();
    //console.log(encodedSuccessMessage)
    //console.log(encodedEmailSuccess)
    //console.log(encodedSource)

    const [logoutSuccessMessage, setLogoutSuccessMessage] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('messagelogout');
    //console.log(message);
    useEffect(()=>{
     
        // Décodage de l'URIComponent
      if(message){
        setLogoutSuccessMessage(true);
        setTimeout(() => {
          setLogoutSuccessMessage(false);
        }, 3000);
      }
        
     
    },[message])
    //console.log(logoutSuccessMessage)
    ////////////////////////////////////////////////
     ////////pour afficher successmessage si la source est register ainsi email value
     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
     

     useEffect(() => {
      console.log("encodedSuccessMessage:", encodedSuccessMessage);
      console.log("encodedEmailSuccess:", encodedEmailSuccess);
      console.log("encodedSource:", encodedSource);
     
      // Vérifiez si la source est "register" pour afficher le message de succès
      if (encodedSource === 'register') {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
       console.log('error')
      }
    }, [encodedSuccessMessage, encodedEmailSuccess, encodedSource]);
   ///////////////////////////////////////
  
   //console.log(showSuccessMessage)
   
    const [formdata,setformdata]=useState({
      email:encodedEmailSuccess || '', // Utilisez l'e-mail de l'URL comme valeur par défaut pour le champ de l'e-mail
        password:'',
    });
    const changing=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/login_check', formdata);
          console.log('Login successful:', response.data);
  
          // Stockez le jeton JWT dans le stockage local ou dans un cookie
          localStorage.setItem('token', response.data.token);
          const redirectUrl = '/users'
          window.location.href = redirectUrl;
          
          setError(null)
          setShowSuccessMessage(false);
          // Redirigez l'utilisateur vers une page appropriée
      } catch (error) {
        
       
        if (error.response && error.response.status === 403) {
          // Accès refusé : mettre à jour l'état d'erreur
          setError('Accès refusé. Vous devez être un administrateur pour accéder à cette ressource.');
          
          setShowSuccessMessage(false);
        } else {
          if (error.response && error.response.status === 401) {
            // Accès refusé : mettre à jour l'état d'erreur
            setError('Authentification échouée. Veuillez vérifier vos informations de connexion.');
            setShowSuccessMessage(false);
          }else{
            setError(`Une erreur s\'est produite. Veuillez réessayer.`);
            setShowSuccessMessage(false);
            
          }
          // Autre erreur : afficher l'erreur dans la console
          
        }
      
      }
  };
  const defaultTheme = createTheme();
  return (
    <div>
  
       {/* Afficher le message de succès si nécessaire */}
       {logoutSuccessMessage && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">{decodeURIComponent(message)}</Alert>
        </Stack>
      )}
       {showSuccessMessage && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">{decodeURIComponent(encodedSuccessMessage)}</Alert>
        </Stack>
      )}
      {/* Afficher le formulaire de connexion */}
      {error && (
        <Stack  spacing={2}>
         <Alert severity="error">{error}</Alert>
        </Stack>
      )}
       
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
            </Typography>
        <form onSubmit={handleSubmit}  method="POST">
         
         
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formdata.email}
              autoComplete="email"
              onChange={changing}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={changing}
              autoComplete="current-password"
            />
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
     
     
          </form>
        </Box>
        
        <Copyright sx={{ mt: 8, mb: 4 }} />
        
      </Container>
    </ThemeProvider>
    </div>
    
  )
}
