import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth'; 
import { signInWithGoogle } from '../firebase/FirebaseConfig';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Google } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const token = await login(email, password); // Call the login API
      localStorage.setItem('authToken', token); // Store the token
      localStorage.setItem('email', email); // Store the email
      navigate('/home'); // Redirect to home page
    } catch (err) {
      setError(err); // Set error message from API
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { token, email } = await signInWithGoogle();
      localStorage.setItem('authToken', token); // Store the backend token
      localStorage.setItem('email', email); // Store the email
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error('Error during Google Login:', error);
      setError(error); // Display error message
    }
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Log in to continue to your account.
          </Typography>

          {error && (
            <Typography
              variant="body2"
              align="center"
              color="error"
              gutterBottom
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
                    color: 'white',
                    borderRadius: 3,
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #1976D2, #1E88E5)',
                    },
                  }}
                >
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: 'text.secondary', mt: 2, cursor: 'pointer' }}
                >
                  Forgot your password?{' '}
                <a href="/reset-password" style={{ color: '#2196F3' }}>
                  Reset it here
                </a>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }}>OR</Divider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleGoogleLogin} // Trigger Google login
                  startIcon={<Google />} // Add Google icon
                  sx={{
                    color: '#616161',
                    borderRadius: 3,
                    borderColor: '#e0e0e0',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#bdbdbd',
                      backgroundColor: '#fafafa',
                    },
                  }}
                >
                  Continue with Google
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: 'text.secondary', cursor: 'pointer' }}
          >
            Don’t have an account? {''}
            <a href="/signup" style={{ color: '#2196F3' }}>
              Sign up here
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;