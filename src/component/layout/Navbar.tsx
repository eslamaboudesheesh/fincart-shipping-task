import React from 'react';
import { Box, Typography, Container, AppBar, Toolbar } from '@mui/material';
import Logo from '../../assets/fincartio_logo.jpg';

export const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid #E2E8F0',
        bgcolor: 'background.paper'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 72 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Logo Icon Mockup */}
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{
                width: 64,
                height: 64,
                objectFit: 'contain',
                display: 'block',
              }}
            />

            {/* Brand Text */}
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 700, fontSize: '1.25rem' }}
            >
              Fincart
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: 500, fontSize: '1rem', ml: 0.5 }}
            >
              Quick Quote Engine
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
