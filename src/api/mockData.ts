import type { CourierRate } from "../types";

export const mockCourierRates: CourierRate[] = [
  {
    id: '1',
    courierName: 'SMSA Express',
    logoUrl: '',
    basePrice: 16.59,
    tax: 2.49,
    totalPrice: 19.07,
    estimatedDays: 4,
    isCheapest: true,
    isFastest: false,
  },
  {
    id: '2',
    courierName: 'Aramex',
    logoUrl: '',
    basePrice: 19.51,
    tax: 2.93,
    totalPrice: 22.43,
    estimatedDays: 3,
  },
  {
    id: '3',
    courierName: 'FedEx',
    logoUrl: '',
    basePrice: 23.23,
    tax: 3.48,
    totalPrice: 26.71,
    estimatedDays: 2,
  },
  {
    id: '4',
    courierName: 'UPS',
    logoUrl: '',
    basePrice: 26.40,
    tax: 3.96,
    totalPrice: 30.36,
    estimatedDays: 2,
  },
  {
    id: '5',
    courierName: 'DHL Express',
    logoUrl: '',
    basePrice: 29.72,
    tax: 4.46,
    totalPrice: 34.18,
    estimatedDays: 1,
    isFastest: true,
  }
];
