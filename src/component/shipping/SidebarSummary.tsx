import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useQuoteContext } from '../../context/QuoteContext';

export const SidebarSummary: React.FC = () => {
  const { formData, selectedRate } = useQuoteContext();

  const origin = formData.origin;
  const destination = formData.destination;
  const pkg = formData.package;

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid #E2E8F0' }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#0F172A', fontWeight: '600' }}>
        Quote Summary
      </Typography>

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
    </Paper>
  );
};
