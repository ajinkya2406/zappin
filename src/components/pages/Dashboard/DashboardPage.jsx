import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { productService, offerService, expenseService, outletService, userService, orderService } from '../../../services/api';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import SendIcon from '@mui/icons-material/Send';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const cardStyles = [
  { bg: '#ff6a00', icon: <StorefrontIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#ff6a00', icon: <LocalOfferIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#ffc107', icon: <PeopleIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#ffc107', icon: <PeopleIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#00bcd4', icon: <AccessTimeIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#00bcd4', icon: <RestaurantIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#00bcd4', icon: <TwoWheelerIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#00bcd4', icon: <SendIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#e53935', icon: <AttachMoneyIcon sx={{ fontSize: 40, color: '#fff' }} /> },
  { bg: '#e53935', icon: <AttachMoneyIcon sx={{ fontSize: 40, color: '#fff' }} /> },
];

function DashboardPage() {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [stats, setStats] = useState({
    products: 0,
    offers: 0,
    customers: 0,
    deliveryAgents: 0,
    pendingOrders: 0,
    preparingFood: 0,
    deliveryOnWay: 0,
    deliveredOrders: 0,
    receivedPayment: 0,
    expenses: 0,
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOutlets();
  }, []);

  useEffect(() => {
    fetchStats();
  }, [selectedOutlet]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await orderService.getAllOrders();
      setOrders(selectedOutlet ? data.filter(o => o.availableInOutlet === selectedOutlet) : data);
    };
    fetchOrders();
  }, [selectedOutlet]);

  const fetchOutlets = async () => {
    const res = await outletService.getOutletLocations();
    setOutlets(res.data || res);
  };

  const fetchStats = async () => {
    // Fetch all stats from backend, optionally filter by outlet
    const [products, offers, expenses, users, orders] = await Promise.all([
      productService.getProducts(),
      offerService.getAllOffers(),
      expenseService.getExpenses(),
      userService.getAllUsers ? userService.getAllUsers() : [],
      orderService.getAllOrders(),
    ]);
    const customers = users.filter(u => u.role === 'Customer');
    const deliveryAgents = users.filter(u => u.role === 'Delivery Boy');
    const filteredExpenses = selectedOutlet ? expenses.filter(e => e.outlet && e.outlet._id === selectedOutlet) : expenses;
    const filteredOrders = selectedOutlet ? orders.filter(o => o.availableInOutlet === selectedOutlet) : orders;
    setStats({
      products: selectedOutlet ? products.filter(p => p.availableInOutlet === selectedOutlet).length : products.length,
      offers: offers.length,
      customers: selectedOutlet ? customers.filter(u => u.availableInOutlet === selectedOutlet).length : customers.length,
      deliveryAgents: selectedOutlet ? deliveryAgents.filter(u => u.availableInOutlet === selectedOutlet).length : deliveryAgents.length,
      pendingOrders: filteredOrders.filter(o => o.status === 'Order Pending').length,
      preparingFood: filteredOrders.filter(o => o.status === 'Preparing Food').length,
      deliveryOnWay: filteredOrders.filter(o => o.status === 'Delivery on the way').length,
      deliveredOrders: filteredOrders.filter(o => o.status === 'Delivered Order').length,
      receivedPayment: 32280, // Placeholder, replace with backend value if available
      expenses: filteredExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    });
  };

  const cards = [
    { label: 'PRODUCTS', value: stats.products },
    { label: 'OFFERS', value: stats.offers },
    { label: 'CUSTOMERS', value: stats.customers },
    { label: 'DELIVERY AGENTS', value: stats.deliveryAgents },
    { label: 'PENDING ORDERS', value: stats.pendingOrders },
    { label: 'PREPARING FOOD', value: stats.preparingFood },
    { label: 'DELIVERY ON THE WAY', value: stats.deliveryOnWay },
    { label: 'DELIVERED ORDERS', value: stats.deliveredOrders },
    { label: 'RECEIVED PAYMENT', value: stats.receivedPayment.toLocaleString() },
    { label: 'EXPENSES', value: stats.expenses.toLocaleString() },
  ];

  // Orders vs Months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const ordersByMonth = Array(12).fill(0);
  orders.forEach(o => {
    const d = new Date(o.orderDate || o.createdAt);
    if (!isNaN(d)) ordersByMonth[d.getMonth()]++;
  });
  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Orders',
        data: ordersByMonth,
        fill: true,
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderColor: 'rgba(33, 150, 243, 0.5)',
        pointBackgroundColor: 'rgba(33, 150, 243, 0.7)',
        tension: 0.4,
      },
    ],
  };

  // Statuswise Orders
  const statusCounts = {
    'Delivered Order': 0,
    'Order Pending': 0,
    'Preparing Food': 0,
    'Delivery on the way': 0,
    'Order Accepted': 0,
    'Order Rejected': 0,
  };
  orders.forEach(o => {
    if (statusCounts[o.status] !== undefined) statusCounts[o.status]++;
  });
  const pieData = {
    labels: [
      'Delivered Orders',
      'Pending Orders',
      'Preparing Food',
      'Delivery on the way',
      'Order Accepted',
      'Order Rejected',
    ],
    datasets: [
      {
        data: [
          statusCounts['Delivered Order'],
          statusCounts['Order Pending'],
          statusCounts['Preparing Food'],
          statusCounts['Delivery on the way'],
          statusCounts['Order Accepted'],
          statusCounts['Order Rejected'],
        ],
        backgroundColor: [
          '#4caf50', // green
          '#039be5', // blue
          '#e53935', // red
          '#dce300', // yellow
          '#8e24aa', // purple (accepted)
          '#ff9800', // orange (rejected)
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ background: '#e5e5e5', minHeight: '100vh', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <FormControl sx={{ minWidth: 320 }}>
          <Select
            value={selectedOutlet}
            onChange={e => setSelectedOutlet(e.target.value)}
            displayEmpty
            sx={{ background: '#fff', borderRadius: 1 }}
          >
            <MenuItem value="">-- Select Outlet --</MenuItem>
            {outlets.map(outlet => (
              <MenuItem key={outlet._id} value={outlet._id}>{outlet.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} lg={2.4} key={card.label}>
            <Paper sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, boxShadow: 2, mb: 2 }}>
              <Box sx={{ width: 60, height: 60, background: cardStyles[idx].bg, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                {cardStyles[idx].icon}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#444' }}>{card.label}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ff6a00' }}>{card.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              Orders Vs Months
            </Typography>
            <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} height={300} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              Statuswise Orders
            </Typography>
            <Pie data={pieData} options={{ responsive: true, plugins: { legend: { display: false } } }} height={300} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage; 