'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'next/link';

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Sokn Trading Platform
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} href="/strategies">
            Trading Strategies
          </Button>
          <Button color="inherit" component={RouterLink} href="/analytics">
            Analytics
          </Button>
          <Button color="inherit" component={RouterLink} href="/data">
            Data
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
