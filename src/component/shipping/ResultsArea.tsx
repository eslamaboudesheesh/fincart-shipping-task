import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { CourierCard } from '../courierCards';
import { useQuoteContext } from '../../context/QuoteContext';

export const ResultsArea: React.FC = () => {
  const { results, isLoading, hasSearched, selectedRate, setSelectedRate } = useQuoteContext();

  if (!hasSearched && !isLoading) {
    return null; // Don't show anything until a search is performed
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
