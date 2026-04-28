export interface Address {
    country: string;
    city: string;
    zipCode: string;
}

export interface PackageDimensions {
    weight: number;
    length: number;
    width: number;
    height: number;
}

export interface QuoteFormData {
    origin: Address;
    destination: Address;
    package: PackageDimensions;
}