import type { Meta, StoryObj } from '@storybook/react';
import { SidebarSummary } from '../component/shipping/SidebarSummary';
import { QuoteProvider } from '../context/QuoteContext';
import { Box } from '@mui/material';

const meta: Meta<any> = {
    title: 'Shipping/SidebarSummary',
    component: SidebarSummary,
    decorators: [
        (Story, context) => (
            <QuoteProvider 
                initialData={context.args.initialData} 
                initialSelectedRate={context.args.initialSelectedRate}
            >
                <Box sx={{ width: 350 }}>
                    <Story />
                </Box>
            </QuoteProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<any>; // Using any because SidebarSummary doesn't take props

export const Empty: Story = {
    args: {
        initialData: {},
        initialSelectedRate: null,
    },
};

export const PartiallyFilled: Story = {
    args: {
        initialData: {
            origin: { country: 'United States', city: 'New York', zipCode: '10001' },
            destination: { country: 'United Kingdom', city: 'London' },
        },
    },
};

export const FullSummary: Story = {
    args: {
        initialData: {
            origin: { country: 'United States', city: 'New York', zipCode: '10001' },
            destination: { country: 'Saudi Arabia', city: 'Riyadh', zipCode: '11564' },
            package: { weight: 15, length: 40, width: 30, height: 20 },
        },
    },
};

export const WithSelectedCourier: Story = {
    args: {
        ...FullSummary.args,
        initialSelectedRate: {
            id: '1',
            courierName: 'SMSA Express',
            basePrice: 16.59,
            tax: 2.49,
            totalPrice: 19.08,
            estimatedDays: 4,
        },
    },
};
