export const REVENUE_BREAKDOWN = [
    { label: 'Pizzas', value: 4200 },
    { label: 'Burgers', value: 1800 },
    { label: 'Pastas', value: 1200 },
    { label: 'Deals', value: 2600 },
];

export const MONTHLY_REVENUE = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [3200, 4100, 3800, 5200, 6100, 5800],
};

export const TOTAL_REVENUE = REVENUE_BREAKDOWN.reduce((sum, i) => sum + i.value, 0);