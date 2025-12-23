import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Navbar from '../navbar/navbar';
import Sidebar2 from '../sidebar/Sidebar2';
import { CONTENT_SPACING } from '../../constants/layout';

/**
 * MainLayout - Provides consistent layout structure for authenticated pages
 * Handles Navbar, Sidebar, and responsive content spacing
 */
const MainLayout = ({ children, sidebarName = 'Projects' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200], minHeight: '100vh' }}>
      <Navbar />
      <Sidebar2 name={sidebarName} />
      <Box
        sx={{
          ml: {
            xs: CONTENT_SPACING.sidebar.xs,
            sm: isMobile ? CONTENT_SPACING.sidebar.sm : CONTENT_SPACING.sidebar.md,
          },
          mt: {
            xs: CONTENT_SPACING.top.xs,
            sm: CONTENT_SPACING.top.sm,
          },
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
          width: {
            xs: '100%',
            sm: `calc(100% - ${isMobile ? CONTENT_SPACING.sidebar.sm : CONTENT_SPACING.sidebar.md})`,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

