import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useQuoteContext } from '../../hook/useQuoteContext';

export const SidebarSummary: React.FC = () => {
  const { formData, selectedRate } = useQuoteContext();

  const origin = formData.origin;
  const destination = formData.destination;
  const pkg = formData.package;

  const isEmpty = !origin?.country && !origin?.city && !destination?.country && !destination?.city && !pkg?.weight;

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid #E2E8F0', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#0F172A', fontWeight: '600' }}>
        Quote Summary
      </Typography>

      {isEmpty ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', opacity: 0.6 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Your shipping details will appear here as you fill the form
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '500' }}>
              Origin
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {origin?.country || origin?.city ? `${origin.city ? origin.city + ', ' : ''}${origin.country}` : 'Not specified'}
            </Typography>
            {origin?.zipCode && <Typography variant="body2" color="text.secondary">{origin.zipCode}</Typography>}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '500' }}>
              Destination
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {destination?.country || destination?.city ? `${destination.city ? destination.city + ', ' : ''}${destination.country}` : 'Not specified'}
            </Typography>
            {destination?.zipCode && <Typography variant="body2" color="text.secondary">{destination.zipCode}</Typography>}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '500' }}>
              Package Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">Weight</Typography>
              <Typography variant="body2" sx={{ fontWeight: '500' }}>{pkg?.weight ? `${pkg.weight} kg` : '-'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">Dimensions</Typography>
              <Typography variant="body2" sx={{ fontWeight: '500' }}>
                {pkg?.length && pkg?.width && pkg?.height
                  ? `${pkg.length}x${pkg.width}x${pkg.height} cm`
                  : '-'}
              </Typography>
            </Box>
          </Box>

          {selectedRate && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '500' }}>
                  Selected Courier
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">{selectedRate.courierName}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    USD {selectedRate.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">Est. Delivery</Typography>
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold' }}>
                    {selectedRate.estimatedDays}–{selectedRate.estimatedDays + 1} days
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </Paper>
  );
};
