import React from 'react';
import { Box, Container } from '@mui/material';
import { Navbar } from './Navbar';
import { ShippingForm } from '../shipping/ShippingForm';
import { ResultsArea } from '../shipping/ResultsArea';
import { SidebarSummary } from '../shipping/SidebarSummary';
import { QuoteProvider } from '../../context/QuoteContext';

export const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">


          <QuoteProvider>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
                gap: 4,
              }}
            >
              {/* Main Form Area */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 8' } }}>
                <ShippingForm />

                <ResultsArea />
              </Box>

              {/* Sidebar Area */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 4' } }}>
                {/* Sticky sidebar for desktop */}
                <Box sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
                  <SidebarSummary />
                </Box>
              </Box>
            </Box>
          </QuoteProvider>
        </Container>
      </Box>
    </>
  );
};
