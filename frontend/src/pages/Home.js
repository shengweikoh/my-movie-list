import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const Home = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3, // Padding to match Navbar's margins
      }}
    >
      <Container
        maxWidth={false} // Disable default maxWidth to customize
        sx={{
          px: 2, // Add horizontal padding (reduced side margins)
          maxWidth: '1536px', // Set a custom maximum width
        }}
      >
        <Paper
          elevation={0} // Removes elevation shadow
          sx={{
            p: 3, // Reduced padding inside the Paper
            boxShadow: 'none', // Removes any additional shadow
          }}
        >
          <Typography variant="h3" gutterBottom>
            Home Page
          </Typography>
          <Typography variant="body1">
            Welcome to the Home Page! This is a starting point for your project.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;