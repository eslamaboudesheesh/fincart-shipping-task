import type { Meta, StoryObj } from '@storybook/react';
import { CourierCard } from '../component/courierCards/index';

const meta: Meta<typeof CourierCard> = {
    title: 'Shipping/CourierCard',
    component: CourierCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CourierCard>;

export const Default: Story = {
    args: {
        rate: {
            id: '1',
            courierName: 'SMSA Express',
            logoUrl: '',
            basePrice: 16.59,
            tax: 2.49,
            totalPrice: 19.08,
            estimatedDays: 4,
        },
    },
};

export const Cheapest: Story = {
    args: {
        rate: {
            ...Default.args?.rate,
            isCheapest: true,
        } as any,
    },
};

export const Fastest: Story = {
    args: {
        rate: {
            id: '5',
            courierName: 'DHL Express',
            logoUrl: '',
            basePrice: 29.72,
            tax: 4.46,
            totalPrice: 34.18,
            estimatedDays: 1,
            isFastest: true,
        },
    },
};

export const Selected: Story = {
    args: {
        ...Default.args,
        isSelected: true,
    },
};
