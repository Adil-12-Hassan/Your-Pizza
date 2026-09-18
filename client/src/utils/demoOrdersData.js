export const ORDER_STATUSES = ['new', 'preparing', 'delivered', 'cancelled'];

export const DEMO_ORDERS = [
    {
        id: 1001,
        customerName: 'Sarah Johnson',
        phone: '+92 300 1112223',
        address: '45 Garden Town, Lahore',
        items: [
            { name: 'Margherita Pizza', quantity: 2, price: 8.99 },
            { name: 'Classic Beef Burger', quantity: 1, price: 7.49 },
        ],
        total: 25.47,
        status: 'new',
        createdAt: '2026-09-18T10:15:00',
    },
    {
        id: 1002,
        customerName: 'Ahmed Raza',
        phone: '+92 321 4445556',
        address: '12 Model Town, Lahore',
        items: [{ name: 'Family Feast', quantity: 1, price: 24.99 }],
        total: 24.99,
        status: 'preparing',
        createdAt: '2026-09-18T09:40:00',
    },
    {
        id: 1003,
        customerName: 'Emily Chen',
        phone: '+92 333 7778889',
        address: '78 DHA Phase 5, Lahore',
        items: [{ name: 'Creamy Alfredo Pasta', quantity: 3, price: 9.49 }],
        total: 28.47,
        status: 'delivered',
        createdAt: '2026-09-17T19:20:00',
    },
];