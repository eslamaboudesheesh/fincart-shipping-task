import { useContext } from 'react';
import { QuoteContext } from '../context/QuoteContext';

export const useQuoteContext = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuoteContext must be used within a QuoteProvider');
  }
  return context;
};
