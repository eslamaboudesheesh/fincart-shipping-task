import React, { createContext, useState, type ReactNode } from 'react';

import { mockCourierRates } from '../api/mockData';
import type { ShippingFormData } from '../utils/shippingSchema';
import type { CourierRate } from '../types';

interface QuoteContextType {
  formData: Partial<ShippingFormData>;
  setFormData: (data: Partial<ShippingFormData>) => void;
  results: CourierRate[];
  isLoading: boolean;
  hasSearched: boolean;
  searchQuotes: (data: ShippingFormData) => Promise<void>;
  selectedRate: CourierRate | null;
  setSelectedRate: (rate: CourierRate | null) => void;
}

export const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{
  children: ReactNode;
  initialData?: Partial<ShippingFormData>;
  initialSelectedRate?: CourierRate | null;
  initialResults?: CourierRate[];
  initialIsLoading?: boolean;
  initialHasSearched?: boolean;
}> = ({
  children,
  initialData = {},
  initialSelectedRate = null,
  initialResults = [],
  initialIsLoading = false,
  initialHasSearched = false
}) => {
    const [formData, setFormData] = useState<Partial<ShippingFormData>>(initialData);
    const [results, setResults] = useState<CourierRate[]>(initialResults);
    const [isLoading, setIsLoading] = useState(initialIsLoading);
    const [hasSearched, setHasSearched] = useState(initialHasSearched);
    const [selectedRate, setSelectedRate] = useState<CourierRate | null>(initialSelectedRate);

    const searchQuotes = async (data: ShippingFormData) => {
      setIsLoading(true);
      setHasSearched(true);
      setSelectedRate(null); // Reset selection on new search

      // Simulate network latency (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, we would fetch based on 'data'. Here we use mock data.
      // If weight is incredibly high or country is not supported, we can simulate an empty state.
      if (data.package?.weight && data.package.weight > 500) {
        setResults([]);
      } else {
        setResults(mockCourierRates);
      }

      setIsLoading(false);
    };

    return (
      <QuoteContext.Provider value={{ formData, setFormData, results, isLoading, hasSearched, searchQuotes, selectedRate, setSelectedRate }}>
        {children}
      </QuoteContext.Provider>
    );
  };
