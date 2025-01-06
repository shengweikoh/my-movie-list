import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
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

const SignUp = () => {
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error messages
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignUp = async (event) => {
    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    event.preventDefault();
    setError('');
    try {
      const response = await signup(email, password, username); // Call the signup API
      alert('Signup successful!');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      setError(err); // Set error message from API
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Perform Google Sign-In
      const { token, email } = await signInWithGoogle(); // Fetch Google ID token
      localStorage.setItem('authToken', token); // Save token if returned
      localStorage.setItem('email', email); // Save email if returned
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error('Error during Google Sign-Up:', error);
      setError('Google Sign-Up failed. Please try again.');
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
            Create an Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Sign up to get started.
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

          <form onSubmit={handleSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'} // Reuse showPassword state
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }}>OR</Divider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleGoogleSignUp} // Trigger Google login
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
                  Sign Up with Google
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: 'text.secondary' }}
          >
            Already have an account?{' '}
            <a href="/login" style={{ color: '#2196F3' }}>
              Log in here.
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;