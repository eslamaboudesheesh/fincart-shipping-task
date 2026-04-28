import React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CheckIcon from '@mui/icons-material/Check';
import type { StepIconProps } from '@mui/material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 32,
  height: 32,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: '0.875rem',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main, // Dark slate/blue for active
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.15)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main, // Dark slate/blue for completed
  }),
}));

export function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon sx={{ fontSize: 18, color: 'white' }} /> : String(props.icon)}
    </ColorlibStepIconRoot>
  );
}



interface CustomStepperProps {
  steps: string[];
  activeStep: number;
}



export const CustomStepper: React.FC<CustomStepperProps> = ({ steps, activeStep }) => {
  return (
    <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            // @ts-ignore - MUI typing quirk with StepIconComponent
            StepIconComponent={ColorlibStepIcon}
            sx={{
              '& .MuiStepLabel-label': {
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.secondary',
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
