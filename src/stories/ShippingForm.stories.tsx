import type { Meta, StoryObj } from '@storybook/react';
import { ShippingForm } from '../component/shipping/ShippingForm';
import { QuoteProvider } from '../context/QuoteContext';
import { Box } from '@mui/material';

const meta: Meta<typeof ShippingForm> = {
    title: 'Shipping/ShippingForm',
    component: ShippingForm,
    decorators: [
        (Story) => (
            <QuoteProvider>
                <Box sx={{ maxWidth: 800, mx: 'auto', p: 4, bgcolor: '#F8FAFC', borderRadius: 4 }}>
                    <Story />
                </Box>
            </QuoteProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof ShippingForm>;

export const Interactive: Story = {};
