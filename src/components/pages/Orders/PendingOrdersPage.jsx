import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Button, TextField, CircularProgress, Alert } from '@mui/material';
import { orderService } from '../../../services/api';

function PendingOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
    fetchDeliveryBoys();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrdersByStatus('Order Pending');
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryBoys = async () => {
    try {
      const res = await fetch('/api/users?role=Delivery Boy');
      const data = await res.json();
      setDeliveryBoys(data);
    } catch (err) {
      console.error('Error fetching delivery boys:', err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      fetchOrders(); // Refresh orders after update
    } catch (err) {
      setError('Failed to update order status. Please try again.');
      console.error('Error updating order status:', err);
    }
  };

  const handleDeliveryBoyAssign = async (orderId, deliveryBoy) => {
    try {
      await orderService.assignDeliveryBoy(orderId, deliveryBoy);
      fetchOrders(); // Refresh orders after update
    } catch (err) {
      setError('Failed to assign delivery boy. Please try again.');
      console.error('Error assigning delivery boy:', err);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper sx={{ p: 3, maxWidth: '100%', mx: 'auto' }}>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          Order Pending
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

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
            <TextField 
              size="small" 
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                <TableRow sx={{ bgcolor: '#f37021' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Order Number</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Amount</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Total Items</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Customer Name</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Delivery Address</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Status</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Delivery Boy</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, borderBottom: '2px solid #fff' }}>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                      <Box>{order.orderNumber}</Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>₹ {order.amount}/-</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>{order.totalItems}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>{order.customerName}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>{order.deliveryAddress}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                      <Select
                        size="small"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <MenuItem value="Order Pending">Order Pending</MenuItem>
                        <MenuItem value="Order Accepted">Order Accepted</MenuItem>
                        <MenuItem value="Order Rejected">Order Rejected</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>
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
                    <TableCell sx={{ borderBottom: '1px solid #eee' }}>
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
          <Typography variant="body2">
            Showing {((page - 1) * ordersPerPage) + 1} to {Math.min(page * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} entries
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small" 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <TextField 
              size="small" 
              value={page}
              sx={{ width: 40, mx: 1 }} 
              inputProps={{ 
                readOnly: true, 
                style: { textAlign: 'center' } 
              }} 
            />
            <Button 
              variant="outlined" 
              size="small"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default PendingOrdersPage; 