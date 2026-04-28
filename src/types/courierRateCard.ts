export interface CourierRate {
    id: string;
    courierName: string;
    logoUrl: string;
    basePrice: number;
    tax: number;
    totalPrice: number;
    estimatedDays: number;
    isCheapest?: boolean;
    isFastest?: boolean;
}