import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { CourierCard } from '../courierCards';
import { useQuoteContext } from '../../hook/useQuoteContext';

export const ResultsArea: React.FC = () => {
  const { results, isLoading, hasSearched, selectedRate, setSelectedRate } = useQuoteContext();

  if (!hasSearched && !isLoading) {
    return (
      <Box sx={{ mt: 6, textAlign: 'center', py: 10, bgcolor: '#F8FAFC', borderRadius: '12px', border: '1px dashed #E2E8F0' }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, mx: 'auto' }}>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </Box>
        <Typography variant="h6" color="text.secondary" gutterBottom>No Shipping Rates Yet</Typography>
        <Typography variant="body2" color="text.secondary">Complete the form and click "Get Quotes" to see available shipping options.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 6 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0F172A' }}>
          Available Rates
        </Typography>
        {!isLoading && (
          <Typography variant="body2" color="text.secondary" sx={{ bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', px: 2, py: 0.5, borderRadius: '16px' }}>
            {results.length} carriers found
          </Typography>
        )}
      </Box>

      {/* States: Loading, Empty, Data */}
      {isLoading ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rounded" height={180} sx={{ borderRadius: '12px' }} />
          ))}
        </Box>
      ) : hasSearched && results.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#F8FAFC', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>No Couriers Found</Typography>
          <Typography variant="body2" color="text.secondary">We couldn't find any shipping rates for this route or weight.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {results.map(rate => (
            <CourierCard 
              key={rate.id} 
              rate={rate} 
              isSelected={selectedRate?.id === rate.id}
              onClick={() => setSelectedRate(rate)} 
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
