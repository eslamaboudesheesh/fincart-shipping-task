import React from 'react';
import { Box, Typography, Card, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { CourierRate } from '../../types';

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'highlighted' && prop !== 'isSelected',
})<{ highlighted?: boolean; isSelected?: boolean }>(({ theme, highlighted, isSelected }) => ({
    borderRadius: '12px',
    border: isSelected ? `2px solid #0F172A` : highlighted ? `2px solid ${theme.palette.secondary.main}` : `1px solid #E2E8F0`,
    boxShadow: isSelected ? '0 4px 12px rgba(15, 23, 42, 0.15)' : highlighted ? '0 4px 12px rgba(59, 130, 246, 0.15)' : '0 1px 3px rgba(0,0,0,0.02)',
    padding: '20px',
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    overflow: 'visible', // Allows the top badge to break out of the container
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.06)',
        borderColor: isSelected ? '#0F172A' : highlighted ? theme.palette.secondary.main : '#CBD5E1',
    },
}));

// Floating badge on the top border
const BadgeContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '-9px',
    left: '16px',
    display: 'flex',
    gap: '6px',
    background: '#ffffff',
    padding: '0 8px',
}));

const StyledBadge = styled(Typography)<{ type: 'cheapest' | 'fastest' }>(({ theme, type }) => ({
    fontSize: '0.7rem',
    fontWeight: 800,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: type === 'cheapest' ? theme.palette.success.main : '#F59E0B',
}));

const PriceDisplay = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginTop: '16px',
}));

const EstDeliveryBox = styled(Box)(({ theme }) => ({
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    padding: '10px 14px',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FAFAFA',
}));

interface CourierCardProps {
    rate: CourierRate;
    onClick?: () => void;
    isSelected?: boolean;
}

// Utility to generate matching colors based on courier name
const getCourierColor = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('smsa')) return '#059669'; // Green
    if (lower.includes('aramex')) return '#DC2626'; // Red
    if (lower.includes('fedex')) return '#4C1D95'; // Purple
    if (lower.includes('ups')) return '#451A03'; // Brown
    if (lower.includes('dhl')) return '#DC2626'; // Red
    return '#475569'; // Default Slate
};

// Utility to generate initials for the avatar logo
const getInitials = (name: string) => {
    if (name.toLowerCase().includes('smsa')) return 'SMS';
    if (name.toLowerCase().includes('aramex')) return 'ARX';
    if (name.toLowerCase().includes('fedex')) return 'FDX';
    if (name.toLowerCase().includes('ups')) return 'UPS';
    if (name.toLowerCase().includes('dhl')) return 'DHL';
    return name.substring(0, 3).toUpperCase();
};

export const CourierCard: React.FC<CourierCardProps> = ({ rate, onClick, isSelected }) => {
    const isHighlighted = rate.isCheapest || rate.isFastest;

    return (
        <StyledCard highlighted={isHighlighted} isSelected={isSelected} onClick={onClick}>
            {/* Floating Border Badges */}
            {isHighlighted && (
                <BadgeContainer>
                    {rate.isCheapest && <StyledBadge type="cheapest">CHEAPEST</StyledBadge>}
                    {rate.isCheapest && rate.isFastest && <Typography sx={{ fontSize: '0.7rem', color: '#CBD5E1', fontWeight: 800 }}>—</Typography>}
                    {rate.isFastest && <StyledBadge type="fastest">FASTEST</StyledBadge>}
                </BadgeContainer>
            )}

            {/* Header: Logo & Branding */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        bgcolor: getCourierColor(rate.courierName),
                        width: 44,
                        height: 44,
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        borderRadius: '8px'
                    }}
                >
                    {getInitials(rate.courierName)}
                </Avatar>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2, color: '#0F172A' }}>
                        {rate.courierName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Economy Plus
                    </Typography>
                </Box>
            </Box>

            {/* Pricing */}
            <PriceDisplay>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    USD
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
                    {rate.totalPrice.toFixed(2)}
                </Typography>
            </PriceDisplay>

            {/* Price Breakdown */}
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                Base ${rate.basePrice.toFixed(2)} <span style={{ margin: '0 4px' }}>+</span> <span style={{ color: '#F59E0B' }}>Tax ${rate.tax.toFixed(2)}</span>
            </Typography>

            {/* Delivery Timeline */}
            <EstDeliveryBox>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Est. delivery:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#10B981' }}>
                    {rate.estimatedDays}–{rate.estimatedDays + 1} days
                </Typography>
            </EstDeliveryBox>
        </StyledCard>
    );
};
