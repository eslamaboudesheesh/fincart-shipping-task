import type { Meta, StoryObj } from '@storybook/react';
import { CustomStepper } from '../component/shipping/CustomStepper';

const meta: Meta<typeof CustomStepper> = {
    title: 'Shipping/CustomStepper',
    component: CustomStepper,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomStepper>;

const steps = ['Origin', 'Destination', 'Package'];

export const Step1: Story = {
    args: {
        steps,
        activeStep: 0,
    },
};

export const Step2: Story = {
    args: {
        steps,
        activeStep: 1,
    },
};

export const Step3: Story = {
    args: {
        steps,
        activeStep: 2,
    },
};
