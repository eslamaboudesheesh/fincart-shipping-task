import * as yup from 'yup';

export const shippingSchema = yup.object({
  origin: yup.object({
    country: yup.string().required('Origin Country is required'),
    city: yup.string().required('Origin City is required'),
    zipCode: yup.string().required('Origin Zip is required'),
  }),
  destination: yup.object({
    country: yup.string().required('Destination Country is required'),
    city: yup.string().required('Destination City is required'),
    zipCode: yup.string().required('Destination Zip is required'),
  }),
  package: yup.object({
    weight: yup.number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required('Weight is required')
      .moreThan(0, 'Weight must be greater than 0')
      .max(1000, 'Weight cannot exceed 1000 kg'),
    length: yup.number().transform((value) => (Number.isNaN(value) ? undefined : value)).optional(),
    width: yup.number().transform((value) => (Number.isNaN(value) ? undefined : value)).optional(),
    height: yup.number().transform((value) => (Number.isNaN(value) ? undefined : value)).optional(),
  }),
});

export type ShippingFormData = yup.InferType<typeof shippingSchema>;
