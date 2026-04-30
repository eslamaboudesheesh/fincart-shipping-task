import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';
import { ResultsArea } from '../component/shipping/ResultsArea';
import { QuoteProvider } from '../context/QuoteContext';
import { mockCourierRates } from '../api/mockData';

const meta: Meta<typeof ResultsArea> = {
    title: 'Shipping/ResultsArea',
    component: ResultsArea,
    decorators: [
        (Story, context) => (
            <QuoteProvider
                initialResults={context.args.initialResults}
                initialIsLoading={context.args.initialIsLoading}
                initialHasSearched={context.args.initialHasSearched}
            >
                <Box sx={{ width: '100%', maxWidth: 1000, p: 2 }}>
                    <Story />
                </Box>
            </QuoteProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<any>;

export const InitialState: Story = {
    args: {
        initialHasSearched: false,
        initialIsLoading: false,
    },
};

export const Loading: Story = {
    args: {
        initialHasSearched: true,
        initialIsLoading: true,
    },
};

export const WithResults: Story = {
    args: {
        initialHasSearched: true,
        initialIsLoading: false,
        initialResults: mockCourierRates,
    },
};

export const NoResults: Story = {
    args: {
        initialHasSearched: true,
        initialIsLoading: false,
        initialResults: [],
    },
};
