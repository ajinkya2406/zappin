import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Button, TextField, CircularProgress } from '@mui/material';
import { orderService } from '../../../services/api';

function DeliveredOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchDeliveryBoys();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getOrdersByStatus('Delivered Order');
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryBoys = async () => {
    const res = await fetch('/api/users?role=Delivery Boy');
    const data = await res.json();
    setDeliveryBoys(data);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await orderService.updateOrderStatus(orderId, newStatus);
    fetchOrders();
  };

  const handleDeliveryBoyAssign = async (orderId, deliveryBoy) => {
    await orderService.assignDeliveryBoy(orderId, deliveryBoy);
    fetchOrders();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper sx={{ p: 3, maxWidth: '100%', mx: 'auto' }}>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          Delivered Orders
        </Typography>
        {/* Table Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Button variant="outlined" sx={{ mr: 1 }}>Copy</Button>
            <Button variant="outlined" sx={{ mr: 1 }}>Excel</Button>
            <Button variant="outlined" sx={{ mr: 1 }}>CSV</Button>
            <Button variant="outlined">PDF</Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box component="form" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1">Search:</Typography>
            <TextField size="small" variant="outlined" />
          </Box>
        </Box>
        {/* Table */}
        <Box sx={{ overflowX: 'auto', borderRadius: 2, border: '1px solid #eee' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#43b02a' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Order Number</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Amount</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Total Items</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Customer Name</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Delivery Address</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Delivery Boy</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <Box>{order.orderNumber}</Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>₹ {order.amount}/-</TableCell>
                    <TableCell>{order.totalItems}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.deliveryAddress}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <MenuItem value="Order Pending">Order Pending</MenuItem>
                        <MenuItem value="Order Accepted">Order Accepted</MenuItem>
                        <MenuItem value="Order Rejected">Order Rejected</MenuItem>
                        <MenuItem value="Preparing Food">Preparing Food</MenuItem>
                        <MenuItem value="Delivery on the way">Delivery on the way</MenuItem>
                        <MenuItem value="Delivered Order">Delivered Order</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={order.deliveryBoy || ''}
                        onChange={(e) => handleDeliveryBoyAssign(order._id, e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="">-- Select --</MenuItem>
                        {deliveryBoys.map((boy) => (
                          <MenuItem key={boy._id} value={boy.fullName}>{boy.fullName}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="success">Invoice</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
        {/* Table Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2">Showing 1 to 1 of 1 entries</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" size="small" disabled>Previous</Button>
            <TextField size="small" value="1" sx={{ width: 40, mx: 1 }} inputProps={{ readOnly: true, style: { textAlign: 'center' } }} />
            <Button variant="outlined" size="small">Next</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default DeliveredOrdersPage; 