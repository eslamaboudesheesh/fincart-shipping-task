import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { CustomStepper } from './CustomStepper';
import { shippingSchema, type ShippingFormData } from '../../utils/shippingSchema';
import { useQuoteContext } from '../../context/QuoteContext';

const steps = ['Origin', 'Destination', 'Package'];

// --- Step Components ---

const OriginStep = () => {
    const { register, formState: { errors } } = useFormContext<ShippingFormData>();
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Origin Details</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                <TextField fullWidth label="Country" {...register('origin.country')} error={!!errors.origin?.country} helperText={errors.origin?.country?.message} />
                <TextField fullWidth label="City" {...register('origin.city')} error={!!errors.origin?.city} helperText={errors.origin?.city?.message} />
                <TextField fullWidth label="Zip/Postal Code" {...register('origin.zipCode')} error={!!errors.origin?.zipCode} helperText={errors.origin?.zipCode?.message} />
            </Box>
        </Box>
    );
};

const DestinationStep = () => {
    const { register, formState: { errors } } = useFormContext<ShippingFormData>();
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Destination Details</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                <TextField fullWidth label="Country" {...register('destination.country')} error={!!errors.destination?.country} helperText={errors.destination?.country?.message} />
                <TextField fullWidth label="City" {...register('destination.city')} error={!!errors.destination?.city} helperText={errors.destination?.city?.message} />
                <TextField fullWidth label="Zip/Postal Code" {...register('destination.zipCode')} error={!!errors.destination?.zipCode} helperText={errors.destination?.zipCode?.message} />
            </Box>
        </Box>
    );
};

const PackageStep = () => {
    const { register, formState: { errors } } = useFormContext<ShippingFormData>();
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Package Dimensions</Typography>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1, textTransform: 'uppercase' }}>Weight</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                <TextField fullWidth type="number" label="Weight (kg)" {...register('package.weight')} error={!!errors.package?.weight} helperText={errors.package?.weight?.message || 'Min 0.01 kg - Max 1,000 kg'} />
            </Box>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 4, mb: 1, textTransform: 'uppercase' }}>Dimensions (Optional)</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                <TextField fullWidth type="number" label="Length (cm)" {...register('package.length')} error={!!errors.package?.length} helperText={errors.package?.length?.message} />
                <TextField fullWidth type="number" label="Width (cm)" {...register('package.width')} error={!!errors.package?.width} helperText={errors.package?.width?.message} />
                <TextField fullWidth type="number" label="Height (cm)" {...register('package.height')} error={!!errors.package?.height} helperText={errors.package?.height?.message} />
            </Box>
        </Box>
    );
};

// Extracted Realtime Watcher so we don't re-render the whole form component
const RealTimeWatcher = () => {
    const { control } = useFormContext<ShippingFormData>();
    const { setFormData } = useQuoteContext();
    const formValues = useWatch({ control });

    useEffect(() => {
        setFormData(formValues as Partial<ShippingFormData>);
    }, [formValues, setFormData]);

    return null;
};

export const ShippingForm: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { searchQuotes, isLoading } = useQuoteContext();

    const methods = useForm<ShippingFormData>({
        resolver: yupResolver(shippingSchema) as any,
        mode: 'onTouched',
        defaultValues: {
            origin: { country: '', city: '', zipCode: '' },
            destination: { country: '', city: '', zipCode: '' },
            package: { weight: undefined, length: undefined, width: undefined, height: undefined },
        }
    });

    const { trigger, handleSubmit } = methods;

    const handleNext = async () => {
        let isValid = false;
        if (activeStep === 0) isValid = await trigger('origin');
        if (activeStep === 1) isValid = await trigger('destination');

        if (isValid) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const onSubmit = (data: ShippingFormData) => {
        searchQuotes(data);
    };

    return (
        <FormProvider {...methods}>
            <RealTimeWatcher />
            <Box sx={{ mb: 4 }}>
                <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, border: '1px solid #E2E8F0', mb: 3 }}>
                    <CustomStepper steps={steps} activeStep={activeStep} />
                </Paper>

                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2, border: '1px solid #E2E8F0', mb: 4 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {activeStep === 0 && <OriginStep />}
                        {activeStep === 1 && <DestinationStep />}
                        {activeStep === 2 && <PackageStep />}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 5 }}>
                            {activeStep > 0 && (
                                <Button onClick={handleBack} variant="outlined" color="inherit" sx={{ minWidth: 100 }}>
                                    Back
                                </Button>
                            )}

                            {activeStep < steps.length - 1 ? (
                                <Button onClick={handleNext} variant="contained" color="primary" sx={{ minWidth: 120 }}>
                                    Next
                                </Button>
                            ) : (
                                <Button disabled={isLoading} type="submit" variant="contained" color="primary" sx={{ minWidth: 120, bgcolor: '#0F172A', '&:hover': { bgcolor: '#020617' } }}>
                                    {isLoading ? 'Searching...' : 'Get Quotes'}
                                </Button>
                            )}
                        </Box>
                    </form>
                </Paper>
            </Box>
        </FormProvider>
    );
};
