
import * as React from 'react';
import './LoginSignup.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
import axios from 'axios';
import { useState } from 'react';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export  function LoginSignup() {
  //ce code permet de communiquer avec backend pour l'inscription en se basant sur RESTAPI (POST) p
 
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        username: '',
        email: '',
        cin: '',
        password: '',
        tel:''
        
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post('http://127.0.0.1:8000/admin/register', formData);
          console.log('User created:', response.data);
          // Mettre à jour l'état de votre application ou effectuer d'autres actions après la création de l'utilisateur
          //const successMessage = encodeURIComponent('Votre compte a été créé avec succès.');
          const emailsuccess = formData.email;
          const successMessage = 'Votre compte a été créé avec succès.';
          const source = 'register';
          
          // Encodez les valeurs des paramètres
          const encodedSuccessMessage = encodeURIComponent(successMessage);
          const encodedSource = encodeURIComponent(source);
          const encodedEmailSuccess = encodeURIComponent(emailsuccess);
          
          // Construisez l'URL de redirection avec les paramètres
          const redirectUrl = `/signin/${encodedSource}/${encodedEmailSuccess}/${encodedSuccessMessage}/`;

        // Rediriger l'utilisateur vers la page de connexion avec les paramètres dans l'URL
        window.location.href = redirectUrl; // Assurez-vous d'avoir `history` disponible dans ce composant
        } catch (error) {
          console.error('Error creating user:', error);
          // Afficher un message d'erreur à l'utilisateur
          if (error.response) {
              // La requête a été effectuée, mais le serveur a répondu avec un code d'erreur
              console.error('Server error:', error.response.data);
          } else if (error.request) {
              // La requête a été effectuée, mais il n'y a pas eu de réponse du serveur
              console.error('No response from server:', error.request);
          } else {
              // Une erreur s'est produite lors de la configuration de la requête
              console.error('Request error:', error.message);
          }
      }
    };
  ///////////////////////////////////////////////////////////////////////////////////////////
    
  //validation et politique de mot de passe 
  const [password,setpassword]=useState('')
  const [islenghthvalid,setlengthvalid]=useState(false);
  const [isuppercase,setuppercase]=useState(false);
  const [islowercasevalid,setlowercasevalid]=useState(false);
  const [isnumbervalid,setnumbervalid]=useState(false);
  const [symbolvalid,setsymbolvalid]=useState(false);

  const handlePassword=(e)=>{
    const value = e.target.value;
    setpassword(value);
    
    setlengthvalid(value.length>=8)
    setuppercase(/[A-Z]/.test(value))
    setlowercasevalid(/[a-z]/.test(value))
    setnumbervalid(/\d/.test(value))
    setsymbolvalid(/[!@#$%^&*(),.?":{}|<>]/.test(value))
  };
  ///////////////////////////////////////
 
  
  
    console.log(password)

  return (
    
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
            Sign up
          </Typography>

        <form onSubmit={handleSubmit}  method="POST">

          <Box  noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="UserName"
                  label="User Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="FirstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="LastName"
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tel"
                  label="tel"
                  name="tel"
                  autoComplete="tel"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="cin"
                  required
                  fullWidth
                  id="CIN"
                  label="CIN"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => {
                    handleChange(e);
                    handlePassword(e);
                  }}
                  autoComplete="new-password"
                />
              </Grid>
          
             <ul className='politiques'>
             <h3>Les exigences du mot de passe à respecter :</h3>               
              <li>
              <CheckCircleIcon className={islenghthvalid ?'valid':''}/>              
              <p>8 caractères ou plus</p>
              </li>
              <li>
              <CheckCircleIcon className={isuppercase ?'valid':''}/>             
               <p>au moins 1 lettre majuscule</p>
              </li>
              <li>
              <CheckCircleIcon className={islowercasevalid ?'valid':''}/>
              <p>au moins 1 lettre minuscule</p>
              </li>
              <li>
              <CheckCircleIcon className={isnumbervalid ?'valid':''}/>
              <p>au moins 1 chiffre</p>
              </li>

              <li>
              <CheckCircleIcon className={symbolvalid ?'valid':''}/>
              <p>au moins 1 symbole</p>
              </li>
              </ul>
            
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!islenghthvalid || !isuppercase || !islowercasevalid || !isnumbervalid || !symbolvalid}
              sx={{ mt: 3, mb: 2, backgroundColor: (islenghthvalid && isuppercase && islowercasevalid && isnumbervalid && symbolvalid) ? 'blue' : 'grey'}}   >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href='/signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          </form>
        </Box>
        
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    
  );
}











/*import React from 'react'
import './LoginSignup.css'
export const LoginSignup = () => {
  return (
    <div className='signup'>
      <div className="signup-input">
        <h1>Sign Up</h1>
        <input type='text' placeholder='Your Name'/>
        <input type='email' placeholder='Enter your email'/>
        <input type='password' placeholder='Password'/>
      <button>Continue</button>
        <p>
          Already have an account?
          <span>Login Here</span>
        </p>
     
      <div className="login-check">
        <input type='checkbox'/>
        By continuing, I agree to the terms of use & privacy policy.
      </div>
      </div>

    </div>
  )
}*/
